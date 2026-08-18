import { ICONS, FALLBACK_ICON } from "../icons";
import { SKILL_GROUPS, TOOLS } from "../data";
import SkillBar from "../components/SkillBar";
import Reveal from "../components/Reveal";

export default function Competences({ dir }) {
  return (
    <main className="rt-page" style={{ "--dx": `${dir * 24}px`, padding: "8vh 6vw 14vh", maxWidth: 780, margin: "0 auto" }}>
      <span className="rt-mono rt-rise" style={{ fontSize: 11, letterSpacing: ".2em", color: "var(--red)", textTransform: "uppercase" }}>Ce que j'ai appris en chemin</span>
      <h1 className="rt-serif rt-rise" style={{ animationDelay: ".1s", fontWeight: 600, fontSize: "clamp(28px,4vw,42px)", margin: "16px 0 48px" }}>Compétences</h1>

      {SKILL_GROUPS.map((group, gi) => (
        <div key={group.id} style={{ marginBottom: 40 }}>
          <h3 className="rt-mono" style={{ fontSize: 12, letterSpacing: ".1em", color: "var(--dim)", textTransform: "uppercase", marginBottom: 18 }}>{group.label}</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {group.skills.map((s, si) => (
              <SkillBar key={s.name} name={s.name} level={s.level} delay={(gi * 3 + si) * 60} />
            ))}
          </div>
        </div>
      ))}

      <h3 className="rt-mono" style={{ fontSize: 12, letterSpacing: ".1em", color: "var(--dim)", textTransform: "uppercase", margin: "36px 0 16px" }}>Outils</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        {TOOLS.map((t, i) => {
          const Icon = ICONS[t.icon] || FALLBACK_ICON;
          return (
            <Reveal key={t.name} delay={i * 40} className="rt-tool">
              <Icon size={15} />
              <span>{t.name}</span>
            </Reveal>
          );
        })}
      </div>
    </main>
  );
}
