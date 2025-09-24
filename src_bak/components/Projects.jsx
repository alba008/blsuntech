// src/components/Projects.jsx
import React from "react";
import { motion } from "framer-motion";

const projects = [
  {
    title: "Makutanoni.com – Virtual Mall Marketplace",
    description:
      "A modern virtual shopping mall with multi-vendor listings, Amazon affiliate integration, and intelligent discovery.",
    tech: ["Django", "PostgreSQL", "TailwindCSS", "n8n"],
    link: "https://makutanoni.com",
  },
  {
    title: "KiraEstate.com – Real Estate Marketplace",
    description:
      "A real estate marketplace for Tanzania & East Africa featuring map-based property search & filters, agent dashboards, saved favorites, nearby places, and contact/booking flows.",
    tech: ["AlpineJS", "TailwindCSS", "Google Maps", "M-Pesa API"],
    link: "https://kiraestate.com",
  },
  {
    title: "Sockcs.com – E-commerce & Analytics",
    description:
      "A data-driven online shop with visitor tracking, product recommendations, and SEO-optimized architecture.",
    tech: ["Django", "Custom API", "Google Analytics", "Email Auth"],
    link: "https://sockcs.com",
  },
  {
    title: "The Watcher – Education LMS Platform",
    description:
      "A full-featured learning platform with course uploads, dashboards, and real-time progress tracking.",
    tech: ["React", "Firebase", "Realtime DB", "Progress Metrics"],
    link: "https://ithewatcher.com",
  },
];

// --- small helpers ---
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

function TechBadge({ label }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80 backdrop-blur">
      {label}
    </span>
  );
}

function ProjectCard({ project }) {
  // 3D tilt + cursor glow using CSS vars
  const onMove = (e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const midX = r.width / 2;
    const midY = r.height / 2;
    const rotX = ((y - midY) / midY) * -6; // tilt up/down
    const rotY = ((x - midX) / midX) * 6; // tilt left/right
    el.style.setProperty("--rx", `${rotX}deg`);
    el.style.setProperty("--ry", `${rotY}deg`);
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
      <div
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="group relative [perspective:1000px]"
      >
        {/* gradient border wrapper */}
        <div className="relative rounded-2xl p-[1px] bg-gradient-to-br from-emerald-400/40 via-cyan-400/40 to-indigo-400/40">
          {/* card */}
          <div
            className="rounded-2xl bg-slate-900/70 backdrop-blur-xl border border-white/10 p-6 transition-transform duration-300 will-change-transform"
            style={{
              transform: "rotateX(var(--rx,0)) rotateY(var(--ry,0))",
            }}
          >
            {/* subtle moving glow */}
            <div
              className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500"
              style={{
                background:
                  "radial-gradient(300px circle at var(--mx,50%) var(--my,50%), rgba(56,189,248,0.12), transparent 40%)",
              }}
            />
            <h3 className="text-xl md:text-2xl font-semibold mb-2 text-white">
              {project.title}
            </h3>
            <p className="text-sm md:text-base text-white/70 mb-4">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-5">
              {project.tech.map((t) => (
                <TechBadge key={t} label={t} />
              ))}
            </div>

            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-emerald-400/40 transition"
              >
                View Project
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 12h14M12 5l7 7-7 7"
                  />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative py-24 bg-black/60 bg-cover bg-center bg-blend-multiply"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')",
      }}
    >      {/* background layers */}
      <div className="absolute inset-0 -z-10">
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

      <motion.div
        className="max-w-6xl mx-auto px-6"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.h2
          className="text-center text-4xl sm:text-5xl font-extrabold tracking-tight mb-4"
          variants={item}
        >
          <span className="bg-gradient-to-r from-emerald-300 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
            Our Projects
          </span>
        </motion.h2>
        <motion.p
          className="text-center text-white/70 max-w-2xl mx-auto mb-12"
          variants={item}
        >
          A curated selection of platforms and products crafted with performance,
          clarity, and delightful UI at the core.
        </motion.p>

        <motion.div
          className="grid md:grid-cols-2 gap-8 lg:gap-10"
          variants={container}
        >
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
