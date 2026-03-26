/**
 * Resume Viewer - Main Script
 * Loads resume data and theme dynamically based on URL parameters
 */

const params = new URLSearchParams(window.location.search);
let lang = params.get('lang') || 'zh';
const themeId = params.get('theme') || 'consultant-polished';
let version = params.get('version') || 'default';

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

async function loadTheme(theme) {
  try {
    const module = await import(`./themes/${theme}/template.js`);
    return module.render;
  } catch (error) {
    console.error(`Error loading theme '${theme}':`, error);
    throw error;
  }
}

let cachedRender = null;
let cachedVersions = [];

function applyRender(data, newLang, newVersion) {
  const resumeEl = document.getElementById('resume');
  resumeEl.innerHTML = cachedRender(data, newLang);
  document.documentElement.lang = newLang === 'zh' ? 'zh-CN' : 'en';

  const name = data.personalInfo?.name || '';
  const versionEntry = cachedVersions.find(v => v.id === newVersion);
  const versionLabel = versionEntry ? versionEntry.label : newVersion;
  const langLabel = newLang === 'zh' ? '中文' : 'English';
  document.title = [name, versionLabel, langLabel].filter(Boolean).join('-');

  // Notify viewer shell (e.g. to update page count estimate)
  window._liveryOnRender?.();
}

async function rerenderResume(newLang, newVersion) {
  const resumeEl = document.getElementById('resume');
  resumeEl.style.opacity = '0';

  try {
    const data = await loadData(newLang, newVersion);
    applyRender(data, newLang, newVersion);

    lang = newLang;
    version = newVersion;

    const newParams = new URLSearchParams(window.location.search);
    newParams.set('lang', newLang);
    newParams.set('version', newVersion);
    history.replaceState(null, '', '?' + newParams.toString());
  } catch (error) {
    console.error('Rerender failed:', error);
  }

  requestAnimationFrame(() => requestAnimationFrame(() => {
    resumeEl.style.opacity = '1';
  }));
}

async function init() {
  const loadingEl = document.getElementById('loading');
  const resumeEl = document.getElementById('resume');

  try {
    const [, , data, versionsData] = await Promise.all([
      loadCSS(`/themes/${themeId}/screen.css`),
      loadCSS(`/themes/${themeId}/print.css`, 'print'),
      loadData(lang, version),
      fetch('/data/versions.json').then(r => r.json()).catch(() => ({ versions: [] }))
    ]);

    cachedVersions = versionsData.versions || [];
    const render = await loadTheme(themeId);
    cachedRender = render;

    applyRender(data, lang, version);

    if (loadingEl) loadingEl.style.display = 'none';

    // Expose for viewer.html controls to call without page reload
    window._liveryRerender = rerenderResume;

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
    if (loadingEl) loadingEl.style.display = 'none';
  }
}

init();
