# Livery CV

> A bilingual (EN/ZH) CV builder that transforms your data into polished templates—with skills and media (links/images) automation built in.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

- 🎨 **Multiple Themes** - Same content, different visual styles
- 🌍 **Bilingual Support** - Seamless EN/ZH switching with localized labels
- 🔄 **Content-Style Separation** - JSON data completely decoupled from themes
- 📱 **Live Preview** - Hot module replacement for instant feedback
- 📄 **PDF Export** - Print to perfect A4-sized PDFs via browser
- 🎚️ **Smart Switcher** - Sliding language toggle (hidden in print)

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Dev Server

```bash
npm run dev
```

The browser will open at `http://localhost:5173` with the theme selector.

### 3. Choose Language & Theme

- Click **中文** or **English** at the top to switch languages
- Select a theme card and click **查看简历** / **View Resume**

### 4. Edit Your Data

Update the appropriate language file:
- Chinese: `src/data/resume.zh.json`
- English: `src/data/resume.en.json`

The page auto-refreshes on save thanks to Vite HMR.

### 5. Export PDF

On the resume preview page:
1. Press `Cmd+P` (Mac) or `Ctrl+P` (Windows)
2. Select **"Save as PDF"**
3. Settings:
   - Paper size: **A4**
   - Margins: **None**
   - Background graphics: **Enabled**
4. Save to local

## 📁 Project Structure

```
livery-cv/
├── src/
│   ├── index.html              # Theme selector homepage
│   ├── viewer.html             # Resume viewer with lang switcher
│   ├── main.js                 # Core loading logic
│   │
│   ├── data/                   # Resume data (multi-language)
│   │   ├── resume.zh.json      # Chinese resume
│   │   └── resume.en.json      # English resume
│   │
│   └── themes/                 # Theme directory
│       ├── themes.json         # Theme metadata
│       │
│       └── consultant-polished/ # Theme implementation
│           ├── template.js     # HTML structure renderer
│           ├── screen.css      # Screen display styles
│           └── print.css       # PDF print styles
│
├── vite.config.js
└── package.json
```

## 🎨 Adding New Themes

1. Create a new directory in `src/themes/`, e.g., `modern-minimal/`
2. Add three required files:
   - `template.js` - Export a `render(data, lang)` function
   - `screen.css` - Styles for browser display
   - `print.css` - Styles for PDF export
3. Register in `src/themes/themes.json`:

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

The system will auto-detect and display the new theme.

## 🌍 Adding New Languages

1. Create a new data file in `src/data/`, e.g., `resume.ja.json` (Japanese)
2. Add language labels to theme's `template.js`:

```javascript
const labels = {
  zh: { summary: '个人简介', ... },
  en: { summary: 'Profile', ... },
  ja: { summary: '要約', ... }  // New language
};
```

3. Update `src/index.html` to add a language switcher button

## 🛠 Tech Stack

- **Vite** - Lightning-fast dev server with HMR
- **Vanilla JavaScript** - Zero framework dependencies
- **CSS Print Media** - Native browser printing with A4 precision
- **ES Modules** - Modern modular architecture with dynamic imports

## 📐 Design Philosophy

### 1. Content-Style Separation
- Resume data (JSON) and themes (HTML/CSS) are completely decoupled
- Updating content automatically reflects across all themes
- Modifying themes never affects data integrity

### 2. Theme Independence
- Each theme is a self-contained module
- Themes don't interfere with each other
- Easy to develop, test, and maintain

### 3. Language Localization
- UI labels switch automatically based on language
- Supports language-specific formatting rules (e.g., Chinese `•` vs English `,`)

## 🎯 URL Parameters

Control the viewer via URL parameters:

```
http://localhost:5173/viewer.html?lang=zh&theme=consultant-polished
```

- `lang` - Language code (`zh` / `en`)
- `theme` - Theme ID (see `themes.json`)

Perfect for sharing specific language/theme combinations.

## 📝 Data File Format

Resume data follows a unified JSON structure (same field names for all languages):

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

## 🔮 Roadmap

- [x] Phase 1: Multi-theme architecture refactor
- [x] Phase 2: Bilingual support (EN/ZH)
- [x] Phase 3: Theme selector UI with sliding language switcher
- [ ] Phase 4: Batch PDF export via Puppeteer
- [ ] Phase 5: Additional themes (Modern Minimal, Classic, etc.)
- [ ] Phase 6: Online theme editor

## 🎨 Inspiration

### English Resume Themes
- [Consultant Polished](https://registry.jsonresume.org/thomasdavis?theme=consultant-polished)
- [Minimalist Grid](https://registry.jsonresume.org/thomasdavis?theme=minimalist-grid)

### Chinese Resume References
- Open for suggestions!

## 📄 License

MIT License

## 🤝 Contributing

Issues and Pull Requests are welcome!

## 🚀 Deployment

This project uses pure web technologies with no backend required. Deploy the `dist/` directory to any static hosting service:

- **Vercel** - Zero-config deployment
- **Netlify** - Instant builds with continuous deployment
- **GitHub Pages** - Free hosting for public repos
- **Cloudflare Pages** - Fast global CDN

Simply run `npm run build` and deploy the generated `dist/` folder.

---

**Made with ❤️ for job seekers who value design and efficiency**
