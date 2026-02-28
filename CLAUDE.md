# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a multi-theme, multi-language personal resume system built with modern web technologies. The project supports multiple visual themes and bilingual (Chinese/English) resumes with hot reload preview and PDF export capabilities.

**Key Features:**
- Multiple theme support (same content, different visual styles)
- Multi-language support (Chinese/English with automatic label switching)
- Content-style separation (data and themes are completely decoupled)
- Real-time preview with hot module replacement
- Chrome "Print to PDF" for perfect A4-sized output

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
├── src/
│   ├── index.html              # Theme selector homepage
│   ├── viewer.html             # Resume viewer
│   ├── main.js                 # Core loading logic
│   │
│   ├── data/                   # Resume data (multi-language)
│   │   ├── resume.zh.json      # Chinese resume
│   │   └── resume.en.json      # English resume
│   │
│   └── themes/                 # Themes directory
│       ├── themes.json         # Theme metadata
│       │
│       └── consultant-polished/ # Theme implementation
│           ├── template.js     # HTML structure renderer
│           ├── screen.css      # Screen display styles
│           └── print.css       # PDF print styles
│
├── scripts/                    # Utility scripts (future: batch export)
└── vite.config.js
```

## How It Works

### 1. Theme Selection Flow
1. User visits `http://localhost:5173/` (index.html)
2. System loads `themes/themes.json` to display all available themes
3. User selects language (Chinese/English) and theme
4. Clicks "查看简历" to navigate to `viewer.html?lang=zh&theme=consultant-polished`

### 2. Resume Rendering Flow
1. `viewer.html` loads and shows "Loading..."
2. `main.js` parses URL parameters (`lang`, `theme`)
3. Loads resume data from `data/resume.{lang}.json`
4. Dynamically imports theme template from `themes/{theme}/template.js`
5. Dynamically loads theme CSS files (screen.css and print.css)
6. Calls `render(data, lang)` function to generate HTML
7. Inserts generated HTML into page container

### 3. Theme Structure

Each theme is a self-contained module with three files:

**template.js**
```javascript
export function render(data, lang = 'zh') {
  const t = labels[lang]; // Language-specific labels
  return `<html>...</html>`; // Generated HTML
}
```

**screen.css** - Styles for browser display
**print.css** - Styles for PDF export (A4 size, page breaks, etc.)

## Modifying Content

To update resume content, edit the appropriate language file:
- Chinese: `src/data/resume.zh.json`
- English: `src/data/resume.en.json`

**Data Structure:**
- `personalInfo`: Name, title, contact info, links
- `summary`: Personal summary paragraph
- `experience[]`: Work experience entries
- `projects[]`: Project portfolio
- `education[]`: Education background
- `skills`: Categorized skill lists (languages, frameworks, tools, databases)

## Adding New Themes

1. Create new directory in `src/themes/`, e.g., `modern-minimal/`
2. Add three required files:
   - `template.js` - Export `render(data, lang)` function
   - `screen.css` - Screen display styles
   - `print.css` - PDF print styles
3. Register theme in `src/themes/themes.json`:
```json
{
  "id": "modern-minimal",
  "name": "Modern Minimal",
  "description": "现代简约风格，适合科技行业",
  "preview": "/previews/modern-minimal.png"
}
```

The system will automatically detect and display the new theme.

## Adding New Languages

1. Create new data file in `src/data/`, e.g., `resume.ja.json`
2. Add language labels to theme's `template.js`:
```javascript
const labels = {
  zh: { summary: '个人简介', ... },
  en: { summary: 'Summary', ... },
  ja: { summary: '要約', ... }
};
```
3. Update `index.html` to add language switch button

## PDF Export Process

1. Navigate to viewer page with desired language and theme
2. Press `Cmd+P` (Mac) or `Ctrl+P` (Windows)
3. Select "Save as PDF"
4. Settings: A4 paper, no margins, enable background graphics
5. Save

## Key Technical Details

**A4 Size Enforcement:**
- `@page { size: A4; margin: 0; }` in print.css
- Container width: `210mm` (A4 width)
- Use `mm` or `pt` units for print accuracy

**Page Break Control:**
- `page-break-inside: avoid` on sections/items
- Prevents content from splitting awkwardly across pages

**Font Sizing:**
- Screen: `px` units (16px base)
- Print: `pt` units (11pt base, better for printing)

**Dynamic Loading:**
- Themes loaded dynamically using ES module imports
- CSS loaded via JavaScript-created `<link>` elements
- Enables hot reload and theme switching without page refresh

## Technology Stack

- **Vite**: Fast dev server with HMR (hot module replacement)
- **Vanilla JavaScript**: No framework dependencies
- **CSS Print Media Queries**: Native browser printing support
- **ES Modules**: Modern module system for dynamic imports

## Design Principles

1. **Separation of Concerns**: Content (JSON), structure (template.js), and style (CSS) are completely decoupled
2. **Theme Independence**: Each theme is a self-contained module that doesn't affect others
3. **Language Localization**: UI labels and formatting rules adapt to language automatically
4. **Progressive Enhancement**: Works without JavaScript for basic content access

## Future Enhancements

- **Phase 4**: Batch PDF export using Puppeteer
- **Phase 5**: Additional themes (Modern Minimal, Classic, etc.)
- **Phase 6**: Online theme editor

## Important Notes for AI Assistants

- Always maintain the separation between data and themes
- When adding new themes, follow the three-file structure (template.js, screen.css, print.css)
- Ensure language labels are properly internationalized in template.js
- Test both screen and print styles when modifying CSS
- Use semantic HTML for better accessibility and PDF export
- Keep file paths relative to support deployment to subdirectories
