# Implement

## Read-first rules

- Read `Prompt.md`, `Plan.md`, `Implement.md`, `Documentation.md`, and `Setup.md` before starting implementation.
- Read `src/content/legalDocs.js` before changing legal text or legal routes.
- Read `vite.config.js` before adding, removing, or renaming public HTML routes.
- Read `src/App.jsx` before changing docs rendering, route detection, nav links, or legacy path handling.
- Read the relevant game engine only if legal text depends on actual data behavior.
- Do not infer iOS data practices from web code; ask for or inspect the Apple app source if needed.

## Edit rules

- Do not do full-file replace or delete-style edits for existing files.
- Keep legal copy factual, narrow, and tied to implemented behavior.
- Preserve Eclipse Studios branding.
- Preserve legacy URLs unless the user explicitly approves a different mapping.
- Keep clean docs URLs additive unless there is an approved migration plan.
- Avoid unrelated UI or gameplay changes during legal-doc implementation.
- Keep generated or very large files out of manual edits unless directly required.

## Testing rules

- Run `npm run build` after route, docs, or Vite config changes.
- Run `git diff --check` before handoff.
- Use browser-use for UI-level legal page checks when docs rendering or navigation changes.
- Check direct loading of legacy legal URLs and any new clean legal URLs.
- Check browser console errors after legal page load.
- Do not run broader validation commands unless they are relevant to the changed surface or requested.

## Documentation rules

- Update `Documentation.md` after meaningful implementation milestones.
- Log commands run and their status.
- Record route mapping decisions, especially legacy URL behavior.
- Record open legal or App Store questions instead of hiding uncertainty in policy copy.
- Keep `Plan.md` current if milestones, scope, or validation commands change.

## Git/worktree rules

- Check `git status --short --branch` before staging or committing.
- Do not stage unrelated `.DS_Store` changes.
- Do not revert user changes unless explicitly requested.
- Use commit messages prefixed with `Commit # - ` when the user asks for commits.
- Do not amend commits unless explicitly requested.
- Avoid destructive git commands.

## Done definition

- Unified Privacy Policy and Terms of Service are implemented or the current milestone is explicitly documented as planning-only.
- Legacy and clean routes are documented and validated.
- Build and diff checks pass for implementation milestones.
- Browser-use visual checks are completed for UI-level docs changes.
- `Documentation.md` reflects commands run, status, blockers, and next actions.
- The final handoff clearly separates completed planning from completed implementation.
