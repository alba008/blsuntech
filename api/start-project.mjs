// api/start-project.mjs
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Optional DB
import { getPool } from './db.mjs'; // will no-op if env missing

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const DATA_DIR   = path.join(process.cwd(), 'server', 'data'); // local fallback
const NDJSON_PATH = path.join(DATA_DIR, 'intakes.ndjson');

const required = (v) => v !== undefined && v !== null && String(v).trim() !== '';

export default async function handler(req, res) {
  try {
    if (req.method === 'GET' && req.url.endsWith('/health')) {
      return res.status(200).json({ ok: true });
    }

    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const {
      name = '',
      email = '',
      company = '',
      service = '',
      budget = '',
      timeline = '',
      message = '',
      botcheck = '',
    } = req.body || {};

    if (botcheck) return res.status(200).json({ ok: true });

    if (!required(name) || !required(email) || !required(service) || !required(message)) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const record = {
      id: crypto.randomUUID(),
      ts: new Date().toISOString(),
      name, email, company, service, budget, timeline, message,
    };

    // 1) Try DB (if env vars exist)
    let insertedToDB = false;
    try {
      const pool = await getPool(); // returns null if env missing
      if (pool) {
        await pool.execute(
          `INSERT INTO intakes
              (id, ts, name, email, company, service, budget, timeline, message)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            record.id, record.ts,
            name, email, company, service, budget, timeline, message,
          ]
        );
        insertedToDB = true;
      }
    } catch (e) {
      console.warn('[db] insert failed (non-fatal):', e?.message);
    }

    // 2) Always attempt local file (will silently fail on serverless)
    try {
      await fs.mkdir(DATA_DIR, { recursive: true });
      await fs.appendFile(NDJSON_PATH, JSON.stringify(record) + '\n');
      console.log('Intake saved (file):', { id: record.id, name: record.name, service: record.service });
    } catch (e) {
      // Expected on Vercel (read-only), ignore
    }

    // 3) Email (optional)
    if (process.env.EMAIL_DISABLED === '1') {
      console.log('Email disabled: skipping send', { id: record.id });
    } else {
      const to = process.env.INTAKE_TO;
      const from = process.env.SMTP_FROM || process.env.SMTP_USER;
      if (to && from) {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT || 587),
          secure: process.env.SMTP_PORT === '465',
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
            `Company: ${company || '-'}`,
            `Service: ${service}`,
            `Budget: ${budget || '-'}`,
            `Timeline: ${timeline || '-'}`,
            '',
            'Brief:',
            message,
          ].join('\n'),
        });
      } else {
        console.warn('INTAKE_TO/SMTP_FROM not set; skipping email send');
      }
    }

    return res.status(200).json({ ok: true, id: record.id, receivedAt: record.ts, insertedToDB });
  } catch (e) {
    console.error('start-project handler failed:', e);
    return res.status(500).json({ error: 'Server error' });
  }
}
