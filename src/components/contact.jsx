// src/components/Contact.jsx
import React from "react";

export default function Contact({ onOpenStartProject }) {
  return (
    <footer id="contact" className="relative overflow-hidden bg-black">
      {/* background layers */}
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

      {/* top CTA bar */}
      <section className="container-safe py-14">
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold">
              <span className="bg-gradient-to-r from-emerald-300 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
                Let’s build something great.
              </span>
            </h2>
            <p className="text-white/70 mt-2">
              Web & apps, AI features, cloud, security, and automation—delivered fast and safely.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={
                onOpenStartProject ??
                (() => document.querySelector("#contact-details")?.scrollIntoView({ behavior: "smooth" }))
              }
              className="rounded-full bg-white text-black px-5 py-2.5 font-medium hover:bg-slate-100"
            >
              Start a project
            </button>
            <a
              href="mailto:info@blsuntech.com?subject=Project%20Enquiry"
              className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-white hover:bg-white/10"
            >
              Email us
            </a>
          </div>
        </div>
      </section>

      {/* footer grid */}
      <section id="contact-details" className="container-safe pb-10">
        <div className="grid gap-10 md:grid-cols-4">
          {/* brand / blurb */}
          <div className="md:col-span-2">
            <div className="text-xl font-bold">BlsunTech</div>
            <p className="text-white/70 mt-3 max-w-prose">
              Results-driven engineering for modern companies. We ship secure, scalable products—
              from MVP to production—across the US & Africa.
            </p>

            {/* social */}
            <div className="mt-5 flex items-center gap-3">
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center h-9 w-9 rounded-full border border-white/10 bg-white/5 hover:bg-white/10"
                aria-label="LinkedIn"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-white/80">
                  <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM0 8h5v15H0V8zm7.5 0h4.8v2.1h.07c.67-1.2 2.3-2.46 4.73-2.46 5.06 0 6 3.33 6 7.66V23H18V16.1c0-1.65-.03-3.77-2.3-3.77-2.3 0-2.65 1.8-2.65 3.65V23H7.5V8z" />
                </svg>
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center h-9 w-9 rounded-full border border-white/10 bg-white/5 hover:bg-white/10"
                aria-label="GitHub"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-white/80">
                  <path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58 0-.29-.01-1.04-.02-2.05-3.34.73-4.04-1.61-4.04-1.61-.55-1.4-1.34-1.77-1.34-1.77-1.09-.74.08-.73.08-.73 1.2.08 1.83 1.23 1.83 1.23 1.07 1.83 2.82 1.3 3.51.99.11-.78.42-1.3.76-1.6-2.67-.3-5.48-1.34-5.48-5.96 0-1.32.47-2.4 1.24-3.25-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.48 11.48 0 0 1 6 0c2.3-1.55 3.31-1.23 3.31-1.23.66 1.65.24 2.87.12 3.17.77.85 1.23 1.93 1.23 3.25 0 4.63-2.82 5.65-5.5 5.95.43.37.81 1.1.81 2.22 0 1.6-.02 2.88-.02 3.28 0 .32.21.69.83.57A12 12 0 0 0 12 .5Z" />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center h-9 w-9 rounded-full border border-white/10 bg-white/5 hover:bg-white/10"
                aria-label="Twitter"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-white/80">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.27 4.27 0 0 0 1.88-2.36 8.54 8.54 0 0 1-2.71 1.03 4.25 4.25 0 0 0-7.23 3.88 12.07 12.07 0 0 1-8.76-4.44 4.25 4.25 0 0 0 1.32 5.67 4.2 4.2 0 0 1-1.92-.53v.06a4.25 4.25 0 0 0 3.41 4.17 4.3 4.3 0 0 1-1.91.07 4.25 4.25 0 0 0 3.96 2.95A8.53 8.53 0 0 1 2 19.54 12.04 12.04 0 0 0 8.29 21.5c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.36-.02-.55A8.35 8.35 0 0 0 22.46 6Z" />
                </svg>
              </a>
            </div>
          </div>

          {/* contact */}
          <div>
            <h3 className="text-white/90 font-semibold">Contact</h3>
            <ul className="mt-3 space-y-2 text-white/75">
              <li className="flex gap-2">
                <span className="text-white/50">Email:</span>
                <a className="hover:underline" href="mailto:info@blsuntech.com">info@blsuntech.com</a>
              </li>
              <li className="flex gap-2">
                <span className="text-white/50">Phone:</span>
                <a className="hover:underline" href="tel:+13153516254">+1 315 351-6254</a>
              </li>
              <li className="flex gap-2">
                <span className="text-white/50">Location:</span>
                <span>New Jersey, USA</span>
              </li>
              <li className="pt-2">
                <a
                  href="#services"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm hover:bg-white/10"
                >
                  Our services
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </li>
            </ul>
          </div>

          {/* quick links / newsletter */}
          <div>
            <h3 className="text-white/90 font-semibold">Quick Links</h3>
            <ul className="mt-3 space-y-2 text-white/75">
              <li><a className="hover:underline" href="#projects">Projects</a></li>
              <li><a className="hover:underline" href="#services">Services</a></li>
              <li><a className="hover:underline" href="/admin/enquiries">Admin</a></li>
            </ul>

            <div className="mt-5">
              <div className="text-white/80 text-sm mb-2">Get a quick estimate</div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const email = e.currentTarget.elements.email.value;
                  window.location.href = `mailto:info@blsuntech.com?subject=Estimate%20request&body=My%20email:%20${encodeURIComponent(email)}`;
                }}
                className="flex gap-2"
              >
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="you@company.com"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-emerald-400/30"
                />
                <button className="shrink-0 rounded-lg bg-white text-black px-3 py-2 hover:bg-slate-100">
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* legal bar */}
      <div className="border-t border-white/10">
        <div className="container-safe py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-white/60">
          <div>© {new Date().getFullYear()} BlsunTech. All rights reserved.</div>
          <div className="flex items-center gap-4"><a href="/privacy" className="hover:text-white">Privacy</a>
<a href="/terms" className="hover:text-white">Terms</a>
            <a href="mailto:info@blsuntech.com" className="hover:text-white">Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* Helper: tailwind container width class (if you didn't add it globally)
   .container-safe { @apply max-w-7xl mx-auto px-6 sm:px-8; }
*/
