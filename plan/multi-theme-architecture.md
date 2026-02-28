# 多主题多语言简历系统架构设计

## 需求

1. **多个样式主题** - 同一份简历内容，不同的视觉风格
2. **中英文双语** - 同一份简历，两种语言版本
3. **内容与样式分离** - 内容变化时，所有主题都能同步更新
4. **批量导出 PDF** - 一键生成所有语言×主题组合的 PDF

## 项目架构

```
resume/
├── data/
│   ├── resume.zh.json          # 中文简历数据
│   └── resume.en.json          # 英文简历数据
│
├── src/
│   ├── index.html              # 主入口（选择语言和主题）
│   ├── viewer.html             # 简历查看器（通过URL参数加载）
│   ├── main.js                 # 核心加载逻辑
│   │
│   └── themes/                 # 主题目录
│       ├── themes.json         # 主题元数据配置
│       │
│       ├── consultant-polished/
│       │   ├── template.js     # HTML 结构渲染函数
│       │   ├── screen.css      # 屏幕显示样式
│       │   └── print.css       # PDF 打印样式
│       │
│       ├── modern-minimal/     # 未来的主题2
│       │   ├── template.js
│       │   ├── screen.css
│       │   └── print.css
│       │
│       └── classic/            # 未来的主题3
│           ├── template.js
│           ├── screen.css
│           └── print.css
│
├── scripts/
│   └── export-all.js           # 批量导出 PDF 脚本（使用 Puppeteer）
│
├── dist/                       # 构建输出目录
│   ├── zh-consultant-polished.pdf
│   ├── en-consultant-polished.pdf
│   ├── zh-modern-minimal.pdf
│   └── en-modern-minimal.pdf
│
└── vite.config.js
```

## 数据层设计

### 数据结构（中英文完全一致）

```json
{
  "personalInfo": {
    "name": "姓名 / Name",
    "title": "职位 / Title",
    "email": "email@example.com",
    "phone": "138-xxxx-xxxx",
    "location": "城市 / City",
    "links": {
      "github": "https://github.com/username",
      "linkedin": "https://linkedin.com/in/username"
    }
  },
  "summary": "个人简介...",
  "experience": [
    {
      "position": "职位",
      "company": "公司名称",
      "location": "城市",
      "startDate": "2020-01",
      "endDate": "至今",
      "highlights": [
        "成就1",
        "成就2"
      ]
    }
  ],
  "projects": [...],
  "education": [...],
  "skills": {
    "languages": ["JavaScript", "Python"],
    "frameworks": ["React", "Vue"],
    "tools": ["Git", "Docker"],
    "databases": ["MySQL", "MongoDB"]
  }
}
```

## 主题系统设计

### themes.json 主题元数据

```json
{
  "themes": [
    {
      "id": "consultant-polished",
      "name": "Consultant Polished",
      "description": "专业咨询风格，适合传统行业",
      "preview": "/previews/consultant-polished.png"
    },
    {
      "id": "modern-minimal",
      "name": "Modern Minimal",
      "description": "现代简约风格，适合科技行业",
      "preview": "/previews/modern-minimal.png"
    }
  ]
}
```

### template.js 渲染函数

每个主题的 `template.js` 导出一个渲染函数：

```javascript
export function render(data) {
  return `
    <header class="header">
      <h1>${data.personalInfo.name}</h1>
      <p>${data.personalInfo.title}</p>
      ...
    </header>
    <section class="experience">
      ...
    </section>
  `;
}
```

## 核心逻辑

### main.js 加载流程

1. 解析 URL 参数：`?lang=zh&theme=consultant-polished`
2. 加载对应的数据文件：`../data/resume.zh.json`
3. 动态导入主题模板：`./themes/consultant-polished/template.js`
4. 动态加载主题样式：
   - `./themes/consultant-polished/screen.css`
   - `./themes/consultant-polished/print.css`
5. 调用模板的 `render()` 函数生成 HTML
6. 插入到页面容器中

### 伪代码

