// src/components/StartProjectModal.jsx
import React, { useEffect, useState } from "react";

// Always call the API with a relative path. In dev, CRA will proxy /api/*
// to your local server (via package.json "proxy"). In prod (Vercel),
// /api/* goes to your serverless functions.
 const API_BASE =
   typeof process !== "undefined" && process.env?.REACT_APP_API_BASE
     ? process.env.REACT_APP_API_BASE
  : ""; // empty = same origin, e.g. https://blsuntech.vercel.app
export default function StartProjectModal({ open, onClose, presetService }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    service: presetService || "",
    budget: "",
    timeline: "",
    message: "",
    botcheck: "", // honeypot (hidden)
  });

  const [status, setStatus] = useState({ sending: false, done: false, error: "" });
  const [serverInfo, setServerInfo] = useState(null); // { id, receivedAt }

  // Keep "service" in sync when presetService changes (e.g., user clicked a CTA)
  useEffect(() => {
    if (open) {
      setForm((f) => ({ ...f, service: presetService || f.service }));
      setStatus({ sending: false, done: false, error: "" });
      setServerInfo(null);
    }
  }, [presetService, open]);

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (form.botcheck) return; // spam trap

    setStatus({ sending: true, done: false, error: "" });
    setServerInfo(null);

    try {
      const res = await fetch(`${API_BASE}/api/start-project`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || `Request failed (${res.status})`);

      setServerInfo({
        id: data?.id || "N/A",
        receivedAt: data?.receivedAt || new Date().toISOString(),
      });
      setStatus({ sending: false, done: true, error: "" });
    } catch (err) {
      setStatus({ sending: false, done: false, error: err.message || "Failed to send" });
    }
  };

  const copyRef = async () => {
    if (!serverInfo?.id) return;
    try {
      await navigator.clipboard.writeText(serverInfo.id);
      alert("Reference ID copied!");
    } catch {
      // ignore
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* backdrop */}
      <button
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close modal backdrop"
      />

      {/* modal */}
      <div className="relative w-full max-w-2xl rounded-2xl p-[1px] bg-gradient-to-br from-emerald-400/40 via-cyan-400/40 to-indigo-400/40">
        <div className="rounded-2xl bg-slate-900/90 border border-white/10 p-6">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-xl font-semibold text-white">Start a Project</h3>
            <button
              onClick={onClose}
              className="text-white/70 hover:text-white"
              aria-label="Close"
              type="button"
            >
              ✕
            </button>
          </div>

          {status.done ? (
            /* ✅ Success view shows server info */
            <div className="mt-6 space-y-4">
              <div className="rounded-xl border border-emerald-400/30 bg-emerald-400/10 p-4 text-emerald-200">
                <div className="font-semibold">
                  Thank you, {form.name || "friend"}! 🎉
                </div>
                <div className="text-emerald-100/80">
                  We’ve received your brief for{" "}
                  <span className="font-medium">{form.service || "your project"}</span>.
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <label className="text-white/70 text-sm mb-1 block">Reference ID</label>
                <div className="flex items-center justify-between gap-3">
                  <code className="font-mono text-sm text-white break-all">
                    {serverInfo?.id}
                  </code>
                  <button
                    onClick={copyRef}
                    className="rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs text-white hover:bg-white/20"
                    type="button"
                  >
                    Copy
                  </button>
                </div>
                <div className="text-white/60 text-xs mt-2">
                  Received: {new Date(serverInfo?.receivedAt).toLocaleString()}
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={onClose}
                  className="rounded-full bg-white text-black px-5 py-2 font-medium hover:bg-slate-100"
                  type="button"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} className="mt-6 space-y-4" noValidate>
              {/* honeypot */}
              <input
                type="text"
                id="botcheck"
                name="botcheck"
                autoComplete="off"
                className="hidden"
                value={form.botcheck}
                onChange={update}
                tabIndex={-1}
              />

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm text-white/70 mb-1">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    autoComplete="name"
                    value={form.name}
                    onChange={update}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-emerald-400/40"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm text-white/70 mb-1">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    autoComplete="email"
                    value={form.email}
                    onChange={update}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-emerald-400/40"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="company" className="block text-sm text-white/70 mb-1">
                    Company
                  </label>
                  <input
                    id="company"
                    name="company"
                    autoComplete="organization"
                    value={form.company}
                    onChange={update}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-emerald-400/40"
                  />
                </div>
                <div>
                  <label htmlFor="service" className="block text-sm text-white/70 mb-1">
                    Service
                  </label>
                  <select
                    id="service"
                    name="service"
                    required
                    value={form.service}
                    onChange={update}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-emerald-400/40"
                  >
                    <option value="" disabled>
                      Select a service
                    </option>
                    <option>Web & App Development</option>
                    <option>E-commerce & Payments</option>
                    <option>AI, Data & Analytics</option>
                    <option>Cybersecurity</option>
                    <option>Cloud & DevOps</option>
                    <option>No-Code & Automation</option>
                    <option>PropTech Solutions</option>
                    <option>Energy & IoT</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="budget" className="block text-sm text-white/70 mb-1">
                    Budget
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    required
                    value={form.budget}
                    onChange={update}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-emerald-400/40"
                  >
                    <option value="" disabled>
                      Select budget
                    </option>
                    <option>Under $5k</option>
                    <option>$5k – $15k</option>
                    <option>$15k – $40k</option>
                    <option>$40k+</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="timeline" className="block text-sm text-white/70 mb-1">
                    Timeline
                  </label>
                  <select
                    id="timeline"
                    name="timeline"
                    required
                    value={form.timeline}
                    onChange={update}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-emerald-400/40"
                  >
                    <option value="" disabled>
                      Select timeline
                    </option>
                    <option>ASAP</option>
                    <option>2–4 weeks</option>
                    <option>1–3 months</option>
                    <option>3+ months</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm text-white/70 mb-1">
                  Brief
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  value={form.message}
                  onChange={update}
                  placeholder="Describe the problem, users, and success criteria…"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-emerald-400/40"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-white hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  disabled={status.sending}
                  className="rounded-full bg-white text-black px-5 py-2 font-medium hover:bg-slate-100 disabled:opacity-60"
                >
                  {status.sending ? "Sending…" : "Submit"}
                </button>
              </div>

              {status.error && (
                <div className="text-rose-300 text-sm mt-2">{status.error}</div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
