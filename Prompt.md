# Prompt

## Product goal

Create one unified Privacy Policy and one unified Terms of Service for Eclipse Games, covering Sequences, Gridlock, and Tile Tangles across both the web site and Apple App Store app distribution.

The unified documents should preserve existing factual privacy claims, support contact details, legacy URL compatibility, GitHub Pages deploy behavior, and the current Eclipse Studios brand. The legal-doc experience should remain useful for public web visitors, App Store review, and links already shipped in apps.

## Non-goals

- Do not begin legal page implementation until the plan is approved.
- Do not remove legacy legal URLs without an explicit redirect or compatibility plan.
- Do not invent new data collection claims that are not supported by the apps or current code.
- Do not add accounts, analytics, ads, Firebase, cloud sync, payments, or backend services as part of this legal-doc consolidation.
- Do not change gameplay behavior while working on legal documents.
- Do not treat generated policy text as legal advice; final wording needs owner/legal review before production reliance.

## Scope

- Consolidate Sequences, Gridlock, and Tile Tangles into shared Eclipse Studios legal documents.
- Support both web play and Apple App Store app distribution in the same Privacy Policy and Terms of Service.
- Update the docs hub and existing legal routes to point to the unified documents.
- Preserve old URLs where external app links may already point.
- Keep game-specific privacy distinctions where relevant, especially local storage, word-game progress, high scores, hints, and device or platform diagnostics.
- Document validation steps for direct-route loading, GitHub Pages deployment, and App Store policy-link usability.
- Publish `app-ads.txt` at the site root so Google AdMob can verify the custom developer website domain.
- Add a public Push The Button privacy policy link for App Store and web policy use.

## Constraints

- Root-level repository instructions require no full-file replace or delete-style edits for existing files.
- Commit messages must use the prefix `Commit # - ` when commits are requested.
- The site is a static React and Vite app deployed to GitHub Pages.
- The Vite config uses `base: "./"`, so direct static routes and relative assets must keep working on GitHub Pages.
- Existing dirty worktree state includes `.DS_Store` before this planning pass; avoid mixing unrelated local metadata changes into future commits.
- Current support email in source is `spermwhaledaily@gmail.com`.
- Current docs are data-driven from `src/content/legalDocs.js`.
- Current legal claims mention local gameplay data, no sale of personal data, no cross-context behavioral advertising, no third-party advertising for Sequences, and possible platform or infrastructure services such as Firebase where applicable.
- `Gridlock` and `Tile Tangles` were recently added as local-only web game ports; do not claim backend accounts or cloud stats for them unless implementation changes.

## Important source areas

- `src/content/legalDocs.js`: current legal document source data, support email, docs metadata, and legacy route mapping.
- `src/App.jsx`: routing, docs rendering, homepage links, nav links, support page rendering, and path handling for GitHub Pages.
- `src/wordsmithGames.jsx`: Gridlock and Tile Tangles web UI, tutorial text, and local gameplay surfaces.
- `src/games/gridlockEngine.js`: Gridlock local gameplay, local high-score behavior, word validation, timers, modes, and state handling.
- `src/games/tileTanglesEngine.js`: Tile Tangles local gameplay, word pairs, hints, timers, move limits, and state handling.
- `src/content/gameData.js`: Sequences puzzle content and gameplay data.
- `docs/index.html`, `docs/sequences/privacy.html`, `docs/sequences/terms.html`, and legacy root legal HTML files: static entry points emitted by Vite.
- `vite.config.js`: static route inputs that must continue emitting all public HTML routes.
- `.github/workflows/deploy-pages.yml`: GitHub Pages deployment workflow.

## Budgets

- Privacy budget: keep the policy minimal, factual, and scoped to actual data handling.
- Compatibility budget: preserve all existing public legal URLs and add unified clean URLs only with explicit mapping.
- Quality budget: no visible `Studio987` public text should reappear.
- Reliability budget: direct loading of all legal routes must work after `npm run build`.
- Performance budget: legal-doc consolidation should not materially increase the game bundle size.
- App Store budget: final legal links must be stable, public, HTTPS, and accessible without login.
- AdMob budget: `https://www.eclipsestudios.io/app-ads.txt` must resolve as plain text from the deployed site root.
- Push The Button privacy budget: keep claims limited to the supplied facts: no name, email, contacts, location, payment information, or social account; backend vote data, if enabled, is used only for counting submissions and revealing the scheduled fictional result.
