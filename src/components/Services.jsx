// src/components/Services.jsx
import React, { useLayoutEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import StartProjectModal from "./StartProjectModal";
import Lottie from "lottie-react";

/* ---------- Lottie assets (import the ones you have) ---------- */
import animDev from "../assets/lottie/dev.json";
import animEcom from "../assets/lottie/ecommerce.json";
import animAI from "../assets/lottie/ai.json";
import animSecurity from "../assets/lottie/security.json";
import animDevOps from "../assets/lottie/devops.json";
// import animNoCode from "../assets/lottie/nocode.json";
// import animProptech from "../assets/lottie/proptech.json";

/* Map key -> animation */
const LOTTIES = {
  dev: animDev,
  ecommerce: animEcom,
  ai: animAI,
  security: animSecurity,
  devops: animDevOps,
  // nocode: animNoCode,
  // proptech: animProptech,
};

/* ---------- data ---------- */
const services = [
  {
    title: "Web & App Development",
    lottie: "dev",
    blurb: "Fast, scalable apps and portals built with React, Django, and Bubble — from MVP to production.",
    points: ["SPAs & PWAs", "REST/GraphQL APIs", "Auth & Roles", "Responsive UX"],
    stack: ["React", "Django", "PostgreSQL", "TailwindCSS"],
  },
  {
    title: "E-commerce & Payments",
    lottie: "ecommerce",
    blurb: "Marketplaces that convert: product discovery, checkout flows, analytics, and regional payments.",
    points: ["Multi-vendor", "Recommendations", "SEO", "Analytics"],
    stack: ["Stripe", "M-Pesa", "PayPal", "GA4"],
  },
  {
    title: "AI, Data & Analytics",
    lottie: "ai",
    blurb: "Practical AI for growth — from chatbots to insights. We ship models, pipelines, and clear dashboards.",
    points: ["Chatbots/Assistants", "Recommenders", "ETL/ELT", "BI Dashboards"],
    stack: ["Python", "R", "Ollama", "Rasa"],
  },
  {
    title: "Cybersecurity",
    lottie: "security",
    blurb: "Harden your stack. We audit, instrument, and monitor to reduce risk and meet best practices.",
    points: ["AppSec", "SIEM/Logging", "Vuln Scans", "Incident Playbooks"],
    stack: ["Wazuh", "Fail2ban", "OWASP", "TLS"],
  },
  {
    title: "Cloud & DevOps",
    lottie: "devops",
    blurb: "Reliable deployments on AWS. Containers, CI/CD, scaling, and performance tuning baked in.",
    points: ["Docker", "CI/CD", "Observability", "Cost Control"],
    stack: ["AWS EC2", "Nginx/Apache", "GitHub Actions", "Docker"],
  },
  {
    title: "No-Code & Automation",
    lottie: "nocode",
    blurb: "Automate operations with Bubble + n8n: forms, workflows, integrations, and internal tools.",
    points: ["Internal Tools", "Back-office", "Integrations", "Workflows"],
    stack: ["Bubble", "n8n", "Zapier", "Webhooks"],
  },
  {
    title: "PropTech Solutions",
    lottie: "proptech",
    blurb: "Real-estate tech (like KiraEstate): map search, agent portals, listings, and lead pipelines.",
    points: ["Map Search", "Agent CRM", "Favorites", "Nearby Places"],
    stack: ["Google Maps", "PostgreSQL", "Tailwind", "Redis"],
  },
];

/* ---------- motion presets ---------- */
const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } } };
const leftVariant  = { hidden: { opacity: 0, x: -60, scale: 0.98 }, show: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.45 } } };
const rightVariant = { hidden: { opacity: 0, x:  60, scale: 0.98 }, show: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.45 } } };

const mobileContainer = { hidden: { opacity: 1 }, show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } } };
const mobileZoom = { hidden: { opacity: 0, scale: 0.96, y: 8 }, show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.30, ease: "easeOut" } } };

/* ---------- mobile detection ---------- */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useLayoutEffect(() => {
    const q = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(q.matches);
    update();
    q.addEventListener?.("change", update);
    return () => q.removeEventListener?.("change", update);
  }, []);
  return isMobile;
}

