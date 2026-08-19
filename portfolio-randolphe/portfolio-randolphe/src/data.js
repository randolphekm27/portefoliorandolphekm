/* ============================================================
   MEDIA — chemins des visuels réels.
   Tant qu'un champ vaut `null`, un espace réservé (cadre rouge en
   pointillés) s'affiche à la place. Pour ajouter une vraie photo :
   1. dépose le fichier dans /public/images/ (voir public/images/README.md)
   2. remplace le `null` correspondant ci-dessous par le chemin, ex :
      hero: "/images/hero.jpg"
   ============================================================ */
export const MEDIA = {
  hero: "/images/hero.jpg",
  origines: null,
  formation: "/images/formation-bac.jpg",
  diploma: "/images/formation-bapet.jpg",
  situation: null,
  experiences: null,
  certifications: "/images/certifications-wamup.jpg",
};

/* ============================================================
   CARTE — points clés du trajet, positionnés sur une silhouette
   stylisée du Bénin (viewBox 0 0 220 340, sud du pays en bas).
   ============================================================ */
export const MAP_POINTS = {
  hounvigue: { x: 142, y: 268, label: "Hounviguè" },
  come: { x: 66, y: 286, label: "Comè" },
  lokossa: { x: 58, y: 246, label: "Lokossa" },
};

/* ============================================================
   CONTENU — texte "Parcours" réparti en 5 étapes (PK 00 à PK 04)
   ============================================================ */
export const STOPS = [
  {
    pk: "00",
    year: "2004",
    title: "Origines",
    quote: "Un quotidien simple, rythmé par la terre et le petit commerce, loin de toute agitation urbaine.",
    paragraphs: [
      "Je suis né un jeudi, le 27 mai 2004, dans un petit village du sud-est du Bénin : Hounviguè, dans le département de l'Ouémé. C'est là que commence toute mon histoire.",
      "J'ai grandi dans une famille modeste, à la fois agricultrice et commerçante — un quotidien simple, rythmé par la terre et le petit commerce, loin de toute agitation urbaine. C'est ce village, et cette famille, qui posent le premier décor de mon parcours.",
    ],
    image: { key: "origines", src: MEDIA.origines, alt: "Espace réservé — village de Hounviguè", caption: "Hounviguè, Ouémé" },
    cities: ["hounvigue"],
    activeCity: "hounvigue",
    variant: "a",
  },
  {
    pk: "01",
    year: "2009 — 2025",
    title: "Formation",
    quote: "La ville m'a ouvert l'esprit.",
    paragraphs: [
      "2009 – 2016 · École primaire publique d'Affamè. Mon parcours scolaire commence ici, dans le calme du village. Six années de primaire qui se concluent en 2016 par mon tout premier diplôme : le CEP.",
      "J'entame le collège au village, mais très vite je quitte mes parents pour rejoindre ma grande sœur en ville, à Comè. J'ai alors douze ans — le premier grand tournant de ma vie, celui qui me fait quitter un village trop calme pour découvrir un monde entièrement nouveau.",
      "Au Collège de l'Espoir de Comè, à partir de la classe de 5ᵉ, je commence à revoir mes habitudes : j'apprends la nouveauté, l'ambiance de la ville et tout ce qui va avec. En 2019, j'y décroche mon BEPC avec mention Très Bien — parmi les dix premiers de mon établissement, et des soixante premiers à l'échelle communale.",
      "En 2021, je poursuis en Première D au CEG 1 de Comè. En 2022 j'obtiens mon Baccalauréat série D, avec 19/20 en biologie — porté par une forte passion pour la biotechnologie, un rêve mûri au fil de mes journées passées devant des documentaires, même au village.",
      "Cette passion me vaut d'être sélectionné boursier à la fois à l'ENSET et à l'ENSBBA (biotechnologie médicale). J'ai fini par choisir l'ENSET, par amour de l'électronique — l'un des choix les plus difficiles de ma vie : prioriser une seule voie entre deux grandes passions. Mais il le fallait.",
      "2022 – 2025 · ENSET Lokossa, filière Électronique, élève-professeur. Trois années de labeur, à l'ancêtre, pour devenir élève-professeur.",
      "Le 14 juillet 2025, je soutiens publiquement mon mémoire devant un jury composé du Dr GNONLONFOUN Jean-Marc et de Mme AHOUANDJINOU Inès. Note : 18/20, mention Excellente. Thème : « Étude, conception et intégration pédagogique d'une capsule vidéo en électronique » — un sujet jugé hors du commun, qui m'a justement amené à développer mes compétences en montage vidéo, réalisé dans le cadre du projet CAPVID / PFCR1 (ENSET Lokossa, édition 2024). J'obtiens ce jour-là le BAPET, Brevet d'Aptitude au Professorat de l'Enseignement Technique, en électronique.",
    ],
    image: { key: "formation", src: MEDIA.formation, alt: "Attestation de succès au Baccalauréat", caption: "Attestation de Baccalauréat série D — 2022" },
    diploma: { src: MEDIA.diploma, alt: "Procès-verbal de soutenance BAPET", caption: "PV de soutenance BAPET, mention Excellente — 14 juillet 2025" },
    cities: ["come", "lokossa"],
    activeCity: "lokossa",
    variant: "b",
  },
  {
    pk: "02",
    year: "2025 — 2026",
    title: "Situation actuelle",
    quote: "Cette expérience d'enseignement n'est rien d'autre que l'application concrète de tout ce que j'ai eu à étudier.",
    paragraphs: [
      "L'année académique suivante, j'entre dans une nouvelle phase — loin des bancs de l'ENSET en tant qu'étudiant, mais en tant qu'enseignant d'informatique, à l'EMTP de Lokossa. Cette expérience d'enseignement n'est rien d'autre que l'application concrète de tout ce que j'ai eu à étudier durant mes années académiques à l'ancêtre.",
      "Aujourd'hui, en 2026, j'ai un autre objectif : poursuivre un Master dans un domaine tech ou numérique — développement logiciel, robotique, intelligence artificielle ou cybersécurité. C'est là où mon cursus scolaire en est, à ce jour.",
    ],
    image: { key: "situation", src: MEDIA.situation, alt: "Espace réservé — EMTP Lokossa", caption: "EMTP Lokossa, enseignement de l'informatique" },
    cities: ["lokossa"],
    activeCity: "lokossa",
    variant: "c",
  },
  {
    pk: "03",
    year: "2022 — 2024",
    title: "Expériences",
    quote: "C'est là que j'ai appris le monde de l'entreprise — et de l'administration.",
    paragraphs: [
      "Dès ma première année académique à l'ENSET, en 2022, j'ai effectué des stages en milieu scolaire puis en entreprise, qui m'ont permis, tout au long de mon parcours, d'acquérir de l'expérience — aussi bien en tant qu'accompagnant pédagogique qu'en tant que technicien en électronique.",
      "2022 · Premier stage en entreprise, CHD de Lokossa, service électronique. C'est là que j'ai appris le monde de l'entreprise — et de l'administration. Au programme : maintenance et réparations d'équipements hospitaliers.",
      "2024 · Deuxième stage en entreprise, Leader Électronique, Comè. Maintenance GSM, installation de systèmes d'exploitation, et tâches de soudure / dessoudure.",
      "En parallèle, responsable de l'institution culturelle et artistique de l'ENSET — une responsabilité qui m'a permis de développer mes compétences en leadership et en gestion de projet.",
    ],
    image: { key: "experiences", src: MEDIA.experiences, alt: "Espace réservé — CHD de Lokossa", caption: "CHD de Lokossa, service électronique" },
    cities: ["lokossa", "come"],
    activeCity: "come",
    variant: "b",
  },
  {
    pk: "04",
    year: "2023 — 2026",
    title: "Certifications & engagements",
    quote: "30 août 2023 — ma première attestation de formation.",
    paragraphs: [
      "30 août 2023, Comè — ma première attestation de formation, en technique de rédaction de projet et recherche de financement, organisée à l'intention des OSC, dans le cadre du renforcement organisationnel et institutionnel du projet INTER-AGIAL.",
      "Mars 2026 — certificat d'engagement en tant que monteur vidéo, dans le cadre du projet WAMUP.",
    ],
    image: { key: "certifications", src: MEDIA.certifications, alt: "Certificat d'engagement WAM UP", caption: "Certificat d'engagement, WAM UP — Cotonou, mars 2026" },
    cities: ["come"],
    activeCity: "come",
    variant: "a",
  },
];

