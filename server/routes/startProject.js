// server/routes/startProject.js
import express from "express";
import nodemailer from "nodemailer";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";

const router = express.Router();
console.log("[router] startProject loaded");

// ✅ resolve data folder relative to this file (server/routes/)
const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const DATA_DIR   = path.join(__dirname, "..", "data");
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

    // Persist every submission (so you can view later)
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
      botcheck,
    };
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.appendFile(NDJSON_PATH, JSON.stringify(record) + "\n");
    console.log("Intake saved:", { id: record.id, name: record.name, service: record.service });

    // Honeypot
    if (botcheck) return res.json({ ok: true });

    // Basic validation
    if (!required(name) || !required(email) || !required(service) || !required(message)) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Kill-switch to disable email (set EMAIL_DISABLED=1 in .env)
    if (process.env.EMAIL_DISABLED === "1") {
        console.log("Email disabled: skipping send", { id: record.id });
           return res.json({ ok: true, id: record.id, receivedAt: record.ts });
        
    }

    // Send email (configure SMTP in .env)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_PORT === "465", // true for 465 (SSL), false for 587 (STARTTLS)
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });

    const to = process.env.INTAKE_TO;
    const from = process.env.SMTP_FROM || process.env.SMTP_USER;
    if (!to) {
      console.warn("INTAKE_TO not set; skipping email send");
      return res.json({ ok: true });
    }

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

    res.json({ ok: true, id: record.id, receivedAt: record.ts });
  } catch (e) {
    console.error("Start project error:", e);
    res.status(500).json({ error: "Email failed" });
  }
});

// GET /api/intakes?limit=50  (requires x-admin-token header)
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
