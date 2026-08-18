import { useEffect, useRef, useState } from "react";

/* enveloppe générique : fait apparaître son contenu en fondu léger
   dès qu'il entre dans le viewport (storytelling au scroll) */
export default function Reveal({ children, delay = 0, as: Tag = "div", className = "", style = {} }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShown(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`rt-reveal${shown ? " rt-reveal-in" : ""}${className ? ` ${className}` : ""}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </Tag>
  );
}
