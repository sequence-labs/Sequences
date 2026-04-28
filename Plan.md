# Plan

## Milestones

1. Planning and repo orientation.
2. Unified legal model design.
3. Draft unified Privacy Policy and Terms of Service content.
4. Route and docs hub implementation.
5. Browser and build validation.
6. Review, polish, and handoff.

## Detailed work packages

- WP1: Inventory current legal routes, app names, legacy URL expectations, support email, and factual privacy claims.
- WP2: Design a unified legal-doc data structure in `src/content/legalDocs.js` that can represent shared policy pages and legacy compatibility pages.
- WP3: Draft one Privacy Policy for Sequences, Gridlock, and Tile Tangles covering web and Apple App Store app use.
- WP4: Draft one Terms of Service for Sequences, Gridlock, and Tile Tangles covering web and Apple App Store app use.
- WP5: Update route rendering so legacy Sequences URLs and docs hub links point to or render the unified docs without breaking direct URL access.
- WP6: Add or update clean unified docs URLs if approved, likely `docs/games/privacy.html` and `docs/games/terms.html`.
- WP7: Preserve or intentionally map existing `terms-of-service.html`, `privacy-policy.html`, `docs/sequences/terms.html`, and `docs/sequences/privacy.html`.
- WP8: Check Apple App Store suitability: public HTTPS links, no login requirement, brand consistency, contact email, data practices, and platform terms language.
- WP9: Validate locally with Vite build, direct route loading, browser screenshots, and console checks.
- WP10: Prepare final implementation summary and any App Store copy notes.
- WP11: Publish `app-ads.txt` through the Vite static build so AdMob can crawl the custom domain root.

## Estimated agent-hours

- Planning and inventory: 1 to 2 hours.
- Unified legal copy draft: 2 to 4 hours.
- Route and docs implementation: 2 to 4 hours.
- Browser QA and direct-route validation: 1 to 2 hours.
- Review polish and handoff: 1 hour.
- Total estimate: 7 to 13 agent-hours.

## Dependencies

- Confirmation that the unified legal docs should cover only Sequences, Gridlock, and Tile Tangles, not Spy or PatchIt.
- Confirmation whether Gridlock and Tile Tangles also ship as Apple App Store apps under the same umbrella app or as separate apps.
- Confirmation of any actual iOS-only data handling not visible in this web repo.
- Owner review of final legal language before production reliance.
- Existing Vite route setup and GitHub Pages workflow.

## Metrics

- All intended legal routes emit under `dist` after `npm run build`.
- Direct route loading works for legacy and clean URLs.
- Docs hub clearly exposes one unified Privacy Policy and one unified Terms of Service for the three word games.
- App Store policy links are stable and public.
- No broken nav links from homepage, games hub, game pages, docs hub, or support page.
- No browser console errors on legal pages after load.
- No unrelated gameplay changes in the implementation diff.

## Acceptance criteria

- One unified Privacy Policy exists for Sequences, Gridlock, and Tile Tangles.
- One unified Terms of Service exists for Sequences, Gridlock, and Tile Tangles.
- The documents explicitly cover web use and Apple App Store app use.
- Existing factual privacy claims are preserved or narrowed, not expanded without evidence.
- Existing legacy URLs continue to work.
- New clean URLs are documented and included in Vite inputs if added.
- The docs hub points users to the unified documents without confusing app-specific duplicates.
- `npm run build` succeeds.
- `git diff --check` succeeds.
- Browser-use screenshots confirm the docs hub and unified docs render cleanly on desktop-sized and mobile-sized views if UI changes are made.
- `dist/app-ads.txt` is emitted by `npm run build` and contains the AdMob publisher line exactly.

## Exact validation commands

```bash
npm run build
git diff --check
npm run preview -- --host 127.0.0.1
```

Optional browser validation targets:

```text
http://127.0.0.1:4173/docs/index.html
http://127.0.0.1:4173/docs/sequences/privacy.html
http://127.0.0.1:4173/docs/sequences/terms.html
http://127.0.0.1:4173/privacy-policy.html
http://127.0.0.1:4173/terms-of-service.html
```

If clean unified routes are added, also validate:

```text
http://127.0.0.1:4173/docs/games/privacy.html
http://127.0.0.1:4173/docs/games/terms.html
```

AdMob validation target:

```text
http://127.0.0.1:4173/app-ads.txt
```

## Stop and rollback conditions

- Stop if policy drafting requires unsupported claims about Apple app data handling.
- Stop if a change would remove or break a legacy legal URL.
- Stop if Vite route changes cause GitHub Pages direct-route assets to 404.
- Stop if legal changes imply new data collection or user rights commitments that the app does not support.
- Roll back route changes if direct legacy URLs fail after build.
- Roll back docs copy if it conflicts with current app behavior or App Store privacy disclosures.

## Current status

- Planning docs created.
- Repository inspected for structure, scripts, deployment workflow, current legal source, and current game source areas.
- Unified Eclipse Games Privacy Policy and Terms of Service implemented in `src/content/legalDocs.js`.
- New clean routes added at `docs/games/privacy.html` and `docs/games/terms.html`.
- Legacy Sequences policy and terms URLs now render the unified Eclipse Games documents for compatibility.
- `npm run build` and `git diff --check` have passed for the implementation.
- Browser-use route checks are complete for the docs hub, clean unified legal routes, and legacy policy and terms routes.
- `app-ads.txt` root publishing is implemented and locally validated for AdMob verification on `www.eclipsestudios.io`.
- Next step is deployment by committing and pushing when requested.
