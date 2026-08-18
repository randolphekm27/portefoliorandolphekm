import { MAP_POINTS } from "../data";

/* silhouette simplifiée du Bénin (trait), avec des points rouges
   pour les lieux clés du parcours. `visited` = déjà atteints
   (petit point plein), `active` = étape en cours (point qui pulse). */
export default function BeninMap({ visited = [], active = [], showLabels = true, size = 150 }) {
  return (
    <svg
      viewBox="0 0 220 340"
      width={size}
      height={(size * 340) / 220}
      className="rt-map"
      role="img"
      aria-label="Carte simplifiée du Bénin, situant le trajet du parcours"
    >
      <path
        d="M 100 8 L 90 88 L 68 100 L 78 158 L 38 190 L 28 240 L 50 258 L 44 300 L 92 322 L 152 306 L 172 258 L 150 218 L 166 148 L 140 88 L 122 58 Z"
        fill="rgba(237,234,227,.02)"
        stroke="var(--line)"
        strokeWidth="1.2"
      />
      {Object.entries(MAP_POINTS).map(([id, p]) => {
        const isVisited = visited.includes(id);
        const isActive = active.includes(id);
        if (!isVisited && !isActive) return null;
        return (
          <g key={id}>
            {isActive && (
              <circle cx={p.x} cy={p.y} r="9" fill="none" stroke="var(--red)" strokeWidth="1" className="rt-map-pulse" />
            )}
            <circle
              cx={p.x}
              cy={p.y}
              r={isActive ? 4.5 : 3}
              fill={isActive ? "var(--red)" : "var(--bg)"}
              stroke="var(--red)"
              strokeWidth="1.4"
            />
            {showLabels && (isActive || isVisited) && (
              <text
                x={p.x}
                y={p.y - 12}
                textAnchor="middle"
                fontFamily="IBM Plex Mono"
                fontSize="9"
                fill={isActive ? "var(--paper)" : "var(--dim2)"}
              >
                {p.label}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
