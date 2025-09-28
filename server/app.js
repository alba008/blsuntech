// server/app.js
import "dotenv/config";
import express from "express";
import cors from "cors";
import startProjectRouter from "./routes/startProject.js";

const app = express();
app.use(express.json());

// When frontend & API are the same Vercel project, you can keep CORS open or same-origin
app.use(cors({ origin: process.env.ORIGIN || true }));

// IMPORTANT: define base routes WITHOUT the '/api' prefix.
// Vercel adds '/api' automatically. For local dev we’ll mount this app at '/api'.
app.get("/health", (_req, res) => res.json({ ok: true }));

// your routes root
app.use("/", startProjectRouter);

export default app;

if (process.env.NODE_ENV === "development") {
    const lines = [];
    app._router?.stack?.forEach((m) => {
      if (m.route) {
        const method = Object.keys(m.route.methods)[0]?.toUpperCase();
        lines.push(`${method} ${m.route.path}`);
      } else if (m.name === "router" && m.handle?.stack) {
        m.handle.stack.forEach((h) => {
          if (h.route) {
            const method = Object.keys(h.route.methods)[0]?.toUpperCase();
            lines.push(`${method} ${h.route.path}`);
          }
        });
      }
    });
    console.log("App routes:\n" + lines.join("\n"));
  }
  