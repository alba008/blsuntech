import { getPool } from "./db.mjs";
export const config = { runtime: "nodejs" };

export default async function handler(req, res) {
  const token = req.headers["x-admin-token"];
  if (!token || token !== process.env.INTAKE_ADMIN_TOKEN) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const limit = Math.max(1, Math.min(200, Number(req.query.limit || 50)));

  try {
    const pool = getPool?.();
    if (!pool) return res.json({ items: [], total: 0 });

    const [rows] = await pool.query(
      `SELECT id, ts, name, email, company, service, budget, timeline, message
       FROM intakes ORDER BY ts DESC LIMIT ?`,
      [limit]
    );
    const [[{ cnt }]] = await pool.query(`SELECT COUNT(*) AS cnt FROM intakes`);
    res.json({ items: rows, total: cnt });
  } catch (e) {
    console.error("intakes error:", e);
    res.status(500).json({ error: "Server error" });
  }
}
