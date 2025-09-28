// server/routes/startProject.js
import express from "express";
import nodemailer from "nodemailer";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";
import { getPool } from "../db.js";   // ← add this

const router = express.Router();
console.log("[router] startProject loaded");

// Resolve data path relative to this file
const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const DATA_DIR    = path.join(__dirname, "..", "data");
const NDJSON_PATH = path.join(DATA_DIR, "intakes.ndjson");
console.log("[intakes] path:", NDJSON_PATH);

const required = (v) => v !== undefined && v !== null && String(v).trim() !== "";

// POST /api/start-project
router.post("/start-project", async (req, res) => {
  try {
    const {
      name = "",
      email = "",
      company = "",
      service = "",
      budget = "",
      timeline = "",
      message = "",
      botcheck = "",
    } = req.body || {};

    // Honeypot
    if (botcheck) return res.json({ ok: true });

    // Validation
    if (!required(name) || !required(email) || !required(service) || !required(message)) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Build record FIRST
    const record = {
      id: crypto.randomUUID(),
      ts: new Date().toISOString(),
      ip: req.ip,
      ua: req.get("user-agent"),
      name,
      email,
      company,
      service,
      budget,
      timeline,
      message,
    };

    // Try DB insert (non-fatal)
    try {
      const pool = getPool();
      if (pool) {
        const sql = `
          INSERT INTO intakes
            (id, ts, name, email, company, service, budget, timeline, message, ip, ua)
          VALUES
            (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const params = [
          record.id, record.ts, record.name, record.email,
          record.company || null, record.service,
          record.budget || null, record.timeline || null,
          record.message, record.ip || null, record.ua || null,
        ];
        await pool.execute(sql, params);
        console.log("[db] insert ok:", { id: record.id, name: record.name, service: record.service });
      } else {
        console.warn("[db] pool not available; skip DB insert");
      }
    } catch (dbErr) {
      console.warn("[db] insert failed (non-fatal):", dbErr.message);
    }

    // Best-effort file append (fallback)
    try {
      await fs.mkdir(DATA_DIR, { recursive: true });
      await fs.appendFile(NDJSON_PATH, JSON.stringify(record) + "\n");
      console.log("Intake saved (file):", { id: record.id, name: record.name, service: record.service });
    } catch (e) {
      console.warn("[intakes] append failed (non-fatal):", e?.code || e?.message);
    }

    // Email kill-switch
    if (process.env.EMAIL_DISABLED === "1") {
      console.log("Email disabled: skipping send", { id: record.id });
      return res.json({ ok: true, id: record.id, receivedAt: record.ts });
    }

    // Optional email
    const to = process.env.INTAKE_TO;
    const from = process.env.SMTP_FROM || process.env.SMTP_USER;
    if (to && from) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: process.env.SMTP_PORT === "465",
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      });

      await transporter.sendMail({
        from: `"BlsunTech Intake" <${from}>`,
        to,
        replyTo: email,
        subject: `New Project: ${service} — ${name}`,
        text: [
          `Name: ${name}`,
          `Email: ${email}`,
          `Company: ${company || "-"}`,
          `Service: ${service}`,
          `Budget: ${budget || "-"}`,
          `Timeline: ${timeline || "-"}`,
          "",
          "Brief:",
          message,
        ].join("\n"),
      });
    } else {
      console.warn("INTAKE_TO/SMTP_FROM not set; skipping email send");
    }

    res.json({ ok: true, id: record.id, receivedAt: record.ts });
  } catch (e) {
    console.error("Start project error:", e);
    res.status(500).json({ error: "Email failed" });
  }
});

// GET /api/intakes?limit=50 (admin)
router.get("/intakes", async (req, res) => {
  try {
    const token = req.get("x-admin-token");
    if (!token || token !== process.env.INTAKE_ADMIN_TOKEN) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const limit = Math.max(1, Math.min(500, Number(req.query.limit || 50)));

    let txt = "";
    try {
      txt = await fs.readFile(NDJSON_PATH, "utf8");
    } catch (e) {
      if (e.code === "ENOENT") return res.json({ items: [], total: 0 });
      throw e;
    }

    const lines = txt.trim().split(/\r?\n/).filter(Boolean);
    const items = lines.slice(-limit).map((l) => JSON.parse(l));
    res.json({ items, total: lines.length });
  } catch (e) {
    console.error("Read intakes failed:", e);
    res.status(500).json({ error: "Failed to read intakes" });
  }
});

export default router;
