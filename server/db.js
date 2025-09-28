// server/db.js
import mysql from "mysql2/promise";

let pool;

export function getPool() {
  if (pool) return pool;

  const {
    DB_HOST,
    DB_PORT = "3306",
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
    DB_SSL = "false",
  } = process.env;

  if (!DB_HOST || !DB_USER || !DB_PASSWORD || !DB_NAME) {
    console.warn("[db] env vars missing; DB pool not created");
    return null;
  }

  const ssl = DB_SSL === "true" ? { rejectUnauthorized: false } : undefined;

  pool = mysql.createPool({
    host: DB_HOST,
    port: Number(DB_PORT),
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    waitForConnections: true,
    connectionLimit: 5,
    maxIdle: 5,
    idleTimeout: 60000,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
    ssl,
  });

  console.log("[db] pool created");
  return pool;
}
