/**
 * Resume Viewer - Main Script
 * Loads resume data and theme dynamically based on URL parameters
 */

// Parse URL parameters
const params = new URLSearchParams(window.location.search);
const lang = params.get('lang') || 'zh';
const themeId = params.get('theme') || 'consultant-polished';
const version = params.get('version') || 'default';

/**
 * Load CSS file dynamically
 * @param {string} href - CSS file path
 * @param {string} media - Media query (optional)
 */
function loadCSS(href, media = 'all') {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  link.media = media;
  document.head.appendChild(link);
  return new Promise((resolve, reject) => {
    link.onload = resolve;
    link.onerror = reject;
  });
}

/**
 * Load resume data from JSON file
 * @param {string} language - Language code (zh/en)
 * @param {string} ver - Version ID (default or custom)
 */
async function loadData(language, ver) {
  const filename = ver === 'default'
    ? `resume.${language}.json`
    : `resume.${language}.${ver}.json`;
  try {
    const response = await fetch(`/data/${filename}`);
    if (!response.ok) {
      throw new Error(`Failed to load resume data: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error loading resume data:', error);
    throw error;
  }
}

/**
 * Load theme template module
 * @param {string} theme - Theme ID
 */
async function loadTheme(theme) {
  try {
    const module = await import(`./themes/${theme}/template.js`);
    return module.render;
  } catch (error) {
    console.error(`Error loading theme '${theme}':`, error);
    throw error;
  }
}

/**
 * Main initialization function
 */
async function init() {
  const loadingEl = document.getElementById('loading');
  const resumeEl = document.getElementById('resume');

  try {
    // Load theme CSS files, resume data, and versions metadata in parallel
    const [, , data, versionsData] = await Promise.all([
      loadCSS(`/themes/${themeId}/screen.css`),
      loadCSS(`/themes/${themeId}/print.css`, 'print'),
      loadData(lang, version),
      fetch('/data/versions.json').then(r => r.json()).catch(() => ({ versions: [] }))
    ]);

    // Load theme template
    const render = await loadTheme(themeId);

    // Render resume
    resumeEl.innerHTML = render(data, lang);

    // Update page title: name | versionLabel | langLabel
    const name = data.personalInfo?.name || '';
    const versionEntry = versionsData.versions.find(v => v.id === version);
    const versionLabel = versionEntry ? versionEntry.label : version;
    const langLabel = lang === 'zh' ? '中文' : 'English';
    document.title = [name, versionLabel, langLabel].filter(Boolean).join('-');

    // Hide loading indicator
    if (loadingEl) {
      loadingEl.style.display = 'none';
    }

    // Update page language attribute
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';

  } catch (error) {
    console.error('Initialization failed:', error);
    resumeEl.innerHTML = `
      <div style="padding: 40px; text-align: center; color: #d32f2f; font-family: system-ui;">
        <h2>加载失败 / Loading Failed</h2>
        <p style="margin-top: 16px; color: #666;">${error.message}</p>
        <p style="margin-top: 8px; font-size: 14px; color: #999;">
          请检查 URL 参数: lang=${lang}, theme=${themeId}, version=${version}
        </p>
      </div>
    `;
    if (loadingEl) {
      loadingEl.style.display = 'none';
    }
  }
}

// Start initialization when DOM is ready
init();