/* ============================================================
   COMPÉTENCES — regroupées par catégorie, avec niveau indicatif
   (jauge visuelle) ; à ajuster librement selon ton propre curseur.
   ============================================================ */
export const SKILL_GROUPS = [
  {
    id: "electronique",
    label: "Électronique & ingénierie",
    skills: [
      { name: "Électronique", level: 82 },
      { name: "Conception de circuits", level: 75 },
      { name: "Programmation C", level: 68 },
    ],
  },
  {
    id: "audiovisuel",
    label: "Créa & audiovisuel",
    skills: [
      { name: "Montage vidéo", level: 85 },
      { name: "Motion design", level: 72 },
    ],
  },
  {
    id: "numerique",
    label: "Numérique & IA",
    skills: [
      { name: "Prompt engineering", level: 78 },
      { name: "Intelligence artificielle", level: 70 },
      { name: "Marketing & contenu", level: 65 },
    ],
  },
];

/* outils — nom + icône lucide-react (monochrome) */
export const TOOLS = [
  { name: "Proteus", icon: "Cpu" },
  { name: "Multisim", icon: "CircuitBoard" },
  { name: "VS Code", icon: "Code2" },
  { name: "Claude Code", icon: "Terminal" },
  { name: "CapCut Pro", icon: "Clapperboard" },
  { name: "Premiere Pro", icon: "Film" },
  { name: "GitHub", icon: "Github" },
];

/* ============================================================
   STATISTIQUES RAPIDES — page d'accueil
   ============================================================ */
export const STATS = [
  { label: "2004", value: "né" },
  { label: "19/20", value: "Bac biologie" },
  { label: "18/20", value: "mémoire" },
  { label: "2026", value: "enseignant" },
];

/* ============================================================
   RÉSEAUX — à compléter avec les vrais liens (href: null = "à venir")
   ============================================================ */
export const SOCIALS = [
  { id: "linkedin", label: "LinkedIn", href: null, icon: "Linkedin" },
  { id: "instagram", label: "Instagram", href: null, icon: "Instagram" },
  { id: "github", label: "GitHub", href: null, icon: "Github" },
];

export const PAGES = [
  { id: "home", label: "Accueil" },
  { id: "parcours", label: "Parcours" },
  { id: "competences", label: "Compétences" },
  { id: "contact", label: "Contact" },
];