```javascript
// main.js
const params = new URLSearchParams(window.location.search);
const lang = params.get('lang') || 'zh';
const theme = params.get('theme') || 'consultant-polished';

// 加载数据
const data = await fetch(`/data/resume.${lang}.json`).then(r => r.json());

// 加载主题
const { render } = await import(`./themes/${theme}/template.js`);

// 加载样式
loadCSS(`/themes/${theme}/screen.css`);
loadCSS(`/themes/${theme}/print.css`, 'print');

// 渲染
document.getElementById('resume').innerHTML = render(data);
```

## 用户交互流程

### 开发模式

1. 运行 `npm run dev`
2. 访问 `http://localhost:5173/`
3. 看到主题选择界面：
   - 语言选择：中文 / English
   - 主题选择：卡片式展示所有主题（带预览图）
4. 点击某个组合 → 跳转到 `viewer.html?lang=zh&theme=consultant-polished`
5. 查看效果，按 `Cmd+P` 可手动导出 PDF

### 批量导出

```bash
npm run export-all
```

脚本自动完成：
1. 读取 `themes.json` 获取所有主题
2. 遍历语言 × 主题组合
3. 使用 Puppeteer 打开每个组合的 URL
4. 生成 PDF 到 `dist/` 目录
5. 输出统计信息

## 批量导出实现（Puppeteer）

### scripts/export-all.js

```javascript
import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const LANGUAGES = ['zh', 'en'];
const OUTPUT_DIR = './dist';

async function exportAll() {
  const themes = JSON.parse(fs.readFileSync('./src/themes/themes.json'));
  const browser = await puppeteer.launch();

  for (const lang of LANGUAGES) {
    for (const theme of themes.themes) {
      const url = `http://localhost:5173/viewer.html?lang=${lang}&theme=${theme.id}`;
      const outputPath = path.join(OUTPUT_DIR, `${lang}-${theme.id}.pdf`);

      const page = await browser.newPage();
      await page.goto(url, { waitUntil: 'networkidle0' });

      await page.pdf({
        path: outputPath,
        format: 'A4',
        printBackground: true,
        margin: { top: 0, bottom: 0, left: 0, right: 0 }
      });

      console.log(`✓ Generated: ${outputPath}`);
      await page.close();
    }
  }

  await browser.close();
  console.log('All PDFs generated successfully!');
}

exportAll();
```

## 迁移计划

### Phase 1: 重构现有代码
1. 创建目录结构
2. 移动 `consultant-polished` 主题文件
3. 提取渲染逻辑到 `template.js`
4. 创建 `themes.json`

### Phase 2: 多语言支持
1. 创建 `resume.zh.json`（当前数据）
2. 创建 `resume.en.json`（英文翻译）
3. 修改 `main.js` 支持语言参数

### Phase 3: 主题选择界面
1. 创建 `index.html` 主页
2. 展示所有主题卡片
3. 语言切换按钮
4. 主题预览功能

### Phase 4: 批量导出
1. 安装 Puppeteer
2. 编写 `export-all.js` 脚本
3. 添加 npm 命令
4. 测试所有组合

## 扩展性

### 添加新主题
1. 在 `src/themes/` 创建新目录
2. 添加 `template.js`, `screen.css`, `print.css`
3. 在 `themes.json` 注册主题
4. 系统自动识别并支持

### 添加新语言
1. 在 `data/` 创建 `resume.{lang}.json`
2. 修改 `LANGUAGES` 常量
3. 自动支持新语言

## 技术栈

- **Vite**: 开发服务器 + 构建工具
- **Vanilla JavaScript**: 无框架依赖
- **Puppeteer**: 自动化 PDF 导出
- **CSS Modules**: 主题样式隔离

## 优势

1. ✅ **完全解耦**: 内容、结构、样式完全分离
2. ✅ **易于扩展**: 添加主题/语言无需修改核心代码
3. ✅ **批量导出**: 一键生成所有组合
4. ✅ **灵活预览**: URL 参数控制，易于分享
5. ✅ **维护简单**: 每个主题独立，互不影响
