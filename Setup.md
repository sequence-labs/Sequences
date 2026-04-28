# Setup

## Manual prerequisites

- Node.js compatible with the GitHub Pages workflow, currently Node 22 in `.github/workflows/deploy-pages.yml`.
- npm available locally.
- GitHub Pages configured to deploy from GitHub Actions.
- Owner review path for legal wording before App Store reliance.
- Access to Apple App Store app privacy details for Sequences, Gridlock, and Tile Tangles if they differ from the web app.

## Toolchain checks

```bash
node --version
npm --version
npm ci
npm run build
```

## Environment setup

```bash
cd /Users/iftatbhuiyan/Studio987
npm ci
npm run dev -- --host 127.0.0.1
```

Local dev URL:

```text
http://127.0.0.1:5173/
```

Preview after build:

```bash
npm run build
npm run preview -- --host 127.0.0.1
```

Typical preview URL:

```text
http://127.0.0.1:4173/
```

## Worktree setup

- Start from `/Users/iftatbhuiyan/Studio987`.
- Check status before work with `git status --short --branch`.
- Expect `.DS_Store` may already be dirty and unrelated.
- Avoid committing local metadata files.
- Keep implementation changes focused on legal docs, routing, and docs hub unless the user expands scope.

## Automation setup

- GitHub Pages deploy workflow is `.github/workflows/deploy-pages.yml`.
- Workflow runs on push to `main` and manual dispatch.
- Workflow uses `npm ci`, `npm run build`, `actions/configure-pages`, `actions/upload-pages-artifact`, and `actions/deploy-pages`.
- Vite build outputs static files into `dist`.

## Known machine/project caveats

- The app uses Vite with `base: "./"` for GitHub Pages relative asset paths.
- The project has multiple direct HTML entry points configured in `vite.config.js`.
- The route helper in `src/App.jsx` includes special handling for GitHub Pages paths containing `Sequences/`.
- `src/content/gridlockWords.js` is intentionally large and should not be read or edited unless word-validation work requires it.
- Existing docs include Spy and PatchIt privacy pages; the current unified Eclipse Games legal request should not accidentally change those unless explicitly approved.
- App Store legal wording may require facts from the native Apple app source, not only this web repo.
