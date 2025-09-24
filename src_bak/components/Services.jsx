// src/components/Services.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import StartProjectModal from "./StartProjectModal"; // ⟵ add this import

// ----- copy tailored to BlsunTech -----
const services = [
  { title: "Web & App Development",
    blurb: "Fast, scalable apps and portals built with React, Django, and Bubble — from MVP to production.",
    points: ["SPAs & PWAs", "REST/GraphQL APIs", "Auth & Roles", "Responsive UX"],
    stack: ["React", "Django", "PostgreSQL", "TailwindCSS"],
  },
  { title: "E-commerce & Payments",
    blurb: "Marketplaces that convert: product discovery, checkout flows, analytics, and regional payments.",
    points: ["Multi-vendor", "Recommendations", "SEO", "Analytics"],
    stack: ["Stripe", "M-Pesa", "PayPal", "GA4"],
  },
  { title: "AI, Data & Analytics",
    blurb: "Practical AI for growth — from chatbots to insights. We ship models, pipelines, and clear dashboards.",
    points: ["Chatbots/Assistants", "Recommenders", "ETL/ELT", "BI Dashboards"],
    stack: ["Python", "R", "Ollama", "Rasa"],
  },
  { title: "Cybersecurity",
    blurb: "Harden your stack. We audit, instrument, and monitor to reduce risk and meet best practices.",
    points: ["AppSec", "SIEM/Logging", "Vuln Scans", "Incident Playbooks"],
    stack: ["Wazuh", "Fail2ban", "OWASP", "TLS"],
  },
  { title: "Cloud & DevOps",
    blurb: "Reliable deployments on AWS. Containers, CI/CD, scaling, and performance tuning baked in.",
    points: ["Docker", "CI/CD", "Observability", "Cost Control"],
    stack: ["AWS EC2", "Nginx/Apache", "GitHub Actions", "Docker"],
  },
  { title: "No-Code & Automation",
    blurb: "Automate operations with Bubble + n8n: forms, workflows, integrations, and internal tools.",
    points: ["Internal Tools", "Back-office", "Integrations", "Workflows"],
    stack: ["Bubble", "n8n", "Zapier", "Webhooks"],
  },
  { title: "PropTech Solutions",
    blurb: "Real-estate tech (like KiraEstate): map search, agent portals, listings, and lead pipelines.",
    points: ["Map Search", "Agent CRM", "Favorites", "Nearby Places"],
    stack: ["Google Maps", "PostgreSQL", "Tailwind", "Redis"],
  },
  { title: "Energy & IoT (Jenga Smart)",
    blurb: "Energy-efficiency pilots: building telemetry, habit nudges, and analytics for impact at scale.",
    points: ["IoT Metrics", "Behavior Nudges", "Dashboards", "Pilots"],
    stack: ["Node", "MQTT", "Time-series DB", "BI"],
  },
];

// ---- motion presets ----
const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

// ---- small UI atoms ----
function Chip({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/80 backdrop-blur">
      {children}
    </span>
  );
}

function ServiceCard({ s, openModal }) {
  // hover tilt + cursor glow
  const onMove = (e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const rx = ((y - r.height / 2) / (r.height / 2)) * -6;
    const ry = ((x - r.width / 2) / (r.width / 2)) * 6;
    el.style.setProperty("--rx", `${rx}deg`);
    el.style.setProperty("--ry", `${ry}deg`);
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
  };
  const onLeave = (e) => {
    const el = e.currentTarget;
    el.style.setProperty("--rx", `0deg`);
    el.style.setProperty("--ry", `0deg`);
  };

  return (
    <motion.div variants={item}>
      <div onMouseMove={onMove} onMouseLeave={onLeave} className="group relative [perspective:1000px]">
        {/* gradient border wrapper */}
        <div className="relative rounded-2xl p-[1px] bg-gradient-to-br from-emerald-400/40 via-cyan-400/40 to-indigo-400/40">
          {/* glass card */}
          <div
            className="relative rounded-2xl bg-slate-900/70 backdrop-blur-xl border border-white/10 p-6 transition-transform duration-300 will-change-transform"
            style={{ transform: "rotateX(var(--rx,0)) rotateY(var(--ry,0))" }}
          >
            {/* cursor glow */}
            <div
              className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500"
              style={{
                background:
                  "radial-gradient(280px circle at var(--mx,50%) var(--my,50%), rgba(56,189,248,0.10), transparent 40%)",
              }}
            />
            <h3 className="text-lg md:text-xl font-semibold text-white">{s.title}</h3>
            <p className="text-sm text-white/70 mt-1.5">{s.blurb}</p>

            <ul className="mt-4 space-y-2 text-sm text-white/80">
              {s.points.map((p) => (
                <li key={p} className="flex items-start gap-2">
                  <span className="mt-0.5 h-2 w-2 rounded-full bg-emerald-400/80" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>

            <div className="mt-5 flex flex-wrap gap-2">
              {s.stack.map((t) => (
                <Chip key={t}>{t}</Chip>
              ))}
            </div>

            <div className="mt-6 flex gap-3">
              {/* ⟵ changed to button and opens modal with the service title */}
              <button
                onClick={() => openModal(s.title)}
                className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-200 hover:bg-emerald-400/20 transition"
              >
                Start a project
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <a
                href="#process"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10 transition"
              >
                Our process
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const [modalOpen, setModalOpen] = useState(false);
  const [presetService, setPresetService] = useState("");

  const openModal = (serviceTitle) => {
    setPresetService(serviceTitle);
    setModalOpen(true);
  };

  return (
    <section id="services" className="relative py-24 sm:py-28 bg-black">
      {/* background layers */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-black to-indigo-950" />
        <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full blur-3xl bg-emerald-500/20" />
        <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full blur-3xl bg-cyan-500/20" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "18px 18px" }}
        />
      </div>

      <motion.div className="max-w-6xl mx-auto px-6" variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
        <motion.h2 className="text-center text-4xl sm:text-5xl font-extrabold tracking-tight mb-4" variants={item}>
          <span className="bg-gradient-to-r from-emerald-300 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">Services</span>
        </motion.h2>

        <motion.p className="text-center text-white/70 max-w-2xl mx-auto mb-12" variants={item}>
          End-to-end delivery from idea to launch: strategy, build, and growth — optimized for Africa & US markets.
        </motion.p>

        <motion.div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10" variants={container}>
          {services.map((s) => (
            <ServiceCard key={s.title} s={s} openModal={openModal} />
          ))}
        </motion.div>

        {/* CTA banner */}
        <motion.div className="mt-14 rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6 flex flex-col md:flex-row items-center justify-between gap-4" variants={item}>
          <div className="text-white">
            <div className="text-lg font-semibold">Have a brief or an idea?</div>
            <div className="text-white/70 text-sm">We’ll scope it in 48 hours and propose the fastest path to value.</div>
          </div>
          <a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-white text-black px-5 py-2 font-medium hover:bg-slate-100 transition">
            Book a discovery call
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </motion.div>
      </motion.div>

      {/* Modal lives at the end of the section so backdrop covers the section cleanly */}
      <StartProjectModal open={modalOpen} onClose={() => setModalOpen(false)} presetService={presetService} />
    </section>
  );
}
