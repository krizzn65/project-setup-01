# Instructions for any AI agent

1. **Always**: read `skills/always-on/SKILL.md` at the start of the session and apply it to every response.
2. **Hackathon setup** (user says "hackathon", "study case", "project-setup-01", or pastes a study case): read `skills/project-setup-01/SKILL.md` and follow it step by step. It reads templates from the sibling folders `skills/project-setup/`, `skills/project-onboard/` and `skills/project-design/`; resolve every `../<name>/` path in it as `skills/<name>/`.
3. **Other work**: `skills/project-setup/` (new non-hackathon project), `skills/project-onboard/` (understand an existing `docs/` project), `skills/project-design/` (design system from a reference).

If your tool cannot run commands, skip only the steps that need a shell (design `lint`/`export`, `extract_colors.py`, logo scripts, project setup) or a browser (`extract_styles.js`, screenshots, visual checks, design preview comparison) and say so; every other step still applies. Logo steps need the separate `logo-design` skill; without it, skip them.
