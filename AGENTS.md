# Repository Guidelines

## Project Structure & Module Organization
- `src/` holds the site: `index.html` (theme selector), `viewer.html` (resume viewer), and `main.js` (runtime loader).
- `src/data/` contains resume content per language (e.g., `resume.zh.json`, `resume.en.json`).
- `src/themes/` contains theme modules; each theme folder must include `template.js`, `screen.css`, and `print.css`. Theme metadata lives in `src/themes/themes.json`.
- `scripts/` is reserved for utilities (e.g., future batch export).

## Build, Test, and Development Commands
- `npm install`: install dependencies.
- `npm run dev`: start the Vite dev server with HMR at `http://localhost:5173`.
- `npm run build`: build production assets into `dist/`.
- `npm run preview`: preview the production build locally.

## Coding Style & Naming Conventions
- JavaScript is ES modules (`type: module`), use semicolons and 2-space indentation.
- Keep content and presentation separate: edit data in `src/data/*.json`; update layout/styling in `src/themes/<theme>/`.
- Theme naming: kebab-case IDs (`modern-minimal`) and folder names must match the `themes.json` entry.
- When modifying a theme, preserve its visual spec exactly (font sizes, colors, spacing, print rules). Don’t round values.

## Testing Guidelines
- No automated test framework is configured. Validate changes by running `npm run dev` and checking screen and print output (A4, no margins, background graphics enabled).

## Commit & Pull Request Guidelines
- Commit messages must follow Conventional Commits (e.g., `feat(theme): add minimalist grid`). Recent history uses this pattern and repo guidance requires it.
- Avoid adding AI co-author footers in commit messages.
- PRs should include: a clear description, affected theme/data paths, and screenshots or PDFs when visual output changes.

## Configuration & Data Notes
- Resume JSON must follow the shared schema used by themes; keep required fields such as `experience[].description` and `projects[].startDate`.
- For sharing specific views, use URL params like `viewer.html?lang=zh&theme=consultant-polished&version=default`.
