import { useState } from "react";

/* image de récit : N&B/désaturée, bordure rouge nette, légende mono.
   Sans `src`, affiche un espace réservé clairement identifié
   (prêt à recevoir le vrai fichier — voir public/images/README.md) */
export default function Figure({ src, alt, caption, ratio = "4 / 3", className = "", style = {} }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <figure className={`rt-figure${className ? ` ${className}` : ""}`} style={style}>
      <div className="rt-figure-frame" style={{ aspectRatio: ratio }}>
        {src ? (
          <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            className={`rt-figure-img${loaded ? " rt-figure-loaded" : ""}`}
            onLoad={() => setLoaded(true)}
          />
        ) : (
          <div className="rt-figure-placeholder">
            <span className="rt-mono">{alt || "Photo à venir"}</span>
          </div>
        )}
      </div>
      {caption && <figcaption className="rt-mono rt-figure-caption">{caption}</figcaption>}
    </figure>
  );
}
