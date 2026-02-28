# 简历项目技术方案

## 核心需求

1. **Web 界面编辑** → 实时预览
2. **Chrome 打印/导出 PDF** → A4 尺寸标准输出
3. **内容与样式分离** → 方便修改

---

## 方案 A：HTML + CSS + Print Media Queries（推荐）

**技术栈：**
- 静态 HTML 或简单的前端框架（React/Vue）
- CSS 打印样式（`@media print`）
- 本地开发服务器（Vite/Parcel）

**优势：**
- ✅ 简单直接，易于维护
- ✅ 完全控制 PDF 输出样式
- ✅ 使用 Chrome 的 "打印为 PDF" 功能
- ✅ 可以用 JSON/YAML 存储简历数据，模板渲染内容

**A4 尺寸保证：**
```css
@page {
  size: A4;
  margin: 0;
}

@media print {
  body {
    width: 210mm;
    height: 297mm;
  }
}
```

**内容管理：**
```javascript
// resume-data.json
{
  "name": "梁金润",
  "title": "软件工程师",
  "sections": [...]
}
```

**项目结构：**
```
resume/
├── data/
│   └── resume.json          # 简历内容数据
├── src/
│   ├── index.html
│   ├── styles/
│   │   ├── screen.css       # 屏幕显示样式
│   │   └── print.css        # PDF 打印样式
│   └── main.js              # 渲染逻辑
├── dist/                    # 构建输出
└── package.json
```

**工作流程：**
1. 修改 `resume.json` → 更新内容
2. 修改 `print.css` → 调整样式
3. 运行 `npm run dev` → 浏览器实时预览
4. 按 `Cmd+P` → 选择 "另存为 PDF"

**关键点：**
- 使用 CSS Grid/Flexbox 精确布局
- `@page` 规则控制 A4 尺寸
- 使用 `mm` 或 `pt` 单位确保打印准确
- 分页控制：`page-break-after`, `page-break-inside: avoid`

---

## 方案 B：Markdown + CSS（适合技术简历）

**技术栈：**
- Markdown 编写内容
- 自定义 CSS 主题
- Marked.js 或类似库渲染
- Chrome PDF 导出

**优势：**
- ✅ Markdown 编辑简历内容非常快
- ✅ 样式与内容完全分离
- ✅ 版本控制友好

**项目结构：**
```
resume/
├── content/
│   └── resume.md            # Markdown 格式简历
├── templates/
│   └── resume.html          # HTML 模板
├── styles/
│   ├── markdown.css         # Markdown 渲染样式
│   └── print.css            # 打印样式
└── build.js                 # 构建脚本
```

**工作流程：**
1. 编辑 `resume.md` Markdown 文件
2. 运行构建脚本生成 HTML
3. 浏览器打开预览
4. Chrome 打印为 PDF

---

## 方案 C：React + Tailwind + Puppeteer（自动化）

**技术栈：**
- React 组件化简历
- Tailwind CSS 快速样式
- Puppeteer 自动生成 PDF
- Vite 开发服务器

**优势：**
- ✅ 组件化，可复用
- ✅ 可以命令行生成 PDF
- ✅ CI/CD 自动化构建
- ✅ 支持多主题切换

**项目结构：**
```
resume/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Section.jsx
│   │   └── Experience.jsx
│   ├── data/
│   │   └── resume.json
│   ├── App.jsx
│   └── main.jsx
├── scripts/
│   └── generate-pdf.js      # Puppeteer 生成脚本
└── package.json
```

**PDF 生成示例：**
```javascript
const puppeteer = require('puppeteer');

async function generatePDF() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });

  await page.pdf({
    path: 'resume.pdf',
    format: 'A4',
    printBackground: true,
    margin: {
      top: '10mm',
      bottom: '10mm',
      left: '10mm',
      right: '10mm'
    }
  });

  await browser.close();
}
```

**命令：**
```bash
npm run dev          # 开发预览
npm run build        # 构建生产版本
npm run pdf          # 自动生成 PDF
```

---

## 方案对比

| 特性 | 方案 A | 方案 B | 方案 C |
|------|--------|--------|--------|
| 复杂度 | 低 | 中 | 高 |
| 学习曲线 | 平缓 | 平缓 | 陡峭 |
| 样式控制 | 精确 | 中等 | 精确 |
| 自动化 | 手动 | 半自动 | 全自动 |
| 维护成本 | 低 | 低 | 中 |
| 适用场景 | 快速搭建 | 技术简历 | 企业级/多版本 |

---

## 推荐选择

- **快速上手，个人使用** → 方案 A
- **喜欢 Markdown** → 方案 B
- **需要自动化、多主题** → 方案 C
