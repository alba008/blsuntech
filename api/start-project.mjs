// api/start-project.mjs
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
  
      // spam trap
      if (botcheck) return res.status(200).json({ ok: true });
  
      // basic validation
      if (!name || !email || !service || !message) {
        return res.status(400).json({ error: "Missing required fields" });
      }
  
      // optional: email disabled by default in cloud
      if (process.env.EMAIL_DISABLED === "1") {
        return res.status(200).json({
          ok: true,
          id: cryptoRandomId(),
          receivedAt: new Date().toISOString(),
        });
      }
  
      // TODO: add Nodemailer here if you want real emails in cloud
      return res.status(200).json({
        ok: true,
        id: cryptoRandomId(),
        receivedAt: new Date().toISOString(),
      });
    } catch (e) {
      console.error("start-project error:", e);
      return res.status(500).json({ error: "Server error" });
    }
  }
  
  function cryptoRandomId() {
    // tiny id without crypto module (works on Edge/Node)
    return "id-" + Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
  }
  