import { getDb } from "./db.mjs";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

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

    if (botcheck) return res.json({ ok: true });

    if (!name || !email || !service || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const db = await getDb();
    if (!db) {
      // fallback so the UI still works if DB is unavailable
      console.warn("[db] not available; skipping insert");
      return res.json({ ok: true, id: tinyId(), receivedAt: new Date().toISOString() });
    }

    const doc = {
      ts: new Date(),
      name, email, company, service, budget, timeline, message,
      ua: req.headers["user-agent"] || null,
      ip: req.headers["x-forwarded-for"] || req.socket?.remoteAddress || null,
    };

    const { insertedId } = await db.collection("intakes").insertOne(doc);
    return res.json({ ok: true, id: String(insertedId), receivedAt: new Date().toISOString() });
  } catch (e) {
    console.error("start-project error:", e);
    return res.status(500).json({ error: "Server error" });
  }
}

function tinyId() {
  return "id-" + Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}
