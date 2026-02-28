# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal resume project that uses a web-based approach for content maintenance and Chrome browser for PDF export. The project follows Solution A (HTML + CSS + Print Media Queries) for simplicity and maintainability.

**Key Features:**
- Web interface for editing resume content (via JSON)
- Real-time preview with hot reload
- Chrome "Print to PDF" for A4-sized output
- Separation of content (data/resume.json) and styles (CSS)

## Development Commands

```bash
npm install          # Install dependencies (first time only)
npm run dev          # Start development server (http://localhost:5173)
npm run build        # Build for production
npm run preview      # Preview production build
```

## Project Architecture

```
resume/
├── data/resume.json              # Resume content backup
├── src/
│   ├── index.html                # HTML template
│   ├── resume.json               # Resume content (EDIT THIS for content changes)
│   ├── main.js                   # Rendering logic (fetches JSON, builds DOM)
│   └── styles/
│       ├── screen.css            # Screen display styles
│       └── print.css             # PDF print styles (@page A4 rules)
```

**Content Flow:**
1. `resume.json` contains all resume data (personal info, experience, skills, etc.)
2. `main.js` fetches JSON and dynamically renders HTML
3. `screen.css` styles for browser preview
4. `print.css` applies when exporting PDF (A4 size, page breaks, print-optimized fonts)

## PDF Export Process

1. Run `npm run dev` and open browser
2. Press `Cmd+P` (Mac) or `Ctrl+P` (Windows)
3. Select "Save as PDF"
4. Settings: A4 paper, no margins, enable background graphics
5. Save

## Key Technical Details

**A4 Size Enforcement:**
- `@page { size: A4; margin: 0; }` in `print.css`
- Container width: `210mm` (A4 width)
- Use `mm` or `pt` units for print accuracy

**Page Break Control:**
- `page-break-inside: avoid` on sections/items
- Prevents content from splitting awkwardly across pages

**Font Sizing:**
- Screen: `px` units (14px base)
- Print: `pt` units (10pt base, better for printing)

## Modifying Content

To update resume content, edit `src/resume.json`:
- `personalInfo`: Name, title, contact info, links
- `summary`: Personal summary paragraph
- `experience[]`: Work experience entries
- `projects[]`: Project portfolio
- `education[]`: Education background
- `skills`: Categorized skill lists

**Note**: `data/resume.json` is a backup. The actual file used is `src/resume.json`.

## Modifying Styles

- **Layout/Colors**: Edit `src/styles/screen.css`
- **PDF Output**: Edit `src/styles/print.css` (affects printed PDF only)
- Both files use CSS custom properties (`:root` variables) for easy theming

## Technology Stack

- **Vite**: Fast dev server with HMR (hot module replacement)
- **Vanilla JavaScript**: No framework dependencies
- **CSS Print Media Queries**: Native browser printing support
