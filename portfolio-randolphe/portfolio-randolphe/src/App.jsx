import { useState, useEffect, useRef } from "react";
import { ArrowRight, MapPin, Mail, Send } from "lucide-react";

/* ============================================================
   CONTENU — texte "Parcours" réparti en 5 étapes (PK 00 à PK 04)
   ============================================================ */
const STOPS = [
  {
    pk: "00",
    year: "2004",
    title: "Origines",
    paragraphs: [
      "Je suis né un jeudi, le 27 mai 2004, dans un petit village du sud-est du Bénin : Hounviguè, dans le département de l'Ouémé. C'est là que commence toute mon histoire.",
      "J'ai grandi dans une famille modeste, à la fois agricultrice et commerçante — un quotidien simple, rythmé par la terre et le petit commerce, loin de toute agitation urbaine. C'est ce village, et cette famille, qui posent le premier décor de mon parcours.",
    ],
  },
  {
    pk: "01",
    year: "2009 — 2025",
    title: "Formation",
    paragraphs: [
      "2009 – 2016 · École primaire publique d'Affamè. Mon parcours scolaire commence ici, dans le calme du village. Six années de primaire qui se concluent en 2016 par mon tout premier diplôme : le CEP.",
      "J'entame le collège au village, mais très vite je quitte mes parents pour rejoindre ma grande sœur en ville, à Comè. J'ai alors douze ans — le premier grand tournant de ma vie, celui qui me fait quitter un village trop calme pour découvrir un monde entièrement nouveau.",
      "Au Collège de l'Espoir de Comè, à partir de la classe de 5ᵉ, je commence à revoir mes habitudes : j'apprends la nouveauté, l'ambiance de la ville et tout ce qui va avec. « La ville m'a prouvé l'esprit. » En 2019, j'y décroche mon BEPC avec mention Très Bien — parmi les dix premiers de mon établissement, et des soixante premiers à l'échelle communale.",
      "En 2021, je poursuis en Première D au CEG 1 de Comè. En 2022 j'obtiens mon Baccalauréat série D, avec 19/20 en biologie — porté par une forte passion pour la biotechnologie, un rêve mûri au fil de mes journées passées devant des documentaires, même au village.",
      "Cette passion me vaut d'être sélectionné boursier à la fois à l'ENSET et à l'ENSBBA (biotechnologie médicale). J'ai fini par choisir l'ENSET, par amour de l'électronique — l'un des choix les plus difficiles de ma vie : prioriser une seule voie entre deux grandes passions. Mais il le fallait.",
      "2022 – 2025 · ENSET Lokossa, filière Électronique, élève-professeur. Trois années de labeur, à l'ancêtre, pour devenir élève-professeur.",
      "Le 14 juillet 2025, je soutiens publiquement mon mémoire devant un jury composé du Dr GNONLONFOUN Jean-Marc et de Mme AHOUANDJINOU Inès. Note : 18/20, mention Excellente. Thème : « Étude, conception et intégration pédagogique d'une capsule vidéo en électronique » — un sujet jugé hors du commun, qui m'a justement amené à développer mes compétences en montage vidéo, réalisé dans le cadre du projet CAPVID / PFCR1 (ENSET Lokossa, édition 2024). J'obtiens ce jour-là le BAPET, Brevet d'Aptitude au Professorat de l'Enseignement Technique, en électronique.",
    ],
  },
  {
    pk: "02",
    year: "2025 — 2026",
    title: "Situation actuelle",
    paragraphs: [
      "L'année académique suivante, j'entre dans une nouvelle phase — loin des bancs de l'ENSET en tant qu'étudiant, mais en tant qu'enseignant d'informatique, à l'EMTP de Lokossa. Cette expérience d'enseignement n'est rien d'autre que l'application concrète de tout ce que j'ai eu à étudier durant mes années académiques à l'ancêtre.",
      "Aujourd'hui, en 2026, j'ai un autre objectif : poursuivre un Master dans un domaine tech ou numérique — développement logiciel, robotique, intelligence artificielle ou cybersécurité. C'est là où mon cursus scolaire en est, à ce jour.",
    ],
  },
  {
    pk: "03",
    year: "2022 — 2024",
    title: "Expériences",
    paragraphs: [
      "Dès ma première année académique à l'ENSET, en 2022, j'ai effectué des stages en milieu scolaire puis en entreprise, qui m'ont permis, tout au long de mon parcours, d'acquérir de l'expérience — aussi bien en tant qu'accompagnant pédagogique qu'en tant que technicien en électronique.",
      "2022 · Premier stage en entreprise, CHD de Lokossa, service électronique. C'est là que j'ai appris le monde de l'entreprise — et de l'administration. Au programme : maintenance et réparations d'équipements hospitaliers.",
      "2024 · Deuxième stage en entreprise, Leader Électronique, Comè. Maintenance GSM, installation de systèmes d'exploitation, et tâches de soudure / dessoudure.",
      "En parallèle, responsable de l'institution culturelle et artistique de l'ENSET — une responsabilité qui m'a permis de développer mes compétences en leadership et en gestion de projet.",
    ],
  },
  {
    pk: "04",
    year: "2023 — 2026",
    title: "Certifications & engagements",
    paragraphs: [
      "30 août 2023, Comè — ma première attestation de formation, en technique de rédaction de projet et recherche de financement, organisée à l'intention des OSC, dans le cadre du renforcement organisationnel et institutionnel du projet INTER-AGIAL.",
      "Mars 2026 — certificat d'engagement en tant que monteur vidéo, dans le cadre du projet WAMUP.",
    ],
  },
];

