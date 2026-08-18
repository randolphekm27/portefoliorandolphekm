import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { STATS, STOPS, MEDIA } from "../data";
import Figure from "../components/Figure";
import Reveal from "../components/Reveal";

function useQuads(count) {
  return useRef(
    Array.from({ length: count }, () => ({
      w: 24 + Math.random() * 42,
      h: 24 + Math.random() * 42,
      left: Math.random() * 92,
      top: 20 + Math.random() * 70,
      rot: (Math.random() * 16 - 8).toFixed(1),
      skew: (Math.random() * 10 - 5).toFixed(1),
      delay: Math.random() * 4,
      dur: 6 + Math.random() * 5,
    }))
  ).current;
}

export default function Home({ dir, onNavigate }) {
  const quads = useQuads(16);

  return (
    <main className="rt-page" style={{ "--dx": `${dir * 24}px`, padding: "6vh 6vw 14vh", maxWidth: 1000, margin: "0 auto", position: "relative" }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        {quads.map((q, i) => (
          <div
            key={i}
            className="rt-quad"
            style={{
              width: q.w, height: q.h, left: `${q.left}%`, top: `${q.top}%`,
              "--r": `${q.rot}deg`,
              transform: `rotate(${q.rot}deg) skewX(${q.skew}deg)`,
              animationDelay: `${q.delay}s`, animationDuration: `${q.dur}s`,
            }}
          />
        ))}
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        <div className="rt-hero-grid" style={{ marginBottom: 44 }}>
          <div>
            <span className="rt-mono rt-rise" style={{ animationDelay: ".05s", fontSize: 11, letterSpacing: ".2em", color: "var(--red)", textTransform: "uppercase", display: "block", marginBottom: 22 }}>
              PK 00 — point de départ
            </span>
            <h1 className="rt-serif rt-rise" style={{ animationDelay: ".15s", fontWeight: 600, fontSize: "clamp(30px,5.4vw,58px)", lineHeight: 1.15, letterSpacing: "-.01em", marginBottom: 22 }}>
              Salut, je suis <span style={{ fontStyle: "italic", fontWeight: 500 }}>Randolphe&nbsp;KM</span>.<br />
              Viens, je te raconte plus<br />sur mon parcours.
            </h1>
            <p className="rt-rise" style={{ animationDelay: ".28s", color: "var(--dim)", fontSize: 17, lineHeight: 1.7, maxWidth: 480, marginBottom: 26 }}>
              De Hounviguè à Lokossa, de l'électronique au montage vidéo : voici l'itinéraire, avec ses détours, ses choix difficiles et ses bornes kilométriques.
            </p>
            <div className="rt-rise rt-mono" style={{ animationDelay: ".34s", fontSize: 12, color: "var(--dim2)", letterSpacing: ".03em", marginBottom: 36, display: "flex", flexWrap: "wrap", gap: 8 }}>
              {STATS.map((s, i) => (
                <span key={s.label}>
                  <span style={{ color: "var(--red)" }}>{s.label}</span>
                  <span style={{ margin: "0 4px" }}>—</span>
                  {s.value}
                  {i < STATS.length - 1 && <span style={{ margin: "0 8px", color: "var(--dim2)" }}>·</span>}
                </span>
              ))}
            </div>
            <div className="rt-rise" style={{ animationDelay: ".4s", display: "flex", gap: 16, flexWrap: "wrap" }}>
              <button className="rt-btn" onClick={() => onNavigate("parcours")}>
                <span>Suivre l'itinéraire <ArrowRight size={15} /></span>
              </button>
              <button className="rt-btn" style={{ borderColor: "var(--line)" }} onClick={() => onNavigate("competences")}>
                <span>Voir les compétences</span>
              </button>
            </div>
          </div>

          <Reveal delay={200}>
            <Figure src={MEDIA.hero} alt="Espace réservé — photo de Randolphe KM" caption="Randolphe KM — Lokossa" ratio="3 / 4" />
          </Reveal>
        </div>

        {/* mini route illustration, tracé animé — chaque borne mène à l'étape correspondante */}
        <svg viewBox="0 0 800 140" style={{ width: "100%", height: "auto" }}>
          <path className="rt-draw" d="M 10 100 C 150 30, 250 130, 400 70 S 650 10, 790 60" fill="none" stroke="var(--line)" strokeWidth="1.5" strokeLinecap="round" />
          {STOPS.map((s, i) => {
            const x = 10 + (i / (STOPS.length - 1)) * 780;
            const y = 100 - Math.sin(i * 1.3) * 40 - 10;
            return (
              <g
                key={s.pk}
                className="rt-pop rt-map-marker"
                style={{ animationDelay: `${0.8 + i * 0.15}s`, cursor: "pointer" }}
                onClick={() => onNavigate("parcours", s.pk)}
                tabIndex={0}
                role="button"
                aria-label={`Aller à l'étape ${s.title}`}
                onKeyDown={(e) => { if (e.key === "Enter") onNavigate("parcours", s.pk); }}
              >
                <circle cx={x} cy={y} r="9" fill="transparent" />
                <circle cx={x} cy={y} r="5" fill="var(--bg)" stroke="var(--red)" strokeWidth="1.5" />
                <text x={x} y={y - 14} textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="10" fill="var(--dim2)">PK{s.pk}</text>
              </g>
            );
          })}
        </svg>
      </div>
    </main>
  );
}
