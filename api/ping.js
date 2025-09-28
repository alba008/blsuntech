import { getPool } from "./db.mjs";

export default async function handler(_req, res) {
  try {
    const pool = getPool();
    const [rows] = await pool.query("SELECT 1 AS ok");
    return res.status(200).json({ ok: rows?.[0]?.ok === 1 });
  } catch (e) {
    console.error("db-ping error:", e);
    return res.status(500).json({ error: e.message });
  }
}
export const config = { runtime: "nodejs" };