const SKILLS = [
  "Électronique", "Programmation C", "Conception de circuits", "Montage vidéo",
  "Motion design", "Prompt engineering", "Intelligence artificielle", "Marketing & contenu",
];
const TOOLS = ["Proteus", "Multisim", "VS Code", "Claude Code", "CapCut Pro", "Premiere Pro", "GitHub"];

const PAGES = [
  { id: "home", label: "Accueil" },
  { id: "parcours", label: "Parcours" },
  { id: "competences", label: "Compétences" },
  { id: "contact", label: "Contact" },
];

/* floating decorative quads, generated once */
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

export default function App() {
  const [page, setPage] = useState("home");
  const [prevPage, setPrevPage] = useState(null);
  const quads = useQuads(16);

  const change = (id) => {
    if (id === page) return;
    setPrevPage(page);
    setPage(id);
  };

  const dir =
    PAGES.findIndex((p) => p.id === page) > PAGES.findIndex((p) => p.id === (prevPage ?? page)) ? 1 : -1;

  return (
    <div style={{ position: "relative", width: "100%", minHeight: "100vh", background: "var(--bg)" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,600;1,500&family=IBM+Plex+Sans:wght@400;500&family=IBM+Plex+Mono:wght@400;500&display=swap');
        :root{
          --bg:#0A0A0A; --paper:#EDEAE3; --dim:rgba(237,234,227,.55);
          --dim2:rgba(237,234,227,.28); --line:rgba(237,234,227,.14);
          --red:#FF0000; --red-dim:rgba(255,0,0,.35);
          --ease:cubic-bezier(.65,0,.35,1);
        }
        .rt-root *{ box-sizing:border-box; }
        .rt-root{ font-family:'IBM Plex Sans',sans-serif; color:var(--paper); }
        .rt-serif{ font-family:'Fraunces',serif; }
        .rt-mono{ font-family:'IBM Plex Mono',monospace; }

        @keyframes rt-slideIn{ from{ opacity:0; transform:translateX(var(--dx,24px)); } to{ opacity:1; transform:translateX(0); } }
        .rt-page{ animation: rt-slideIn .6s var(--ease); }

        @keyframes rt-up{ from{ opacity:0; transform:translateY(18px); } to{ opacity:1; transform:translateY(0); } }
        .rt-rise{ opacity:0; animation: rt-up .7s var(--ease) forwards; }

        @keyframes rt-drift{ 0%,100%{ transform:translateY(0) rotate(var(--r,6deg)); } 50%{ transform:translateY(-16px) rotate(calc(var(--r,6deg) * -1)); } }
        .rt-quad{ position:absolute; border:1px solid var(--line); animation:rt-drift ease-in-out infinite; opacity:.5; }

        @keyframes rt-pop{ from{ opacity:0; transform:scale(.3); } to{ opacity:1; transform:scale(1); } }
        .rt-pop{ opacity:0; animation:rt-pop .5s var(--ease) forwards; }

        @keyframes rt-draw{ from{ stroke-dashoffset:1400; } to{ stroke-dashoffset:0; } }
        .rt-draw{ stroke-dasharray:1400; animation:rt-draw 1.8s var(--ease) forwards; }

        @keyframes rt-grow{ from{ transform:scaleY(0); } to{ transform:scaleY(1); } }
        .rt-growline{ transform-origin:top; animation:rt-grow 1.1s var(--ease) forwards; }

        @keyframes rt-pulse{ 0%,100%{ box-shadow:0 0 0 0 rgba(255,0,0,.5);} 50%{ box-shadow:0 0 0 5px rgba(255,0,0,0);} }
        .rt-navdot.active{ background:var(--red); transform:scale(1.4); animation:rt-pulse 2.2s ease-out infinite; }
        .rt-navdot{ width:8px; height:8px; border-radius:50%; background:var(--line); border:1px solid transparent; cursor:pointer; transition:all .3s var(--ease); }

        .rt-navlabel{ font-family:'IBM Plex Mono',monospace; font-size:10px; letter-spacing:.08em; text-transform:uppercase; color:var(--dim2); transition:color .3s; cursor:pointer; }
        .rt-navlabel.active{ color:var(--red); }

        .rt-dash{ position:relative; width:20px; height:1px; background:var(--dim); border:none; cursor:pointer; padding:0; transition:background .25s,width .25s; }
        .rt-dash:hover, .rt-dash:focus-visible{ background:var(--red); width:28px; }
        .rt-dash .lbl{ position:absolute; top:12px; left:50%; transform:translateX(-50%); font-size:9px; letter-spacing:.08em; color:var(--dim); white-space:nowrap; opacity:0; transition:opacity .2s; text-transform:uppercase; }
        .rt-dash:hover .lbl, .rt-dash:focus-visible .lbl{ opacity:1; }

        .rt-avatar{ transition:transform .4s var(--ease); }
        .rt-avatar:hover{ transform:rotate(-4deg) scale(1.05); }
        .rt-avatar path, .rt-avatar circle{ fill:none; stroke:var(--paper); stroke-width:1.3; stroke-linecap:round; stroke-linejoin:round; transition:stroke .3s; }
        .rt-avatar:hover path, .rt-avatar:hover circle{ stroke:var(--red); }

        .rt-btn{ position:relative; overflow:hidden; font-family:'IBM Plex Mono',monospace; font-size:13px; letter-spacing:.03em; background:transparent; color:var(--paper); border:1px solid var(--red); padding:13px 26px; cursor:pointer; transition:color .35s var(--ease), transform .3s var(--ease); }
        .rt-btn:hover{ transform:translateY(-2px); }
        .rt-btn span{ position:relative; z-index:2; display:flex; align-items:center; gap:8px; }
        .rt-btn::before{ content:''; position:absolute; inset:0; background:var(--red); transform:translateY(101%); transition:transform .35s var(--ease); z-index:1; }
        .rt-btn:hover::before, .rt-btn:focus-visible::before{ transform:translateY(0); }
        .rt-btn:hover, .rt-btn:focus-visible{ color:var(--bg); }

        .rt-stop{ opacity:0; transform:translateY(24px); animation:rt-rise2 .7s var(--ease) forwards; }
        @keyframes rt-rise2{ to{ opacity:1; transform:translateY(0); } }

        .rt-sign{ font-family:'IBM Plex Mono',monospace; font-size:11px; letter-spacing:.05em; border:1px solid var(--line); padding:8px 14px; color:var(--dim); background:rgba(237,234,227,.03); transition:border-color .25s, color .25s, transform .25s; opacity:0; animation:rt-pop .5s var(--ease) forwards; }
        .rt-sign:hover{ border-color:var(--red-dim); color:var(--paper); transform:translateY(-3px); }

        input.rt-field, textarea.rt-field{ width:100%; background:transparent; border:none; border-bottom:1px solid var(--line); color:var(--paper); font-family:'IBM Plex Sans',sans-serif; font-size:16px; padding:12px 2px; outline:none; transition:border-color .25s; }
        input.rt-field:focus, textarea.rt-field:focus{ border-color:var(--red); }
        input.rt-field::placeholder, textarea.rt-field::placeholder{ color:var(--dim2); }

        .rt-navbtn{ position:relative; }
        .rt-navbtn::after{ content:''; position:absolute; left:0; bottom:-4px; width:0; height:1px; background:var(--red); transition:width .3s var(--ease); }
        .rt-navbtn:hover::after{ width:100%; }

        @media (prefers-reduced-motion: reduce){
          .rt-page, .rt-stop, .rt-rise, .rt-pop, .rt-quad, .rt-draw, .rt-growline, .rt-navdot.active{ animation:none !important; opacity:1 !important; transform:none !important; }
        }
      `}</style>

      <div className="rt-root">
        {/* ============ TOP BAR — fidèle au croquis : nom + tirets, avatar à droite ============ */}
        <header style={{ position: "sticky", top: 0, zIndex: 20, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "3vh 6vw", background: "linear-gradient(var(--bg), rgba(10,10,10,.85) 70%, transparent)" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <button onClick={() => change("home")} className="rt-serif" style={{ background: "none", border: "none", cursor: "pointer", color: "var(--paper)", fontWeight: 600, fontSize: 20, letterSpacing: "-.01em" }}>
              Randolphe
            </button>
            <nav style={{ display: "flex", alignItems: "center", gap: 16, marginLeft: 26 }}>
              {PAGES.slice(1).map((p) => (
                <button key={p.id} className="rt-dash" onClick={() => change(p.id)}>
                  <span className="lbl">{p.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* avatar — croquis : cercle (tête) + silhouette bras croisés */}
          <svg className="rt-avatar" viewBox="0 0 56 56" width="40" height="40" aria-hidden="true" style={{ cursor: "pointer" }} onClick={() => change("contact")}>
            <circle cx="28" cy="16" r="10" />
            <path d="M11 50 C11 33, 20 27, 28 27 C36 27, 45 33, 45 50" />
            <path d="M17 36 L28 41 L39 36" />
          </svg>
        </header>

        {/* ============ PAGE: HOME ============ */}
        {page === "home" && (
          <main className="rt-page" style={{ "--dx": `${dir * 24}px`, padding: "6vh 6vw 14vh", maxWidth: 1000, margin: "0 auto", position: "relative" }}>
            {/* formes flottantes du croquis */}
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
              <span className="rt-mono rt-rise" style={{ animationDelay: ".05s", fontSize: 11, letterSpacing: ".2em", color: "var(--red)", textTransform: "uppercase", display: "block", marginBottom: 22 }}>
                PK 00 — point de départ
              </span>
              <h1 className="rt-serif rt-rise" style={{ animationDelay: ".15s", fontWeight: 600, fontSize: "clamp(30px,5.4vw,58px)", lineHeight: 1.15, letterSpacing: "-.01em", marginBottom: 22, maxWidth: 760 }}>
                Salut, je suis <span style={{ fontStyle: "italic", fontWeight: 500 }}>Randolphe&nbsp;KM</span>.<br />
                Viens, je te raconte plus<br />sur mon parcours.
              </h1>
              <p className="rt-rise" style={{ animationDelay: ".28s", color: "var(--dim)", fontSize: 17, lineHeight: 1.7, maxWidth: 540, marginBottom: 36 }}>
                De Hounviguè à Lokossa, de l'électronique au montage vidéo : voici l'itinéraire, avec ses détours, ses choix difficiles et ses bornes kilométriques.
              </p>
              <div className="rt-rise" style={{ animationDelay: ".4s", display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 60 }}>
                <button className="rt-btn" onClick={() => change("parcours")}>
                  <span>Suivre l'itinéraire <ArrowRight size={15} /></span>
                </button>
                <button className="rt-btn" style={{ borderColor: "var(--line)" }} onClick={() => change("competences")}>
                  <span>Voir les compétences</span>
                </button>
              </div>

              {/* mini route illustration, tracé animé */}
              <svg viewBox="0 0 800 140" style={{ width: "100%", height: "auto" }}>
                <path className="rt-draw" d="M 10 100 C 150 30, 250 130, 400 70 S 650 10, 790 60" fill="none" stroke="var(--line)" strokeWidth="1.5" strokeLinecap="round" />
                {STOPS.map((s, i) => {
                  const x = 10 + (i / (STOPS.length - 1)) * 780;
                  const y = 100 - Math.sin(i * 1.3) * 40 - 10;
                  return (
                    <g key={s.pk} className="rt-pop" style={{ animationDelay: `${0.8 + i * 0.15}s` }}>
                      <circle cx={x} cy={y} r="5" fill="var(--bg)" stroke="var(--red)" strokeWidth="1.5" />
                      <text x={x} y={y - 14} textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="10" fill="var(--dim2)">PK{s.pk}</text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </main>
        )}

        {/* ============ PAGE: PARCOURS ============ */}
        {page === "parcours" && (
          <main className="rt-page" style={{ "--dx": `${dir * 24}px`, padding: "8vh 6vw 14vh", maxWidth: 780, margin: "0 auto" }}>
            <span className="rt-mono rt-rise" style={{ fontSize: 11, letterSpacing: ".2em", color: "var(--red)", textTransform: "uppercase" }}>Itinéraire complet</span>
            <h1 className="rt-serif rt-rise" style={{ animationDelay: ".1s", fontWeight: 600, fontSize: "clamp(28px,4vw,42px)", margin: "16px 0 56px" }}>Parcours</h1>

            <div style={{ position: "relative", paddingLeft: 34 }}>
              <div className="rt-growline" style={{ position: "absolute", left: 5, top: 6, bottom: 6, width: 1, background: "var(--line)" }} />
              {STOPS.map((s, i) => (
                <div key={s.pk} className="rt-stop" style={{ position: "relative", marginBottom: 52, animationDelay: `${0.15 + i * 0.1}s` }}>
                  <div className="rt-pop" style={{ animationDelay: `${0.4 + i * 0.1}s`, position: "absolute", left: -34, top: 4, width: 11, height: 11, borderRadius: "50%", background: "var(--bg)", border: "1.5px solid var(--red)" }} />
                  <span className="rt-mono" style={{ fontSize: 11, color: "var(--red)", letterSpacing: ".08em" }}>PK {s.pk} — {s.year}</span>
                  <h2 className="rt-serif" style={{ fontWeight: 600, fontSize: 24, margin: "8px 0 14px" }}>{s.title}</h2>
                  <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 600 }}>
                    {s.paragraphs.map((para, pi) => (
                      <p key={pi} style={{ color: "var(--dim)", fontSize: 15, lineHeight: 1.75 }}>{para}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </main>
        )}

        {/* ============ PAGE: COMPÉTENCES ============ */}
        {page === "competences" && (
          <main className="rt-page" style={{ "--dx": `${dir * 24}px`, padding: "8vh 6vw 14vh", maxWidth: 780, margin: "0 auto" }}>
            <span className="rt-mono rt-rise" style={{ fontSize: 11, letterSpacing: ".2em", color: "var(--red)", textTransform: "uppercase" }}>Ce que j'ai appris en chemin</span>
            <h1 className="rt-serif rt-rise" style={{ animationDelay: ".1s", fontWeight: 600, fontSize: "clamp(28px,4vw,42px)", margin: "16px 0 48px" }}>Compétences</h1>

            <h3 className="rt-mono" style={{ fontSize: 12, letterSpacing: ".1em", color: "var(--dim)", textTransform: "uppercase", marginBottom: 16 }}>Savoir-faire</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 44 }}>
              {SKILLS.map((s, i) => <span key={s} className="rt-sign" style={{ animationDelay: `${i * 0.05}s` }}>{s}</span>)}
            </div>

            <h3 className="rt-mono" style={{ fontSize: 12, letterSpacing: ".1em", color: "var(--dim)", textTransform: "uppercase", marginBottom: 16 }}>Outils</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {TOOLS.map((t, i) => <span key={t} className="rt-sign" style={{ animationDelay: `${0.4 + i * 0.05}s` }}>{t}</span>)}
            </div>
          </main>
        )}

        {/* ============ PAGE: CONTACT ============ */}
        {page === "contact" && (
          <main className="rt-page" style={{ "--dx": `${dir * 24}px`, padding: "8vh 6vw 14vh", maxWidth: 600, margin: "0 auto" }}>
            <span className="rt-mono rt-rise" style={{ fontSize: 11, letterSpacing: ".2em", color: "var(--red)", textTransform: "uppercase" }}>Prochaine étape</span>
            <h1 className="rt-serif rt-rise" style={{ animationDelay: ".1s", fontWeight: 600, fontSize: "clamp(28px,4vw,42px)", margin: "16px 0 20px" }}>Continuons la route ensemble.</h1>
            <p className="rt-rise" style={{ animationDelay: ".2s", color: "var(--dim)", fontSize: 16, lineHeight: 1.7, marginBottom: 44 }}>
              Un projet, une idée, une question ? Écris-moi.
            </p>

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

            <div className="rt-rise" style={{ animationDelay: ".68s", marginTop: 60, display: "flex", alignItems: "center", gap: 10, color: "var(--dim2)" }}>
              <MapPin size={14} />
              <span className="rt-mono" style={{ fontSize: 12 }}>Lokossa, Bénin</span>
              <span style={{ margin: "0 6px" }}>·</span>
              <Mail size={14} />
              <span className="rt-mono" style={{ fontSize: 12 }}>contact@keystudio.bj</span>
            </div>
          </main>
        )}

        {/* ============ BOTTOM ROUTE NAV ============ */}
        <footer style={{ position: "sticky", bottom: 0, zIndex: 20, padding: "18px 6vw", background: "linear-gradient(rgba(10,10,10,0), var(--bg) 40%)" }}>
          <div style={{ maxWidth: 480, margin: "0 auto", display: "flex", alignItems: "center", gap: 14 }}>
            {PAGES.map((p, i) => (
              <div key={p.id} style={{ display: "flex", alignItems: "center", flex: i < PAGES.length - 1 ? 1 : "none" }}>
                <button onClick={() => change(p.id)} className={`rt-navdot${page === p.id ? " active" : ""}`} aria-label={p.label} style={{ padding: 0 }} />
                {i < PAGES.length - 1 && <div style={{ flex: 1, height: 1, background: "var(--line)", marginLeft: 10 }} />}
              </div>
            ))}
          </div>
        </footer>
      </div>
    </div>
  );
}
