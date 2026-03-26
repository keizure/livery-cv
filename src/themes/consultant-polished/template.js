/**
 * Consultant Polished Theme Template
 * Renders resume data into HTML structure
 */

// Language-specific labels
const labels = {
  zh: {
    summary: '个人简介',
    experience: '工作经历',
    projects: '项目经历',
    education: '教育背景',
    skills: '专业技能',
    viewProject: '查看项目',
    languages: '编程语言',
    frameworks: '框架/库',
    tools: '工具/平台',
    databases: '数据库'
  },
  en: {
    summary: 'Profile',
    experience: 'Experience',
    projects: 'Projects',
    education: 'Education',
    skills: 'Skills',
    viewProject: 'View Project',
    languages: 'Languages',
    frameworks: 'Frameworks',
    tools: 'Tools',
    databases: 'Databases'
  }
};

export function render(data, lang = 'zh') {
  const t = labels[lang] || labels.zh;
  return `
    <!-- 个人信息 -->
    <header class="header">
      <div class="header-main">
        <h1 class="name">${data.personalInfo.name}</h1>
        <p class="title">${data.personalInfo.title}</p>
      </div>
      <div class="contact-info">
        <span class="contact-item">${data.personalInfo.email}</span>
        <span class="contact-item">${data.personalInfo.phone}</span>
        <span class="contact-item">${data.personalInfo.location}</span>
        ${data.personalInfo.links.github ? `<a href="${data.personalInfo.links.github}" target="_blank" class="contact-link">GitHub</a>` : ''}
        ${data.personalInfo.links.linkedin ? `<a href="${data.personalInfo.links.linkedin}" target="_blank" class="contact-link">LinkedIn</a>` : ''}
      </div>
    </header>

    <!-- 个人简介 -->
    ${data.summary ? `
    <section class="section">
      <h2 class="section-title">${t.summary}</h2>
      <p class="summary">${data.summary}</p>
    </section>
    ` : ''}

    <!-- 工作经历 -->
    <section class="section">
      <h2 class="section-title">${t.experience}</h2>
      ${data.experience.map(exp => `
        <div class="experience-item">
          <div class="item-header">
            <h3 class="position">${exp.position}</h3>
            <div class="item-meta">
              <span class="date">${exp.startDate} - ${exp.endDate}</span>
            </div>
          </div>
          <p class="company-location">${exp.company} • ${exp.location}</p>
          ${exp.description ? `<div class="experience-description"><p>${exp.description}</p></div>` : ''}
          <ul class="highlights">
            ${exp.highlights.map(h => `<li>${h}</li>`).join('')}
          </ul>
        </div>
      `).join('')}
    </section>

    <!-- 项目经历 -->
    ${data.projects && data.projects.length > 0 ? `
    <section class="section">
      <h2 class="section-title">${t.projects}</h2>
      ${data.projects.map(proj => `
        <div class="project-item">
          <div class="item-header">
            <h3 class="project-name">${proj.name}</h3>
            <div class="item-meta">
              <span class="date">${proj.startDate} - ${proj.endDate}</span>
            </div>
          </div>
          ${proj.role ? `<p class="company-location">${proj.role}</p>` : ''}
          <p class="project-description">${proj.description}</p>
          <div class="tech-stack">
            ${proj.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
          </div>
          <ul class="highlights">
            ${proj.highlights.map(h => `<li>${h}</li>`).join('')}
          </ul>
        </div>
      `).join('')}
    </section>
    ` : ''}

    <!-- 教育背景 -->
    <section class="section">
      <h2 class="section-title">${t.education}</h2>
      ${data.education.map(edu => `
        <div class="education-item">
          <div class="item-header">
            <h3 class="school">${edu.school}</h3>
            <div class="item-meta">
              <span class="date">${edu.startDate} - ${edu.endDate}</span>
            </div>
          </div>
          <p class="degree">${edu.degree} · ${edu.major}</p>
        </div>
      `).join('')}
    </section>

    <!-- 技能 -->
    <section class="section">
      <h2 class="section-title">${t.skills}</h2>
      <div class="skills-grid">
        <div class="skill-category">
          <h3 class="skill-title">${t.languages}</h3>
          <div class="skill-content">${data.skills.languages.join(lang === 'zh' ? ' • ' : ' • ')}</div>
        </div>
        <div class="skill-category">
          <h3 class="skill-title">${t.frameworks}</h3>
          <div class="skill-content">${data.skills.frameworks.join(lang === 'zh' ? ' • ' : ' • ')}</div>
        </div>
        <div class="skill-category">
          <h3 class="skill-title">${t.tools}</h3>
          <div class="skill-content">${data.skills.tools.join(lang === 'zh' ? ' • ' : ' • ')}</div>
        </div>
        <div class="skill-category">
          <h3 class="skill-title">${t.databases}</h3>
          <div class="skill-content">${data.skills.databases.join(lang === 'zh' ? ' • ' : ' • ')}</div>
        </div>
      </div>
    </section>
  `;
}
