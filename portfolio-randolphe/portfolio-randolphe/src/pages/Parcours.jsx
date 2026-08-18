import { useEffect } from "react";
import { STOPS } from "../data";
import Figure from "../components/Figure";
import Reveal from "../components/Reveal";
import BeninMap from "../components/BeninMap";

function visitedUpTo(idx) {
  const set = new Set();
  STOPS.slice(0, idx + 1).forEach((s) => s.cities.forEach((c) => set.add(c)));
  return Array.from(set);
}

/* blocs de récit d'une étape, dans un ordre qui varie selon `variant`
   pour éviter la monotonie tout en gardant les mêmes briques */
function StopBody({ stop, visited }) {
  const quoteBlock = (
    <Reveal delay={60}>
      <blockquote className="rt-serif rt-exergue">« {stop.quote} »</blockquote>
    </Reveal>
  );
  const imageBlock = (
    <Reveal delay={120}>
      <Figure src={stop.image.src} alt={stop.image.alt} caption={stop.image.caption} ratio={stop.variant === "b" ? "1 / 1" : "16 / 10"} />
    </Reveal>
  );
  const diplomaBlock = stop.diploma && (
    <Reveal delay={160} className="rt-diploma-wrap">
      <Figure src={stop.diploma.src} alt={stop.diploma.alt} caption={stop.diploma.caption} ratio="4 / 3" className="rt-diploma" />
    </Reveal>
  );
  const textBlock = (
    <Reveal delay={90}>
      <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 600 }}>
        {stop.paragraphs.map((para, pi) => (
          <p key={pi} style={{ color: "var(--dim)", fontSize: 15, lineHeight: 1.75 }}>{para}</p>
        ))}
      </div>
    </Reveal>
  );
  const mapBlock = (
    <Reveal delay={200} className="rt-map-wrap">
      <BeninMap visited={visited} active={[stop.activeCity]} size={110} />
    </Reveal>
  );

  const asides = (
    <div className="rt-stop-aside">
      {diplomaBlock}
      {mapBlock}
    </div>
  );

  if (stop.variant === "b") {
    return (
      <div className="rt-stop-split">
        <div className="rt-stop-split-media">
          {imageBlock}
          {asides}
        </div>
        <div className="rt-stop-split-text">
          {quoteBlock}
          {textBlock}
        </div>
      </div>
    );
  }

  if (stop.variant === "c") {
    return (
      <>
        {quoteBlock}
        {imageBlock}
        {textBlock}
        {asides}
      </>
    );
  }

  /* variant "a" — ordre par défaut */
  return (
    <>
      {imageBlock}
      {quoteBlock}
      {textBlock}
      {asides}
    </>
  );
}

export default function Parcours({ dir, focusStop, onFocusHandled }) {
  useEffect(() => {
    if (!focusStop) return;
    const el = document.getElementById(`pk-${focusStop}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    onFocusHandled?.();
  }, [focusStop, onFocusHandled]);

  return (
    <main className="rt-page" style={{ "--dx": `${dir * 24}px`, padding: "8vh 6vw 14vh", maxWidth: 860, margin: "0 auto" }}>
      <span className="rt-mono rt-rise" style={{ fontSize: 11, letterSpacing: ".2em", color: "var(--red)", textTransform: "uppercase" }}>Itinéraire complet</span>
      <h1 className="rt-serif rt-rise" style={{ animationDelay: ".1s", fontWeight: 600, fontSize: "clamp(28px,4vw,42px)", margin: "16px 0 56px" }}>Parcours</h1>

      <div style={{ position: "relative", paddingLeft: 34 }}>
        <div className="rt-growline" style={{ position: "absolute", left: 5, top: 6, bottom: 6, width: 1, background: "var(--line)" }} />
        {STOPS.map((s, i) => (
          <div key={s.pk} id={`pk-${s.pk}`} className="rt-stop" style={{ position: "relative", marginBottom: 88, scrollMarginTop: "14vh", animationDelay: `${0.15 + i * 0.1}s` }}>
            <div className="rt-pop" style={{ animationDelay: `${0.4 + i * 0.1}s`, position: "absolute", left: -34, top: 4, width: 11, height: 11, borderRadius: "50%", background: "var(--bg)", border: "1.5px solid var(--red)" }} />
            <span className="rt-mono" style={{ fontSize: 11, color: "var(--red)", letterSpacing: ".08em" }}>PK {s.pk} — {s.year}</span>
            <h2 className="rt-serif" style={{ fontWeight: 600, fontSize: 24, margin: "8px 0 22px" }}>{s.title}</h2>
            <StopBody stop={s} visited={visitedUpTo(i)} />
          </div>
        ))}
      </div>
    </main>
  );
}
