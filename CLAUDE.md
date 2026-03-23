# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start          # Start local dev server (http://localhost:3000)
npm run build      # Production build to /build
npm test           # Run tests
npm run deploy     # Build then deploy to GitHub Pages via gh-pages
```

Deployment also happens automatically via GitHub Actions on every push to `main` (see `.github/workflows/deploy.yml`).

## Architecture

This is a single-page React portfolio website (Create React App) deployed to GitHub Pages.

**Entry point:** `src/index.jsx` wraps `<App>` in `<LanguageProvider>` from `src/context/LanguageContext.jsx`.

**App.jsx** is the top-level component managing global state:
- `darkMode` — toggled by class on the root `<div>` (Tailwind `darkMode: 'class'` strategy); initialized from OS `prefers-color-scheme`
- `menuOpen` — mobile nav state
- `visibleSection` — tracked via `IntersectionObserver` on all `section[id]` elements; passed to `Header` to highlight the active nav link

**Content data** lives in `src/data/` and is the primary place to update portfolio content:
- `translations.js` — all UI strings in English (`en`) and Swedish (`sv`); the `useLanguage()` hook exposes `text` which is the active language's object
- `projects.js` — project card data
- `skills.js` — skills list

**Internationalization:** `LanguageContext` (in `src/context/`) provides `{ language, toggleLanguage, text }` via `useLanguage()`. Language toggles between `'en'` and `'sv'`. All user-visible strings must be added to both locales in `translations.js`.

> Note: there is a duplicate `src/contexts/LanguageContext.jsx` — the canonical one is `src/context/LanguageContext.jsx` (imported by `index.jsx`), but `App.jsx` currently imports from `src/contexts/`. Keep them in sync or consolidate.

**Components** (`src/components/`): one file per section — `Header`, `About`, `Projects`, `ProjectCard`, `Skills`, `CV`, `Contact`, `Location`. Supporting components: `ParticleBackground` (lazy-loaded for perf), `ErrorBoundary`, `SkeletonLoader`, `ThemeToggle`, `LanguageToggle`.

**Styling:** Tailwind CSS with custom theme extensions in `tailwind.config.js` — custom color scales (`primary`, `secondary`, `accent`, `dark`), custom animations (`fadeIn`, `fadeInUp`, `float`, `gradient`, etc.), and an extra `xs: 480px` breakpoint. Global styles in `src/index.css`.
