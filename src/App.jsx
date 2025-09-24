import React from "react";
import ServicesTimeline from "./ServicesTimeline";

const services = [
  {
    id: "web-design",
    title: "Web Designing",
    yearOrTag: "Design • UI/UX",
    description:
      "We craft clean, responsive websites optimized for performance and conversions. Pixel-perfect UI plus accessibility-first development.",
    bullets: [
      "Responsive UI (mobile-first)",
      "Brand-forward visual systems",
      "Performance & SEO optimizations",
      "Accessibility (WCAG) guidance"
    ],
    ctaText: "View portfolio",
    ctaHref: "/portfolio/web"
  },
  {
    id: "applications",
    title: "Applications",
    yearOrTag: "Mobile & Web Apps",
    description:
      "Full-stack application development: React / React Native frontends, Node/Django backends, PostgreSQL, CI/CD and testing.",
    bullets: [
      "SPA & PWA development",
      "Native-like mobile apps",
      "Scalable backend architecture",
      "Automated testing & deployment"
    ],
    ctaText: "See apps",
    ctaHref: "/portfolio/apps"
  },
  {
    id: "ai",
    title: "AI",
    yearOrTag: "AI • ML",
    description:
      "Practical AI solutions: model integration, custom ML pipelines, prompt engineering, and private LLM deployment for business workflows.",
    bullets: [
      "Custom model evaluation & integration",
      "LLM-powered assistants & retrieval",
      "Data pipelines & MLOps",
      "Ethical & privacy-aware deployments"
    ],
    ctaText: "AI services",
    ctaHref: "/services/ai"
  },
  {
    id: "cloud",
    title: "Cloud",
    yearOrTag: "Cloud • DevOps",
    description:
      "Cloud infrastructure, containerization, microservices, monitoring and cost-optimized architecture on AWS/GCP/Azure.",
    bullets: [
      "Kubernetes & container orchestration",
      "IaC (Terraform / Pulumi)",
      "Observability & SRE",
      "Secure networking & backups"
    ],
    ctaText: "Cloud solutions",
    ctaHref: "/services/cloud"
  }
];

export default function App() {
  return (
    <div style={{ padding: 20 }}>
      <ServicesTimeline services={services} />
    </div>
  );
}
