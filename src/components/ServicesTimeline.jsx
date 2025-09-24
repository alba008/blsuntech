import React from "react";
import PropTypes from "prop-types";
import "./services-timeline.css";

/**
 * ServicesTimeline
 * Renders a vertical timeline with nested cards for company services.
 *
 * props:
 *  - services: array of service objects { id, title, yearOrTag, description, bullets, ctaText, ctaHref }
 */
export default function ServicesTimeline({ services }) {
  return (
    <section className="timeline-root" aria-label="Company services timeline">
      <h2 className="timeline-heading">Our Services</h2>

      <div className="timeline-wrap">
        <div className="timeline-line" aria-hidden="true" />

        <ul className="timeline-list">
          {services.map((s, idx) => (
            <li key={s.id} className="timeline-item">
              <div className="timeline-marker-wrap">
                <div className="timeline-marker" aria-hidden="true">
                  <span className="marker-num">{idx + 1}</span>
                </div>
                <div className="timeline-tag">{s.yearOrTag}</div>
              </div>

              <article className="service-card" aria-labelledby={`svc-${s.id}-title`}>
                <header className="service-card-head">
                  <h3 id={`svc-${s.id}-title`} className="service-title">
                    {s.title}
                  </h3>
                  <div className="service-icon" aria-hidden="true">
                    {/* Simple generic icon: modify per-service if you want */}
                    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <path d="M3 12h18" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M6 6h.01M6 18h.01M12 6h.01M12 18h.01M18 6h.01M18 18h.01" strokeLinecap="round"/>
                    </svg>
                  </div>
                </header>

                <p className="service-desc">{s.description}</p>

                {s.bullets && s.bullets.length > 0 && (
                  <ul className="service-features">
                    {s.bullets.map((b, i) => (
                      <li key={i} className="feature-item">
                        <svg className="check" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                          <path d="M20 6L9 17l-5-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="service-footer">
                  {s.ctaText ? (
                    <a className="service-cta" href={s.ctaHref || "#"}>{s.ctaText}</a>
                  ) : (
                    <span className="service-badge">Learn more</span>
                  )}
                </div>
              </article>

            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

ServicesTimeline.propTypes = {
  services: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      yearOrTag: PropTypes.string,
      description: PropTypes.string,
      bullets: PropTypes.arrayOf(PropTypes.string),
      ctaText: PropTypes.string,
      ctaHref: PropTypes.string,
    })
  ).isRequired,
};
