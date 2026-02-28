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

## Git Commit Convention

**CRITICAL: All commits MUST follow Conventional Commits specification.**

**DO NOT: include the following at the end of commit messages:**
```
power-by: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
```

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

## CRITICAL: Theme Style Requirements

**When modifying or creating themes, you MUST strictly follow the original theme's design specifications. Use browser DevTools to inspect the reference design and match EXACTLY:**

### Style Inspection Process

1. **Open the reference theme** in browser (e.g., https://registry.jsonresume.org/thomasdavis?theme=consultant-polished)
2. **Use DevTools to inspect** every element and record:
   - `font-size` (exact px value, e.g., 15.2px not 16px)
   - `font-family` (complete font stack)
   - `font-weight` (400, 600, etc.)
   - `color` (exact RGB/hex value)
   - `line-height` (exact value or ratio)
   - `padding` and `margin` (exact spacing)
   - `border` styles (width, color, style)

3. **Create a style specification document** with exact values before implementing

### Example: Consultant Polished Theme Specifications

**Typography (exact values from original):**
- Name (h1): 40px, Georgia serif, 600, `#0B1F3A`, line-height: 52px
- Title: 18px, system-ui, 400, `#555555`, line-height: 28.8px
- Contact info: **15.2px**, system-ui, 400, `#0B1F3A` (primary color, not black!)
- Section titles (h2): 24px, Georgia serif, 600, `#0B1F3A`, line-height: 31.2px
- Position/Project (h3): 18px, Georgia serif, 600, `#0B1F3A`
- Company/Location: **14.4px**, system-ui, 400, `#666666`
- Date: **14.4px**, system-ui, 400, `#666666`
- Summary: **17px**, system-ui, 400, `#333333`, line-height: 1.7
- Bullet points: 16px, system-ui, 400, `#444444`, line-height: 1.6
- Project description: 16px, system-ui, 400, `#444444`

**Layout & Spacing:**
- Header border: `2px solid #0B1F3A` (primary color, not gray)
- Section title border: `1px solid #e0e0e0`
- Contact info gap: 20px between items
- Section margins: 40px bottom
- Experience/Project item margins: 24px bottom

**Color Palette:**
```css
:root {
  --primary-color: #0B1F3A;    /* Deep blue for titles and borders */
  --text-color: #1A1A1A;        /* Main text (not often used) */
  --text-secondary: #666666;    /* Company, location, dates */
  --text-body: #333333;         /* Summary paragraphs */
  --text-bullet: #444444;       /* List items and descriptions */
  --border-color: #e0e0e0;      /* Section dividers */
}
```

### Strict Matching Rules

**DO:**
- ✅ Use exact pixel values from DevTools (15.2px, 14.4px, etc.)
- ✅ Match exact color values (`#0B1F3A` not `#0B1F3B`)
- ✅ Use exact font families (Georgia, system-ui stack)
- ✅ Preserve exact spacing and padding
- ✅ Match border widths and colors precisely

**DON'T:**
- ❌ Round values (15.2px → 15px or 16px)
- ❌ Approximate colors (`#0B1F3A` → `#1A1A1A`)
- ❌ Use different font families (Arial vs Georgia)
- ❌ Guess spacing values
- ❌ Change visual hierarchy

### Verification Process

After implementing styles:
1. Open both original and your implementation side-by-side
2. Screenshot both versions
3. Compare element by element:
   - Font sizes match exactly
   - Colors match exactly
   - Spacing matches exactly
   - Visual hierarchy is identical
4. Use DevTools to verify computed styles match

**If any value differs by even 0.1px or one shade of color, it must be corrected.**

### Common Mistakes to Avoid

1. **Rounding font sizes**: 15.2px is NOT 16px, 14.4px is NOT 14px
2. **Wrong colors**: Contact links are primary-color (#0B1F3A), not black (#1A1A1A)
3. **Missing font families**: Section titles need Georgia serif, not system fonts
4. **Inconsistent spacing**: Use exact gap/margin values from original
5. **Weak visual hierarchy**: Border colors and widths matter

### Data Structure Requirements

**Work Experience must include:**
```json
{
  "position": "Job Title",
  "company": "Company Name",
  "location": "City",
  "startDate": "2020-01",
  "endDate": "Present",
  "description": "Brief role summary paragraph",  // REQUIRED
  "highlights": ["Achievement 1", "Achievement 2"]
}
```

**Projects must include:**
```json
{
  "name": "Project Name",
  "description": "Brief description",
  "startDate": "2023-01",  // REQUIRED - show dates, not links
  "endDate": "2023-12",
  "tech": ["React", "Node.js"],
  "highlights": ["Achievement 1"]
}
```

**Education (no GPA):**
```json
{
  "school": "University",
  "degree": "Bachelor's",
  "major": "Computer Science",
  "startDate": "2016-09",
  "endDate": "2020-06"
  // NO gpa field
}
```

### Theme Modification Workflow

When asked to modify theme styles:

1. **Inspect Original**: Use DevTools on reference design
2. **Document Exact Values**: Create specification with all exact values
3. **Implement Precisely**: Match every value exactly
4. **Verify Side-by-Side**: Compare with original
5. **Iterate Until Perfect**: Fix any discrepancies

**Remember: "Close enough" is not acceptable. Exact pixel-perfect matching is required.**

