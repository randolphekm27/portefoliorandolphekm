import { Cpu, CircuitBoard, Code2, Terminal, Clapperboard, Film, Github, Linkedin, Instagram, Wrench } from "lucide-react";

/* map explicite (plutôt que `import * as Icons`) pour garder le
   tree-shaking et un bundle léger */
export const ICONS = { Cpu, CircuitBoard, Code2, Terminal, Clapperboard, Film, Github, Linkedin, Instagram };
export const FALLBACK_ICON = Wrench;
