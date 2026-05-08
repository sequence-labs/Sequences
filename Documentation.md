# Documentation

## Initial log entry

Date: 2026-04-28

Created long-horizon planning documentation for the unified Eclipse Games Privacy Policy and Terms of Service project. This pass is planning-only. No legal-page implementation, route changes, gameplay changes, or App Store copy changes were started.

## Repo structure summary

- Root HTML entry points include `index.html`, `gamePage.html`, legacy legal pages, and support pages.
- `games/` contains static HTML entry points for games hub, Gridlock, and Tile Tangles.
- `docs/` contains static HTML entry points for docs hub, Sequences docs, Spy privacy, PatchIt privacy, and support.
- `src/App.jsx` contains shared shell, nav, homepage, docs rendering, route detection, and Sequences app UI.
- `src/wordsmithGames.jsx` contains Gridlock and Tile Tangles React UI and tutorials.
- `src/games/` contains Gridlock and Tile Tangles game engines.
- `src/content/legalDocs.js` contains current legal document data and support email.
- `src/content/gameData.js` contains Sequences puzzle data.
- `src/content/gridlockWords.js` is a large generated/bundled word-list source and was intentionally not read.
- `.github/workflows/deploy-pages.yml` deploys `dist` to GitHub Pages through GitHub Actions.

## Commands run

- `pwd && find . -maxdepth 2 ...`: inspected workspace root and key project files.
- `git status --short --branch`: checked branch and dirty state.
- `cat package.json`: inspected scripts and dependencies.
- `find . -maxdepth 2 -type d ...`: inspected top-level repo structure.
- `find . -maxdepth 3 -type f -path './.github/*'`: found GitHub Pages workflow.
- `cat vite.config.js`: inspected Vite public route entries.
- `cat .github/workflows/deploy-pages.yml`: inspected deployment workflow.
- `find . -maxdepth 2 -type f ...`: inspected public HTML and markdown files.
- `find src -maxdepth 3 -type f ! -name 'gridlockWords.js'`: inspected relevant source files while avoiding the large generated word list.
- `find docs games -maxdepth 3 -type f`: inspected docs and games entry points.
- `sed -n '1,260p' src/content/legalDocs.js`: inspected current legal source and factual privacy claims.
- `sed -n '1,220p' src/App.jsx`: inspected routing, homepage, docs, and nav source.
- `sed -n '1,220p' src/wordsmithGames.jsx`: inspected current WordSmith web UI and tutorial structure.
- `sed -n '1,220p' src/games/gridlockEngine.js` and `sed -n '1,220p' src/games/tileTanglesEngine.js`: inspected game engine data handling relevant to legal planning.
- `git diff --check`: passed.

## Test/build command status

- `npm run build`: accidentally triggered by a shell quoting issue while generating this documentation, completed with the existing large-chunk warning, and did not leave tracked build-output changes.
- `npm run preview -- --host 127.0.0.1`: accidentally triggered by the same shell quoting issue and was stopped.
- `git diff --check`: passed.

## Current worktree status observed

- Branch: `main...origin/main`.
- Pre-existing dirty file before planning docs: `.DS_Store`.
- New planning files created in this pass: `Prompt.md`, `Plan.md`, `Implement.md`, `Documentation.md`, `Setup.md`.

## Open blockers

- Confirm whether the unified documents should cover only Sequences, Gridlock, and Tile Tangles, or also mention Spy and PatchIt separately in the docs hub.
- Confirm whether Gridlock and Tile Tangles are separate Apple App Store apps, modes inside a shared WordSmith app, or web-only additions for now.
- Confirm any native iOS data practices for Gridlock and Tile Tangles that are not visible in this web repository.
- Confirm desired clean unified legal URLs before implementation.
- Final legal wording needs owner/legal review before production reliance.

## Next actions

- Review `Prompt.md` and `Plan.md` for scope approval.
- Decide clean route names for unified Eclipse Games legal docs.
- Inventory App Store privacy answers for the native app surface.
- Draft unified Privacy Policy and Terms of Service in `src/content/legalDocs.js` after scope approval.
- Update docs hub and legacy route mapping after route strategy approval.
- Run `npm run build`, `git diff --check`, and browser-use checks after implementation changes.

## Implementation log

Date: 2026-04-28

Started implementation after the user clarified the public document names should be `Eclipse Games Privacy Policy` and `Eclipse Games Terms of Service`.

Files changed:
- `src/content/legalDocs.js`: added unified Eclipse Games privacy and terms documents for Sequences, Gridlock, and Tile Tangles, covering web and Apple App Store app use.
- `src/content/legalDocs.js`: kept Sequences-specific doc IDs as compatibility entries that point to the unified Eclipse Games documents.
- `docs/games/privacy.html` and `docs/games/terms.html`: added clean direct HTML routes for the unified documents.
- `privacy-policy.html`, `terms-of-service.html`, `docs/sequences/privacy.html`, and `docs/sequences/terms.html`: mapped legacy policy and terms entry points to the unified Eclipse Games documents.
- `vite.config.js`: added the two clean `docs/games` routes to Vite build inputs.
- `Prompt.md`, `Plan.md`, `Implement.md`, `Documentation.md`, and `Setup.md`: created and updated durable project planning documentation.

Route mapping decisions:
- `/docs/games/privacy.html` renders the canonical Eclipse Games Privacy Policy.
- `/docs/games/terms.html` renders the canonical Eclipse Games Terms of Service.
- `/privacy-policy.html` and `/docs/sequences/privacy.html` render the unified Eclipse Games Privacy Policy for legacy compatibility.
- `/terms-of-service.html` and `/docs/sequences/terms.html` render the unified Eclipse Games Terms of Service for legacy compatibility.
- Spy and PatchIt privacy pages were left as separate existing documents.

