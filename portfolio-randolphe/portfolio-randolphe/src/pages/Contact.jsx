import { MapPin, Mail, Send, Link as LinkIcon } from "lucide-react";
import { ICONS } from "../icons";
import { SOCIALS } from "../data";
import BeninMap from "../components/BeninMap";
import Reveal from "../components/Reveal";

export default function Contact({ dir }) {
  return (
    <main className="rt-page" style={{ "--dx": `${dir * 24}px`, padding: "8vh 6vw 14vh", maxWidth: 680, margin: "0 auto" }}>
      <span className="rt-mono rt-rise" style={{ fontSize: 11, letterSpacing: ".2em", color: "var(--red)", textTransform: "uppercase" }}>Prochaine étape</span>
      <h1 className="rt-serif rt-rise" style={{ animationDelay: ".1s", fontWeight: 600, fontSize: "clamp(28px,4vw,42px)", margin: "16px 0 20px" }}>Continuons la route ensemble.</h1>
      <p className="rt-rise" style={{ animationDelay: ".2s", color: "var(--dim)", fontSize: 16, lineHeight: 1.7, marginBottom: 44 }}>
        Un projet, une idée, une question ? Écris-moi.
      </p>

      <div className="rt-contact-grid">
        <div>
          <div style={{ display: "flex", flexDirection: "column", gap: 22, marginBottom: 36 }}>
            <div className="rt-rise" style={{ animationDelay: ".3s" }}><input className="rt-field" placeholder="Ton nom" /></div>
            <div className="rt-rise" style={{ animationDelay: ".38s" }}><input className="rt-field" placeholder="Ton e-mail" type="email" /></div>
            <div className="rt-rise" style={{ animationDelay: ".46s" }}><textarea className="rt-field" placeholder="Ton message" rows={4} /></div>
          </div>
          <div className="rt-rise" style={{ animationDelay: ".56s" }}>
            <button className="rt-btn">
              <span>Envoyer <Send size={14} /></span>
            </button>
          </div>

          <div className="rt-rise" style={{ animationDelay: ".64s", marginTop: 40, display: "flex", alignItems: "center", gap: 14 }}>
            {SOCIALS.map((s) => {
              const Icon = ICONS[s.icon] || LinkIcon;
              return (
                <a
                  key={s.id}
                  href={s.href || undefined}
                  target={s.href ? "_blank" : undefined}
                  rel={s.href ? "noreferrer" : undefined}
                  className="rt-social"
                  aria-disabled={!s.href}
                  title={s.href ? s.label : `${s.label} — lien à venir`}
                  onClick={(e) => { if (!s.href) e.preventDefault(); }}
                >
                  <Icon size={16} />
                </a>
              );
            })}
          </div>

          <div className="rt-rise" style={{ animationDelay: ".72s", marginTop: 26, display: "flex", alignItems: "center", gap: 10, color: "var(--dim2)", flexWrap: "wrap" }}>
            <MapPin size={14} />
            <span className="rt-mono" style={{ fontSize: 12 }}>Lokossa, Bénin</span>
            <span style={{ margin: "0 6px" }}>·</span>
            <Mail size={14} />
            <span className="rt-mono" style={{ fontSize: 12 }}>contact@keystudio.bj</span>
          </div>
        </div>

        <Reveal delay={300} className="rt-map-wrap" style={{ justifySelf: "end" }}>
          <BeninMap visited={["hounvigue", "come", "lokossa"]} active={["lokossa"]} size={120} />
        </Reveal>
      </div>
    </main>
  );
}
