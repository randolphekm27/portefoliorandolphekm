import { useState } from "react";
import { PROJECTS } from "../data";
import Figure from "../components/Figure";
import Reveal from "../components/Reveal";

function ProjectCard({ project, delay }) {
  const [open, setOpen] = useState(false);
  return (
    <Reveal delay={delay} className="rt-project-card">
      <button className="rt-project-trigger" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        <Figure src={project.image.src} alt={project.image.alt} ratio="16 / 10" />
        <div style={{ padding: "16px 2px 0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10 }}>
            <h3 className="rt-serif" style={{ fontWeight: 600, fontSize: 19, textAlign: "left" }}>{project.title}</h3>
          </div>
          {project.subtitle && (
            <p className="rt-mono" style={{ fontSize: 11, color: "var(--dim2)", margin: "4px 0 0", textAlign: "left" }}>{project.subtitle}</p>
          )}
          <p style={{ color: "var(--dim)", fontSize: 14, lineHeight: 1.6, margin: "10px 0 0", textAlign: "left" }}>{project.context}</p>
          <span className="rt-sign" style={{ display: "inline-block", opacity: 1, animation: "none", marginTop: 14, fontSize: 10 }}>{project.role}</span>
        </div>
      </button>
      {open && (
        <div className="rt-reveal rt-reveal-in" style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid var(--line)" }}>
          <p style={{ color: "var(--dim)", fontSize: 14, lineHeight: 1.75 }}>{project.detail}</p>
        </div>
      )}
    </Reveal>
  );
}

export default function Projects({ dir }) {
  return (
    <main className="rt-page" style={{ "--dx": `${dir * 24}px`, padding: "8vh 6vw 14vh", maxWidth: 980, margin: "0 auto" }}>
      <span className="rt-mono rt-rise" style={{ fontSize: 11, letterSpacing: ".2em", color: "var(--red)", textTransform: "uppercase" }}>Ce que j'ai construit</span>
      <h1 className="rt-serif rt-rise" style={{ animationDelay: ".1s", fontWeight: 600, fontSize: "clamp(28px,4vw,42px)", margin: "16px 0 16px" }}>Projets</h1>
      <p className="rt-rise" style={{ animationDelay: ".18s", color: "var(--dim)", fontSize: 15, lineHeight: 1.7, maxWidth: 560, marginBottom: 52 }}>
        Quelques réalisations concrètes, entre électronique, montage vidéo et direction artistique.
      </p>

      <div className="rt-project-grid">
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.id} project={p} delay={i * 60} />
        ))}
      </div>
    </main>
  );
}