Commands run:
- `git diff --check`: passed.
- `npm run build`: passed. Vite emitted all legacy and new legal routes. The existing large JavaScript chunk warning remains because the app bundle includes a large Gridlock word list.
- Browser-use preview checks at `http://127.0.0.1:4173`: passed for the docs hub, clean unified docs routes, legacy root policy and terms routes, and legacy Sequences policy and terms routes. No browser console errors were observed on the checked routes.
- Browser-use screenshot check: confirmed the Eclipse Games Privacy Policy page renders in the Eclipse Studios docs style with the correct title, summary, canonical link, legacy link, and policy sections.
- Browser-use docs hub check: confirmed the docs hub displays the Eclipse Games group and links to `../docs/games/terms.html` and `../docs/games/privacy.html`.

Open blockers:
- Final legal wording still needs owner/legal review before relying on it for App Store submission or production legal compliance.
- Native iOS data practices should be rechecked if Sequences, Gridlock, or Tile Tangles collect anything beyond local gameplay state, Apple diagnostics, or platform-provided crash/diagnostic data.

Next actions:
- Commit and push after validation, excluding unrelated `.DS_Store`.

## AdMob app-ads.txt log

Date: 2026-04-28

Started an AdMob verification support pass after the custom developer website domain was changed to `www.eclipsestudios.io`.

Findings:
- A tracked root `app-ads.txt` already existed with `google.com, pub-8560729629870794, DIRECT, f08c47fec0942fa0`.
- The current Vite build did not emit root `app-ads.txt` into `dist`, so GitHub Pages Actions would not publish it from the built artifact.
- Vite copies `public/` files to the build output root, so `public/app-ads.txt` is the required source location for the deployed `/app-ads.txt` route.

Files changed:
- `public/app-ads.txt`: added the AdMob publisher line so the built site emits `/app-ads.txt`.
- `Prompt.md`, `Plan.md`, `Setup.md`, and `Documentation.md`: updated durable project state for the AdMob verification route.

Validation plan:
- Run `npm run build`.
- Confirm `dist/app-ads.txt` exists and matches the required AdMob publisher line.
- Run `git diff --check`.
- Optionally preview `http://127.0.0.1:4173/app-ads.txt` before deployment.

Validation results:
- `npm run build`: passed. `dist/app-ads.txt` was emitted.
- `git diff --check`: passed.
- `cmp -s app-ads.txt public/app-ads.txt`: passed.
- `cmp -s public/app-ads.txt dist/app-ads.txt`: passed.
- `curl -fsS http://127.0.0.1:4173/app-ads.txt`: passed and returned `google.com, pub-8560729629870794, DIRECT, f08c47fec0942fa0`.
- `curl -I -L --max-time 15 http://www.eclipsestudios.io/app-ads.txt`: current live site returns 404 before deployment.
- `curl -I -L --max-time 15 https://eclipsestudios.io/app-ads.txt`: current live site redirects to `https://www.eclipsestudios.io/app-ads.txt` and returns 404 before deployment.

Remaining deployment step:
- Commit and push the change so GitHub Pages deploys `https://www.eclipsestudios.io/app-ads.txt`.

## Push The Button privacy policy log

Date: 2026-05-07

Started a new privacy policy pass for `Push The Button`, described as a fictional social debate experience.

User-provided privacy facts:
- The app does not ask for name, email, contacts, location, payment information, or social account.
- If a backend is enabled, vote data is used only to count submissions and reveal the fictional debate result after the scheduled reveal time.

Files changed:
- `src/content/legalDocs.js`: added `push-the-button-privacy` and a docs hub group for Push The Button.
- `docs/push-the-button/privacy.html`: added the clean public privacy policy route.
- `vite.config.js`: added the route to Vite build inputs.
- `Prompt.md`, `Plan.md`, and `Documentation.md`: updated durable project state for this new app policy.

Validation plan:
- Run `npm run build`.
- Confirm `dist/docs/push-the-button/privacy.html` is emitted.
- Run `git diff --check`.
- Preview `http://127.0.0.1:4173/docs/push-the-button/privacy.html` if needed before deployment.

Validation results:
- `npm run build`: passed. Vite emitted `dist/docs/push-the-button/privacy.html`.
- `git diff --check`: passed.
- `test -f dist/docs/push-the-button/privacy.html`: passed.
- `curl -fsS http://127.0.0.1:4173/docs/push-the-button/privacy.html`: passed and returned the expected `Push The Button Privacy Policy | Eclipse Studios` HTML shell with `data-doc-id="push-the-button-privacy"`.

Deployment target:
- `https://www.eclipsestudios.io/docs/push-the-button/privacy.html`

Follow-up issue:
- After deployment, the Push The Button policy route returned HTML but rendered a blank page in the browser.
- Browser-use confirmed a runtime error: `TypeError: Cannot read properties of undefined (reading 'startsWith')`.
- Root cause: `LegalPage` always rendered a `Legacy link`, but the new Push The Button policy had no `legacyPath`.
- Fix: make the legacy link conditional so clean-only policy routes render correctly.
- `npm run build`: passed after the renderer fix.
- `git diff --check`: passed after the renderer fix.
- Browser-use local preview check at `http://127.0.0.1:4173/docs/push-the-button/privacy.html`: passed. The page rendered the `Push The Button Privacy Policy` heading and `Overview` section.
