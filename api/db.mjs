// Serverless MySQL pool (mysql2/promise)
import mysql from "mysql2/promise";

let pool = null;
export async function getPool() {
  const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } = process.env;
  if (pool) return pool;
  if (!DB_HOST || !DB_USER || !DB_PASSWORD || !DB_NAME) return null;
  pool = await mysql.createPool({
    host: DB_HOST,
    port: Number(DB_PORT || 3306),
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    connectionLimit: 3
  });
  return pool;
}

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
  }
  return pool;
}
