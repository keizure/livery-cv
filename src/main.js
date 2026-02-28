// 加载简历数据并渲染
async function loadResume() {
  try {
    const response = await fetch('/resume.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    renderResume(data);
  } catch (error) {
    console.error('加载简历数据失败:', error);
    document.getElementById('resume').innerHTML = `
      <div style="padding: 20px; color: red;">
        <h2>加载失败</h2>
        <p>无法加载简历数据: ${error.message}</p>
      </div>
    `;
  }
}

function renderResume(data) {
  const container = document.getElementById('resume');

  container.innerHTML = `
    <!-- 个人信息 -->
    <header class="header">
      <div class="header-main">
        <h1 class="name">${data.personalInfo.name}</h1>
        <p class="title">${data.personalInfo.title}</p>
      </div>
      <div class="contact-info">
        <div class="contact-item">${data.personalInfo.email}</div>
        <div class="contact-item">${data.personalInfo.phone}</div>
        <div class="contact-item">${data.personalInfo.location}</div>
      </div>
      <div class="links">
        ${data.personalInfo.links.github ? `<a href="${data.personalInfo.links.github}" target="_blank">GitHub</a>` : ''}
        ${data.personalInfo.links.linkedin ? `<a href="${data.personalInfo.links.linkedin}" target="_blank">LinkedIn</a>` : ''}
      </div>
    </header>

    <!-- 个人简介 -->
    ${data.summary ? `
    <section class="section">
      <h2 class="section-title">个人简介</h2>
      <p class="summary">${data.summary}</p>
    </section>
    ` : ''}

    <!-- 工作经历 -->
    <section class="section">
      <h2 class="section-title">工作经历</h2>
      ${data.experience.map(exp => `
        <div class="experience-item">
          <div class="item-header">
            <h3 class="position">${exp.position}</h3>
            <div class="item-meta">
              <span class="date">${exp.startDate} - ${exp.endDate}</span>
            </div>
          </div>
          <p class="company-location">${exp.company} • ${exp.location}</p>
          <ul class="highlights">
            ${exp.highlights.map(h => `<li>${h}</li>`).join('')}
          </ul>
        </div>
      `).join('')}
    </section>

    <!-- 项目经历 -->
    ${data.projects && data.projects.length > 0 ? `
    <section class="section">
      <h2 class="section-title">项目经历</h2>
      ${data.projects.map(proj => `
        <div class="project-item">
          <div class="item-header">
            <h3 class="project-name">${proj.name}</h3>
            ${proj.link ? `<a href="${proj.link}" target="_blank" class="project-link">查看项目</a>` : ''}
          </div>
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
      <h2 class="section-title">教育背景</h2>
      ${data.education.map(edu => `
        <div class="education-item">
          <div class="item-header">
            <h3 class="school">${edu.school}</h3>
            <div class="item-meta">
              <span class="date">${edu.startDate} - ${edu.endDate}</span>
              ${edu.gpa ? `<span class="gpa">GPA: ${edu.gpa}</span>` : ''}
            </div>
          </div>
          <p class="degree">${edu.degree} · ${edu.major}</p>
        </div>
      `).join('')}
    </section>

    <!-- 技能 -->
    <section class="section">
      <h2 class="section-title">专业技能</h2>
      <div class="skills-grid">
        <div class="skill-category">
          <strong>编程语言：</strong>
          <span>${data.skills.languages.join('、')}</span>
        </div>
        <div class="skill-category">
          <strong>框架/库：</strong>
          <span>${data.skills.frameworks.join('、')}</span>
        </div>
        <div class="skill-category">
          <strong>工具/平台：</strong>
          <span>${data.skills.tools.join('、')}</span>
        </div>
        <div class="skill-category">
          <strong>数据库：</strong>
          <span>${data.skills.databases.join('、')}</span>
        </div>
      </div>
    </section>
  `;
}

// 页面加载时渲染简历
loadResume();
