import { insertIntake } from "./db.mjs";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const {
      name="", email="", company="", service="", budget="", timeline="", message="", botcheck=""
    } = req.body || {};

    if (botcheck) return res.status(200).json({ ok: true });
    if (!name || !email || !service || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const record = {
      id: randomId(),
      ts: new Date().toISOString(),
      ip: req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "",
      ua: req.headers["user-agent"] || "",
      name, email, company, service, budget, timeline, message,
    };

    // Try DB insert (non-fatal if it fails)
    try {
      const out = await insertIntake(record);
      if (!out.inserted) console.warn("[intake] skipped DB insert:", out.reason);
    } catch (e) {
      console.warn("[intake] DB insert failed:", e?.message);
    }

    // Optional: email disabled by default in cloud
    if (process.env.EMAIL_DISABLED === "1") {
      return res.status(200).json({ ok: true, id: record.id, receivedAt: record.ts });
    }

    // TODO: add Nodemailer here if you want real emails in cloud

    return res.status(200).json({ ok: true, id: record.id, receivedAt: record.ts });
  } catch (e) {
    console.error("start-project error:", e);
    return res.status(500).json({ error: "Server error" });
  }
}

function randomId() {
  return "id-" + Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}