/* ---------- atoms ---------- */
function Chip({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-slate-700 bg-slate-800/80 px-2.5 py-1 text-xs text-slate-200">
      {children}
    </span>
  );
}

/* ---------- Lottie helpers ---------- */
function usePrefersReducedMotion() {
  const [reduce, setReduce] = React.useState(false);
  React.useEffect(() => {
    const mql = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mql) return;
    const onChange = () => setReduce(!!mql.matches);
    onChange();
    mql.addEventListener?.("change", onChange);
    return () => mql.removeEventListener?.("change", onChange);
  }, []);
  return reduce;
}

function LottieIcon({ name, size = 180, className = "" }) {
  const reduce = usePrefersReducedMotion();
  const data = LOTTIES[name];
  if (!data) {
    // graceful placeholder (e.g., for nocode/proptech until you add files)
    return (
      <div
        className={`rounded-2xl bg-slate-800/70 border border-white/10 ${className}`}
        style={{ width: size, height: size }}
        aria-hidden="true"
      />
    );
  }
  return (
    <div className={`pointer-events-none select-none ${className}`} style={{ width: size, height: size }}>
      <Lottie
        animationData={data}
        autoplay={!reduce}
        loop={!reduce}
        style={{ width: "100%", height: "100%" }}
        aria-hidden="true"
      />
    </div>
  );
}

/* ---------- background stars ---------- */
const SHOOTERS_DESKTOP = [
  { top: "12%", left: "8%",  delay: "0s",   dur: "6s" },
  { top: "28%", left: "18%", delay: "1.2s", dur: "7s" },
  { top: "40%", left: "5%",  delay: "2.1s", dur: "6.5s" },
  { top: "58%", left: "12%", delay: "3.4s", dur: "7.5s" },
  { top: "22%", left: "70%", delay: "0.8s", dur: "6.2s" },
  { top: "68%", left: "62%", delay: "2.8s", dur: "7.2s" },
  { top: "76%", left: "30%", delay: "1.9s", dur: "6.8s" },
  { top: "14%", left: "46%", delay: "3.1s", dur: "7.8s" },
];
const SHOOTERS_MOBILE = [
  { top: "18%", left: "12%", delay: "0s",   dur: "6.5s" },
  { top: "52%", left: "28%", delay: "1.6s", dur: "7.2s" },
  { top: "30%", left: "72%", delay: "0.9s", dur: "6.8s" },
];

