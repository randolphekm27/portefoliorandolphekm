# Portfolio — Randolphe KM

Site personnel (React + Vite) — concept "itinéraire / points kilométriques".

## Lancer en local

```bash
npm install
npm run dev
```

## Construire pour la production

```bash
npm run build
```

Le résultat est généré dans `dist/`, prêt à héberger sur Vercel, Netlify, GitHub Pages, etc.

## Publier ce projet sur GitHub

Ce dossier est déjà un dépôt Git initialisé avec un premier commit. Pour le pousser sur GitHub :

1. Crée un nouveau dépôt vide sur [github.com/new](https://github.com/new) (ne coche **aucune** case d'initialisation — pas de README, pas de licence).
2. Dans ce dossier, exécute :

```bash
git remote add origin https://github.com/<ton-utilisateur>/<nom-du-repo>.git
git branch -M main
git push -u origin main
```

Remplace `<ton-utilisateur>` et `<nom-du-repo>` par les tiens.

## Déployer rapidement

- **Vercel** : importe le repo GitHub sur [vercel.com/new](https://vercel.com/new) — la config Vite est détectée automatiquement.
- **GitHub Pages** : ajoute `base: '/<nom-du-repo>/'` dans `vite.config.js`, puis utilise `vite-plugin-gh-pages` ou une action GitHub Actions.
