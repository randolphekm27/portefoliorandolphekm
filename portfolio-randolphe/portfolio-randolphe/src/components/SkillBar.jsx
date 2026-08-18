import { useEffect, useRef, useState } from "react";

/* jauge discrète : un trait qui se remplit jusqu'au niveau indiqué
   dès que la compétence entre dans le viewport */
export default function SkillBar({ name, level, delay = 0 }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="rt-gauge" style={{ transitionDelay: `${delay}ms` }}>
      <div className="rt-gauge-head">
        <span style={{ fontSize: 14 }}>{name}</span>
        <span className="rt-mono" style={{ fontSize: 11, color: "var(--dim2)" }}>{inView ? `${level}%` : ""}</span>
      </div>
      <div className="rt-gauge-track">
        <div className="rt-gauge-fill" style={{ width: inView ? `${level}%` : "0%" }} />
      </div>
    </div>
  );
}
