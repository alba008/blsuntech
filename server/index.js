// server/index.js
import "dotenv/config";
import express from "express";
import cors from "cors";
import startProjectRouter from "./routes/startProject.js";

const app = express();

// --- config ---
const ORIGIN = process.env.ORIGIN || "http://localhost:3000"; // CRA default
app.use(cors({ origin: ORIGIN, credentials: false }));
app.use(express.json());

// --- routes ---
app.get("/api/health", (_req, res) => res.json({ ok: true }));
app.use("/api", startProjectRouter);
// Debug: list mounted routes
const printRoutes = () => {
    const lines = [];
    app._router?.stack?.forEach((m) => {
      if (m.name === "router" && m.handle.stack) {
        m.handle.stack.forEach((h) => {
          if (h.route) {
            const method = Object.keys(h.route.methods)[0]?.toUpperCase();
            const path = h.route.path;
            lines.push(`${method} /api${path}`);
          }
        });
      }
    });
    console.log("Routes:\n" + lines.join("\n"));
  };
  printRoutes();
  

// --- start ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
