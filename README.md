# Studio987

## Purpose

Studio987 is a Vite + React static site for Eclipse Studios that hosts gameplay pages and public documentation pages (privacy, terms, support) for a portfolio of word games and related products.

## What is in this repository

- Brand site and gameplay shell for Eclipse Studios.
- Three word games: Sequences, Gridlock, and Tile Tangles.
- A docs hub with static legal document routes for unified policies and app-specific policy pages.
- Static HTML entry points for game and documentation pages, including legacy legal URLs and clean docs routes.
- App-ads.txt support for Google AdMob verification on `eclipsestudios.io`.

## Current games and docs coverage

- **Sequences**: word puzzle game, plus canonical + legacy legal routes.
- **Gridlock**: word-grid puzzle game, plus unified legal coverage.
- **Tile Tangles**: dual-word untangle word puzzle game, plus unified legal coverage.
- **Spy, PatchIt, Push The Button**: additional products with dedicated privacy/support pages in the docs hub.

## Architecture

- **Frameworks**: React 19 and Vite 7.
- **Model**: legal content is centralized in `src/content/legalDocs.js` and rendered via `src/App.jsx`.
- **Entry points**: multiple HTML files are listed in `vite.config.js` via `build.rollupOptions.input` to produce all legal and game routes for static hosting.
- **Static assets**: files in `public/` are copied directly to `dist/`; this includes `public/app-ads.txt`.

### Project structure (selected)

- `src/` — React app shell, routing helpers, and gameplay/page composition.
- `src/content/` — legal document data and game word data.
- `src/games/` — engine modules for supported games.
- `src/wordsmithGames.jsx` — shared gameplay components and rendering helpers.
- `games/` — static game entry pages.
- `docs/` — static legal and support entry pages.
- `public/` — static site assets for final build output.
- `assets/` — imagery, icons, and styling assets.
- `vite.config.js` — multi-page build and route inputs.

## Local setup and development

### Prerequisites

- Node.js and npm.
- Node 22 is used by the CI workflow.

### Setup and run

```bash
cd /Users/iftatbhuiyan/Studio987
npm ci
npm run dev
```

The dev server runs at `http://127.0.0.1:5173/`.

### Build and preview

```bash
npm run build
npm run preview -- --host 127.0.0.1
```

Use preview on `http://127.0.0.1:4173/` for post-build route checks.

### Core scripts

- `npm run dev` — launches the local dev server.
- `npm run build` — builds all configured pages into `dist/`.
- `npm run preview -- --host 127.0.0.1` — previews the built output.

## Route map (important entry points)

### Site and games

- `index.html` — home page.
- `games/index.html` — game hub.
- `gamePage.html` — Sequences entry page.
- `games/gridlock.html` — Gridlock entry page.
- `games/tile-tangles.html` — Tile Tangles entry page.

### Legacy + unified legal/support routes

- `privacy-policy.html` — legacy Eclipse Games privacy route.
- `terms-of-service.html` — legacy Eclipse Games terms route.
- `docs/games/privacy.html` — unified Eclipse Games privacy policy.
- `docs/games/terms.html` — unified Eclipse Games terms of service.
- `docs/sequences/privacy.html` — legacy-compatible Sequences-linked privacy route.
- `docs/sequences/terms.html` — legacy-compatible Sequences-linked terms route.
- `spy-privacy-policy.html` — legacy Spy privacy route.
- `patchit-privacy-policy.html` — legacy PatchIt privacy route.
- `docs/spy/privacy.html` — dedicated Spy route.
- `docs/patchit/privacy.html` — dedicated PatchIt route.
- `docs/push-the-button/privacy.html` — Push The Button privacy route.
- `docs/support.html` and `user-support.html` — support page and legacy alias.
- `app-ads.txt` — published via `public/app-ads.txt` for AdMob verification.

## Validation and documentation process

When legal/docs changes are made, this project follows:

- `npm run build`
- `git diff --check`
- Manual route checks via `npm run preview`
- Documentation updates in `Documentation.md`

## Contact

Support and doc inquiries route to `spermwhaledaily@gmail.com` as defined in `src/content/legalDocs.js`.
