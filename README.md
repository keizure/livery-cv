# Livery CV

> A bilingual (EN/ZH) resume builder that renders your JSON data into polished print-ready themes.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

- 🎨 **Multiple Themes** — same content, different visual styles with live previews
- 🌍 **Bilingual** — seamless EN/ZH switching with localized labels
- 🗂️ **Multi-version** — maintain distinct resume variants (e.g. general, AI-company) from one data set
- 🔄 **Content/style separation** — JSON data is fully decoupled from themes
- 📄 **PDF export** — one-click A4 export with accurate page-count estimate

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open `http://localhost:5173` to reach the theme selector.

## 📖 Usage

### 1. Select language and version

On the theme selector page, use the top bar to switch between **中文 / English** and, if multiple versions are defined, select the desired resume version (e.g. 默认版 / AI公司版).

### 2. Preview and open a theme

Each theme card shows a live scaled preview. Click a card or its **查看简历 / View Resume** button to open the full-page resume viewer.

In the viewer, use the left sidebar to:
- Switch language or version on the fly
- Click **导出 PDF (N页)** to print to PDF

### 3. Export to PDF

Click the **导出 PDF** button in the viewer sidebar, or press `Cmd+P` (Mac) / `Ctrl+P` (Windows), then:

| Setting | Value |
|---|---|
| Paper size | A4 |
| Margins | None |
| Background graphics | Enabled |

### 4. Edit your resume data

Update the relevant file in `src/data/`:

| Language | File |
|---|---|
| Chinese | `src/data/resume.zh.json` |
| English | `src/data/resume.en.json` |

### 5. Create a new resume version

```bash
npm run cv:new
```

This interactive command will prompt you for:
- **Version ID** — ASCII slug used in filenames and URLs (e.g. `internet`)
- **Display label** — shown in the version selector (e.g. `互联网版`)
- **Base version** — which existing version to copy from

It then creates `resume.zh.<id>.json` and `resume.en.<id>.json` in `src/data/`, and registers the new version in `versions.json`. Edit the generated files to tailor that variant.

When only one version is defined, the version selector is hidden. You can also link directly to a specific view:

```
viewer.html?lang=zh&theme=consultant-polished&version=agent
```

## 📝 Data Format

All language files share the same field schema:

```json
{
  "personalInfo": {
    "name": "Your Name",
    "title": "Your Title",
    "email": "email@example.com",
    "phone": "123-456-7890",
    "location": "City, Country",
    "links": {
      "github": "https://github.com/username",
      "linkedin": "https://linkedin.com/in/username"
    }
  },
  "summary": "Brief professional summary...",
  "experience": [...],
  "projects": [...],
  "education": [...],
  "skills": {
    "languages": ["JavaScript", "TypeScript"],
    "frameworks": ["React", "Node.js"],
    "tools": ["Git", "Docker"],
    "databases": ["PostgreSQL", "Redis"]
  }
}
```

## 🎨 Adding a New Theme

1. Create a folder under `src/themes/`, e.g. `src/themes/modern-minimal/`
2. Add three required files:
   - `template.js` — exports a `render(data, lang)` function that returns an HTML string
   - `screen.css` — styles for browser display
   - `print.css` — styles for PDF export
3. Register the theme in `src/themes/themes.json`:

```json
{
  "themes": [
    {
      "id": "modern-minimal",
      "name": "Modern Minimal",
      "description": "Clean, tech-industry friendly design",
      "preview": "/previews/modern-minimal.png"
    }
  ]
}
```

The theme selector picks it up automatically on the next page load.

## 🚢 Deployment

Build and deploy the static output:

```bash
npm run build   # outputs to dist/
```

Deploy the `dist/` folder to any static host: Vercel, Netlify, GitHub Pages, Cloudflare Pages, etc.

## 📄 License

MIT
