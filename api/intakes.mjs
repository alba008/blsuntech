// api/intakes.mjs
import { getPool } from "./db.mjs";

export default async function handler(req, res) {
  // Only GET
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  // Admin token check
  const token = req.headers["x-admin-token"];
  if (!token || token !== process.env.INTAKE_ADMIN_TOKEN) {
    // Always 401 if token missing/wrong
    return res.status(401).json({ error: "Unauthorized" });
  }

  const limit = Math.max(1, Math.min(500, Number(req.query.limit || 50)));

  // Try DB first
  try {
    const pool = getPool();
    if (pool) {
      const [rows] = await pool.query(
        `SELECT id, ts, ip, ua, name, email, company, service, budget, timeline, message
         FROM intakes
         ORDER BY ts DESC
         LIMIT ?`, [limit]
      );
      return res.status(200).json({ items: rows, total: rows.length });
    }
  } catch (e) {
    // If DB errors, fall through to empty payload (don’t 500 your admin page)
    console.warn("[intakes] DB read failed:", e?.message || e);
  }

  // No DB available -> empty safe payload
  return res.status(200).json({ items: [], total: 0 });
}
