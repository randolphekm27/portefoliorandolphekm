import { useState } from "react";
import { PAGES } from "./data";
import Home from "./pages/Home";
import Parcours from "./pages/Parcours";
import Competences from "./pages/Competences";
import Contact from "./pages/Contact";

export default function App() {
  const [page, setPage] = useState("home");
  const [prevPage, setPrevPage] = useState(null);
  const [focusStop, setFocusStop] = useState(null);

  const change = (id, stopId = null) => {
    if (stopId) setFocusStop(stopId);
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

        /* ---- reveal au scroll (storytelling) ---- */
        .rt-reveal{ opacity:0; transform:translateY(22px); transition:opacity .8s var(--ease), transform .8s var(--ease); }
        .rt-reveal-in{ opacity:1; transform:translateY(0); }

        /* ---- figures / images de récit ---- */
        .rt-figure{ margin:0; }
        .rt-figure-frame{ position:relative; width:100%; overflow:hidden; border:1.3px solid var(--red); background:rgba(237,234,227,.03); }
        .rt-figure-img{ width:100%; height:100%; object-fit:cover; display:block; filter:grayscale(1) contrast(1.05) brightness(.95); opacity:0; transition:opacity .6s var(--ease); }
        .rt-figure-img.rt-figure-loaded{ opacity:1; }
        .rt-figure-placeholder{ position:absolute; inset:0; display:flex; align-items:center; justify-content:center; text-align:center; padding:16px; border:1px dashed var(--red-dim); }
        .rt-figure-placeholder span{ font-size:11px; letter-spacing:.04em; color:var(--dim2); max-width:80%; }
        .rt-figure-caption{ margin-top:8px; font-size:10px; letter-spacing:.05em; color:var(--dim2); text-transform:uppercase; }

        /* ---- citation en exergue ---- */
        .rt-exergue{ font-style:italic; font-weight:500; font-size:clamp(19px,2.6vw,26px); line-height:1.4; color:var(--paper); margin:22px 0; padding-left:18px; border-left:1.5px solid var(--red); max-width:520px; }

        /* ---- étapes du parcours : mise en page variantes ---- */
        .rt-stop-split{ display:grid; grid-template-columns:minmax(0,1fr) minmax(0,1fr); gap:32px; align-items:start; }
        .rt-stop-split-media{ display:flex; flex-direction:column; gap:18px; }
        .rt-stop-aside{ display:flex; flex-wrap:wrap; gap:18px; align-items:flex-start; }
        .rt-diploma-wrap{ width:180px; }
        .rt-map-wrap{ display:inline-flex; }
        @media (max-width:760px){
          .rt-stop-split{ grid-template-columns:1fr; }
        }

        /* ---- grille hero (accueil) ---- */
        .rt-hero-grid{ display:grid; grid-template-columns:minmax(0,1.1fr) minmax(0,.9fr); gap:6vw; align-items:center; }
        @media (max-width:820px){
          .rt-hero-grid{ grid-template-columns:1fr; gap:32px; }
          .rt-hero-grid > *:last-child{ max-width:320px; }
        }

        /* ---- grille contact (formulaire + carte) ---- */
        .rt-contact-grid{ display:grid; grid-template-columns:minmax(0,1fr) auto; gap:6vw; align-items:start; }
        @media (max-width:640px){
          .rt-contact-grid{ grid-template-columns:1fr; }
          .rt-contact-grid > *:last-child{ justify-self:start !important; margin-top:20px; }
        }

        /* ---- carte du Bénin ---- */
        @keyframes rt-map-pulse{ 0%{ opacity:.9; transform:scale(.85); } 100%{ opacity:0; transform:scale(1.6); } }
        .rt-map-pulse{ transform-origin:center; transform-box:fill-box; animation:rt-map-pulse 2s var(--ease) infinite; }
        .rt-map-marker{ transition:opacity .2s; }
        .rt-map-marker:hover{ opacity:.75; }

        /* ---- jauges de compétences ---- */
        .rt-gauge{ opacity:1; }
        .rt-gauge-head{ display:flex; justify-content:space-between; align-items:baseline; margin-bottom:8px; }
        .rt-gauge-track{ position:relative; width:100%; height:2px; background:var(--line); }
        .rt-gauge-fill{ position:absolute; left:0; top:0; height:100%; background:var(--red); transition:width 1.1s var(--ease); }

        /* ---- outils ---- */
        .rt-tool{ display:inline-flex; align-items:center; gap:8px; font-size:13px; color:var(--dim); border:1px solid var(--line); padding:8px 14px; transition:border-color .25s, color .25s; }
        .rt-tool:hover{ border-color:var(--red-dim); color:var(--paper); }

        /* ---- réseaux (contact) ---- */
        .rt-social{ display:inline-flex; align-items:center; justify-content:center; width:34px; height:34px; border:1px solid var(--line); color:var(--dim); transition:border-color .25s, color .25s, transform .25s; }
        .rt-social:hover{ border-color:var(--red); color:var(--red); transform:translateY(-2px); }
        .rt-social[aria-disabled="true"]{ opacity:.4; cursor:default; }
        .rt-social[aria-disabled="true"]:hover{ transform:none; border-color:var(--line); color:var(--dim); }

        @media (prefers-reduced-motion: reduce){
          .rt-page, .rt-stop, .rt-rise, .rt-pop, .rt-quad, .rt-draw, .rt-growline, .rt-navdot.active, .rt-map-pulse{ animation:none !important; opacity:1 !important; transform:none !important; }
          .rt-reveal{ opacity:1 !important; transform:none !important; }
        }
      `}</style>

      <div className="rt-root">
        {/* ============ TOP BAR ============ */}
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

          <svg className="rt-avatar" viewBox="0 0 56 56" width="40" height="40" aria-hidden="true" style={{ cursor: "pointer" }} onClick={() => change("contact")}>
            <circle cx="28" cy="16" r="10" />
            <path d="M11 50 C11 33, 20 27, 28 27 C36 27, 45 33, 45 50" />
            <path d="M17 36 L28 41 L39 36" />
          </svg>
        </header>

        {page === "home" && <Home dir={dir} onNavigate={change} />}
        {page === "parcours" && <Parcours dir={dir} focusStop={focusStop} onFocusHandled={() => setFocusStop(null)} />}
        {page === "competences" && <Competences dir={dir} />}
        {page === "contact" && <Contact dir={dir} />}

        {/* ============ BOTTOM ROUTE NAV ============ */}
        <footer style={{ position: "sticky", bottom: 0, zIndex: 20, padding: "18px 6vw", background: "linear-gradient(rgba(10,10,10,0), var(--bg) 40%)" }}>
          <div style={{ maxWidth: 560, margin: "0 auto", display: "flex", alignItems: "center", gap: 14 }}>
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
