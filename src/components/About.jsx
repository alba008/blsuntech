import React, { useCallback, useEffect, useRef, useState } from "react";

const slides = [
  {
    title: "Who We Are",
    body: `BlsunTech is a results-driven technology company headquartered in New Jersey, USA.
We specialize in full-stack web development, AI and data-driven applications, cloud infrastructure,
e-commerce, and intelligent automation.

Our projects span real estate, education, retail, and cybersecurity.
We build systems that are scalable, secure, and impactful — turning ideas into production-ready tech.`,
    bgStyle: { background: "linear-gradient(135deg,#10b981, #0f172a)" },
    fgClass: "text-emerald-50",
  },
  {
    title: "Our Vision",
    body: `To be the trusted partner for secure, data-driven products in East Africa and beyond — 
bridging ideas to production, creating value for businesses and communities, and advancing inclusive innovation.`,
    bgStyle: { background: "linear-gradient(135deg, #0f172a, #10b981)" },
    fgClass: "text-white",
  },
  {
    title: "Our Mission",
    body: `Design, build, and operate modern web apps, AI pipelines, and cloud infrastructure with security by default.
Automate operations, mentor teams, and deliver measurable outcomes for our clients.`,
    bgStyle: { background: "linear-gradient(135deg,  #10b981, #0f172a)" },
    fgClass: "text-white",
  },
];

export default function AboutCarousel() {
  const [index, setIndex] = useState(0);
  const len = slides.length;
  const timerRef = useRef(null);
  const touchStartX = useRef(null);

  // stable controls
  const stop = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const start = useCallback(() => {
    stop();
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % len);
    }, 6000);
  }, [len, stop]);

  const prev = useCallback(() => setIndex((i) => (i - 1 + len) % len), [len]);
  const next = useCallback(() => setIndex((i) => (i + 1) % len), [len]);
  const goTo = useCallback((i) => setIndex(i), []);

  const onKeyDown = useCallback((e) => {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  }, [prev, next]);

  const onTouchStart = (e) => (touchStartX.current = e.changedTouches[0].clientX);
  const onTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - (touchStartX.current ?? 0);
    if (Math.abs(dx) > 40) (dx > 0 ? prev() : next());
    touchStartX.current = null;
  };

  // autoplay lifecycle (no eslint warning)
  useEffect(() => {
    start();
    return () => stop();
  }, [start, stop]);

  return (
    <section
      id="about"
      className="relative py-24 bg-black px-6"
      onMouseEnter={stop}
      onMouseLeave={start}
      onKeyDown={onKeyDown}
      tabIndex={0}
      aria-roledescription="carousel"
      aria-label="About BlsunTech"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')",
      }}
    >
      <div className="max-w-5xl mx-auto  bg-black">
        <h2
          className="text-4xl font-bold text-center mb-10
                     bg-gradient-to-r from-blue-100 via-white-900 to-green-100
                     bg-clip-text text-transparent"
        >
          About Us
        </h2>

        {/* viewport */}
        <div
          className=" bg-black overflow-hidden rounded-1xl ring-1 ring-white/10"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* track */}
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {slides.map((s, i) => (
              <article
                key={i}
                className="relative shrink-0 basis-full p-10 md:p-14"
                style={s.bgStyle}
                role="group"
                aria-roledescription="slide"
                aria-label={`${s.title} (${i + 1} of ${len})`}
              >
                <h3 className={`text-3xl md:text-4xl font-semibold mb-4 ${s.fgClass}`}>
                  {s.title}
                </h3>
                <p className={`text-lg md:text-xl leading-relaxed whitespace-pre-line ${s.fgClass}`}>
                  {s.body}
                </p>
              </article>
            ))}
          </div>
        </div>

        {/* controls */}
        <div className="mt-6 flex items-center justify-between">
          <div className="flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`h-2 w-8 rounded-full transition
                  ${i === index ? "bg-emerald-500" : "bg-gray-300 hover:bg-gray-400"}`}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === index ? "true" : "false"}
              />
            ))}
          </div>

          <div className="flex gap-2">
            <button
              onClick={prev}
              className="px-3 py-2 text-white hover:text-black rounded-lg ring-1 ring-emerald-300 hover:bg-gray-100"
              aria-label="Previous slide"
            >
              ←
            </button>
            <button
              onClick={next}
              className="px-3 py-2 text-white hover:text-black rounded-lg ring-1 ring-emerald-300 hover:bg-gray-100"
              aria-label="Next slide"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
