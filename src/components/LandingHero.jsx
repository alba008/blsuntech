import React, { useRef } from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import shoppingAnimation from "../assets/lottie/webdev.json";



const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay: i * 0.06 },
  }),
};

export default function LandingHero({ onOpenStartProject }) {
  const glowRef = useRef(null);

  const onMove = (e) => {
    const el = glowRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
  };

  return (
    <section id="home" onMouseMove={onMove} className="relative overflow-hidden bg-black">
      {/* background */}
      <div className="absolute inset-0 -z-10 bg-dark">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-black to-indigo-950" />
        <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full blur-3xl bg-emerald-500/20" />
        <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full blur-3xl bg-cyan-500/20" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
            backgroundSize: "18px 18px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-20 md:py-0">
        <div className="relative flex flex-col lg:grid lg:grid-cols-2 gap-10 items-center">
          {/* RIGHT: animated tech visual - background for small screens */}
          <div className="relative w-full lg:order-2">
            <div
              ref={glowRef}
              className="relative rounded-2xl border-0 border-white/10 bg-white/0 p-2 backdrop-blur"
              style={{ boxShadow: "0 8px 40px -12px rgba(0,0,0,0.6)" }}
            >
              <div
                className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 lg:opacity-100"
                style={{
                  background:
                    "radial-gradient(400px circle at var(--mx,50%) var(--my,50%), rgba(59,130,246,0.15), transparent 40%)",
                }}
              />

<motion.div
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.8, delay: 0.3 }}
>
  <Lottie
    animationData={shoppingAnimation}
    loop
    style={{
      width: "100%",
      maxWidth: 400,
      height: "auto",
    }}
  />
</motion.div>


              <motion.div className="absolute -left-0 top-8 px-5" initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.8, duration: 0.6 }}>
                <Badge>AI Features</Badge>
              </motion.div>
              <motion.div className="absolute -right-0 top-8 px-5" initial={{ opacity: 0, x: 10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 1.0, duration: 0.6 }}>
                <Badge variant="cyan">Cloud Native</Badge>
              </motion.div>
              <motion.div className="absolute left-1/2 -translate-x-1/2 -bottom-0 py-5" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 1.2, duration: 0.6 }}>
                <Badge variant="indigo">Security First</Badge>
              </motion.div>
            </div>
          </div>

          {/* LEFT: persuasive copy - overlay on mobile */}
          <div className="absolute lg:static z-10 bg-black/80 text-white p-6 sm:p-10  rounded-lg backdrop-blur{ --tw-backdrop-blur: blur(4px);} w-full h-full lg:w-auto lg:h-auto flex flex-col justify-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }}>
              <motion.p variants={fadeUp} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                🚀 BlsunTech — deliver faster, safer, smarter
              </motion.p>
              <motion.h1 variants={fadeUp} custom={1} className="mt-4 text-4xl sm:text-5xl xl:text-6xl font-extrabold leading-[1.05]">
                <span className="bg-gradient-to-r from-emerald-300 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">Build it right.</span> <span className="text-white">Ship it fast.</span>
              </motion.h1>
              <motion.p variants={fadeUp} custom={2} className="mt-4 text-white/75 text-lg max-w-2xl">
                We design, develop, and scale modern products—web apps, AI features, secure infrastructure, and automation. <span className="text-white/90">From idea to production</span>, with measurable outcomes and a partner you can trust.
              </motion.p>
              <motion.ul variants={fadeUp} custom={3} className="mt-6 space-y-3 text-white/85">
                {["MVPs in weeks, not months", "Security & performance by default", "US + Africa delivery, timezone-friendly"].map((t) => (
                  <li key={t} className="flex items-start gap-3">
                    <svg className="mt-0.5 h-5 w-5 text-emerald-300" viewBox="0 0 24 24" fill="none">
                      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>{t}</span>
                  </li>
                ))}
              </motion.ul>
              <motion.div variants={fadeUp} custom={4} className="mt-8 flex flex-wrap items-center gap-3">
                <button onClick={onOpenStartProject} className="rounded-full bg-white text-black px-6 py-3 font-medium hover:bg-slate-100">Start a project</button>
                <a href="#projects" className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-white hover:bg-white/10">See our work</a>
                <a href="#services" className="rounded-full border border-emerald-300/40 bg-emerald-300/10 px-6 py-3 text-emerald-200 hover:bg-emerald-300/20">What we do</a>
              </motion.div>
              <motion.div variants={fadeUp} custom={5} className="mt-8 text-sm text-white/60">
                Trusted for <span className="text-white/90 font-medium">real estate, education, retail, and cybersecurity</span> projects across the US & Africa.
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Badge({ children, variant = "emerald" }) {
  const palette = {
    emerald: "border-emerald-400/40 bg-emerald-400/10 text-emerald-200",
    cyan: "border-cyan-400/40 bg-cyan-400/10 text-cyan-200",
    indigo: "border-indigo-400/40 bg-indigo-400/10 text-indigo-200",
  }[variant];

  return <div className={`rounded-full border px-3 py-1 text-xs backdrop-blur ${palette}`}>{children}</div>;
}