/* ---------- Cards ---------- */
function MobileCard({ s, openModal }) {
  return (
    <motion.div
      variants={mobileZoom}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      whileTap={{ scale: 0.98 }}
      className="rounded-2xl border border-slate-800 bg-slate-900 p-5 will-change-transform"
    >
      <h3 className="text-base font-semibold text-white mb-2">{s.title}</h3>

      <div className="grid grid-cols-[1fr,120px] items-start gap-4">
        <div>
          <p className="text-sm text-slate-300">{s.blurb}</p>
          <ul className="mt-3 space-y-1.5 text-sm text-slate-200">
            {s.points.map((p) => (
              <li key={p} className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-wrap gap-2">
            {s.stack.map((t) => <Chip key={t}>{t}</Chip>)}
          </div>
          <div className="mt-5 flex gap-3">
            <button
              onClick={() => openModal(s.title)}
              className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-200 active:scale-[0.99] transition"
            >
              Start a project
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <a
              href="#process"
              className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800 px-4 py-2 text-sm text-slate-200 active:scale-[0.99] transition"
            >
              Our process
            </a>
          </div>
        </div>

        <div className="flex justify-center">
          <LottieIcon name={s.lottie} size={120} className="md:hidden" />
        </div>
      </div>
    </motion.div>
  );
}

function DesktopCard({ s, openModal, side }) {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.2 });

  return (
    <motion.div ref={ref} variants={side === "left" ? leftVariant : rightVariant} initial="hidden" animate={inView ? "show" : "hidden"}>
      <div className="group relative rounded-2xl p-[1px] bg-gradient-to-br from-emerald-400/30 via-cyan-400/30 to-indigo-400/30">
        <div className="rounded-2xl bg-slate-900 border border-white/10 p-6">
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
            {s.stack.map((t) => <Chip key={t}>{t}</Chip>)}
          </div>
          <div className="mt-6 flex gap-3">
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
    </motion.div>
  );
}

/* ---------- NEW: Desktop row = card on one half + big lottie opposite ---------- */
function DesktopRow({ s, idx, openModal }) {
  const cardOnLeft = idx % 2 === 0; // even index: card left, lottie right

  return (
    <div className="relative">
      <div className="grid grid-cols-2 gap-6 items-stretch">
        {/* Card half */}
        <div className={cardOnLeft ? "md:pr-12" : "order-2 md:pl-12"}>
          <DesktopCard s={s} openModal={openModal} side={cardOnLeft ? "left" : "right"} />
        </div>

        {/* Opposite big Lottie half */}
        <div className={cardOnLeft ? "hidden md:flex items-center md:pl-12 justify-start" : "hidden md:flex items-center md:pr-12 justify-end"}>
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="pointer-events-none select-none drop-shadow-xl xl:scale-110"
          >
            <LottieIcon name={s.lottie} size={280} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Component ---------- */
export default function Services() {
  const [modalOpen, setModalOpen] = useState(false);
  const [presetService, setPresetService] = useState("");
  const isMobile = useIsMobile();

  const openModal = (serviceTitle) => {
    setPresetService(serviceTitle);
    setModalOpen(true);
  };

  /* ---------- MOBILE ---------- */
  if (isMobile) {
    return (
      <section id="services" className="relative py-16 bg-black overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-black to-indigo-950" />
          <div
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage:
                "radial-gradient(rgba(56,189,248,0.35) 1px, transparent 1px), radial-gradient(rgba(16,185,129,0.55) 1px, transparent 1px)",
              backgroundSize: "12px 12px, 28px 28px",
              backgroundPosition: "0 0, 9px 9px",
              animation: "dot-drift 30s linear infinite",
            }}
          />
          <div className="absolute inset-0 pointer-events-none">
            {SHOOTERS_MOBILE.map((s, i) => (
              <span key={i} className="shooting-star" style={{ top: s.top, left: s.left, animationDelay: s.delay, animationDuration: s.dur }}>
                <i />
              </span>
            ))}
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-center text-3xl font-extrabold tracking-tight mb-3">
            <span className="bg-gradient-to-r from-emerald-300 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">Services</span>
          </h2>
          <p className="text-center text-slate-300 max-w-2xl mx-auto mb-8 text-sm">
            End-to-end delivery from idea to launch: strategy, build, and growth — optimized for Africa &amp; US markets.
          </p>

          <motion.div className="grid grid-cols-1 gap-6" variants={mobileContainer} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
            {services.map((s) => <MobileCard key={s.title} s={s} openModal={openModal} />)}
          </motion.div>

          <motion.div
            className="mt-10 rounded-2xl border border-slate-800 bg-slate-900 p-4 flex flex-col md:flex-row items-center justify-between gap-4"
            variants={mobileZoom}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            <div className="text-white text-sm">
              <div className="text-base font-semibold">Have a brief or an idea?</div>
              <div className="text-slate-300 text-xs">We’ll scope it in 48 hours and propose the fastest path to value.</div>
            </div>
            <button
              type="button"
              onClick={() => openModal("Discovery Call")}
              className="inline-flex items-center gap-2 rounded-full bg-white text-black px-4 py-2 font-medium hover:bg-slate-100 active:scale-[0.99] transition"
            >
              Book a discovery call
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </motion.div>
        </div>

        <StartProjectModal open={modalOpen} onClose={() => setModalOpen(false)} presetService={presetService} />

        <style>{`
          @keyframes dot-drift { 0% { background-position: 0 0, 9px 9px; } 100% { background-position: 20px 20px, 29px 29px; } }
          @keyframes shoot { 0% { transform: translate3d(0,0,0) rotate(-22deg); opacity: 0; } 10% { opacity: 1; } 100% { transform: translate3d(360px,-160px,0) rotate(-22deg); opacity: 0; } }
          .shooting-star { position: absolute; width: 120px; height: 2px; background: linear-gradient(90deg, rgba(125,211,252,0.95), rgba(56,189,248,0.55), rgba(56,189,248,0)); filter: drop-shadow(0 0 5px rgba(125,211,252,0.6)); transform: rotate(-22deg); animation: shoot linear infinite; opacity: 0.85; }
          .shooting-star i { position: absolute; right: 0; top: -3px; width: 8px; height: 8px; border-radius: 9999px; background: white; box-shadow: 0 0 10px rgba(255,255,255,0.85), 0 0 20px rgba(56,189,248,0.6); }
        `}</style>
      </section>
    );
  }

  /* ---------- DESKTOP/TABLET ---------- */
  return (
    <section id="services" className="relative py-24 bg-black isolate overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-black to-indigo-950" />
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage: "radial-gradient(rgba(56,189,248,0.45) 1px, transparent 1px), radial-gradient(rgba(16,185,129,0.75) 1px, transparent 1px)",
            backgroundSize: "12px 12px, 28px 28px",
            backgroundPosition: "0 0, 9px 9px",
            animation: "dot-drift 30s linear infinite",
          }}
        />
        <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full blur-3xl bg-emerald-500/20" />
        <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full blur-3xl bg-cyan-500/20" />
        <div className="absolute inset-0 pointer-events-none">
          {SHOOTERS_DESKTOP.map((s, i) => (
            <span key={i} className="shooting-star" style={{ top: s.top, left: s.left, animationDelay: s.delay, animationDuration: s.dur }}>
              <i />
            </span>
          ))}
        </div>
      </div>

      <motion.div className="max-w-6xl mx-auto px-6" variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
        <motion.h2 className="text-center text-5xl font-extrabold tracking-tight mb-4" variants={item}>
          <span className="bg-gradient-to-r from-emerald-300 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">Services</span>
        </motion.h2>

        <motion.p className="text-center text-white/70 max-w-2xl mx-auto mb-12" variants={item}>
          End-to-end delivery from idea to launch: strategy, build, and growth — optimized for Africa &amp; US markets.
        </motion.p>

        <div className="relative">
          {/* center line */}
          <div className="absolute inset-y-0 left-1/2 w-px bg-gradient-to-b from-emerald-400/40 via-cyan-400/40 to-indigo-400/40" />

          {/* rows with card + opposite big lottie */}
          <div className="flex flex-col gap-16 relative z-10">
            {services.map((s, idx) => (
              <DesktopRow key={s.title} s={s} idx={idx} openModal={openModal} />
            ))}
          </div>
        </div>

        <motion.div className="mt-14 rounded-2xl border border-white/10 bg-white/5 p-6 flex flex-col md:flex-row items-center justify-between gap-4" variants={item}>
          <div className="text-white">
            <div className="text-lg font-semibold">Have a brief or an idea?</div>
            <div className="text-white/70 text-sm">We’ll scope it in 48 hours and propose the fastest path to value.</div>
          </div>
          <button
            type="button"
            onClick={() => openModal("Discovery Call")}
            className="inline-flex items-center gap-2 rounded-full bg-white text-black px-5 py-2 font-medium hover:bg-slate-100 transition"
          >
            Book a discovery call
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </motion.div>
      </motion.div>

      <StartProjectModal open={modalOpen} onClose={() => setModalOpen(false)} presetService={presetService} />

      <style>{`
        @keyframes dot-drift { 0% { background-position: 0 0, 9px 9px; } 100% { background-position: 20px 20px, 29px 29px; } }
        @keyframes shoot { 0% { transform: translate3d(0,0,0) rotate(-22deg); opacity: 0; } 8% { opacity: 1; } 100% { transform: translate3d(620px,-220px,0) rotate(-22deg); opacity: 0; } }
        .shooting-star { position: absolute; width: 160px; height: 2px; background: linear-gradient(90deg, rgba(125,211,252,0.95), rgba(56,189,248,0.55), rgba(56,189,248,0)); filter: drop-shadow(0 0 6px rgba(125,211,252,0.7)); transform: rotate(-22deg); animation: shoot linear infinite; opacity: 0.9; }
        .shooting-star i { position: absolute; right: 0; top: -3px; width: 8px; height: 8px; border-radius: 9999px; background: white; box-shadow: 0 0 12px rgba(255,255,255,0.9), 0 0 24px rgba(56,189,248,0.7); }
      `}</style>
    </section>
  );
}
