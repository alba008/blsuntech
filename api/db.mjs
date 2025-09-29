// api/db.mjs
import mysql from "mysql2/promise";

let pool = null;

export function getPool() {
  if (pool) return pool;

  const {
    DB_HOST,
    DB_USER,
    DB_PASS,
    DB_NAME,
    DB_PORT = "3306",
  } = process.env;

  // If any required var is missing, skip creating a pool
  if (!DB_HOST || !DB_USER || !DB_NAME) {
    console.warn("[db] env vars missing; DB pool not created");
    return null;
  }

  pool = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS || undefined,
    database: DB_NAME,
    port: Number(DB_PORT || 3306),
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0,
    ssl: process.env.DB_SSL === "1" ? { rejectUnauthorized: false } : undefined,
  });

  return pool;
}
