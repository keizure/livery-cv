# 多主题多语言简历生成器

支持多种视觉主题和中英双语的现代化简历系统。通过 Web 界面预览和选择，一键导出高质量 PDF。

## ✨ 特性

- 🎨 **多主题支持** - 同一份内容，多种视觉风格
- 🌍 **中英双语** - 自动切换语言和本地化标签
- 🔄 **内容分离** - 数据与样式完全解耦，易于维护
- 📱 **实时预览** - 热更新，所见即所得
- 📄 **PDF 导出** - Chrome 打印，完美 A4 尺寸

## 🚀 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

浏览器自动打开 `http://localhost:5173`，你会看到主题选择器界面。

### 3. 选择语言和主题

- 点击顶部的 **中文** 或 **English** 按钮切换语言
- 选择喜欢的主题卡片，点击 **查看简历** 预览效果

### 4. 修改简历内容

编辑对应语言的数据文件：
- 中文：`src/data/resume.zh.json`
- 英文：`src/data/resume.en.json`

保存后浏览器自动刷新显示最新内容。

### 5. 导出 PDF

在简历预览页面：
1. 按 `Cmd+P`（Mac）或 `Ctrl+P`（Windows）
2. 目标打印机选择 **"另存为 PDF"**
3. 设置：
   - 纸张尺寸：**A4**
   - 边距：**无**
   - 背景图形：**勾选**
4. 保存到本地

## 📁 项目结构

```
resume/
├── src/
│   ├── index.html              # 主题选择器首页
│   ├── viewer.html             # 简历查看器
│   ├── main.js                 # 核心加载逻辑
│   │
│   ├── data/                   # 简历数据（多语言）
│   │   ├── resume.zh.json      # 中文简历
│   │   └── resume.en.json      # 英文简历
│   │
│   └── themes/                 # 主题目录
│       ├── themes.json         # 主题元数据
│       │
│       └── consultant-polished/ # 主题实现
│           ├── template.js     # HTML 结构渲染
│           ├── screen.css      # 屏幕样式
│           └── print.css       # 打印样式
│
├── scripts/                    # 工具脚本（未来：批量导出）
├── vite.config.js
└── package.json
```

## 🎨 如何添加新主题

1. 在 `src/themes/` 创建新目录，例如 `modern-minimal/`
2. 添加三个文件：
   - `template.js` - 导出 `render(data, lang)` 函数
   - `screen.css` - 屏幕显示样式
   - `print.css` - PDF 打印样式
3. 在 `src/themes/themes.json` 注册新主题：

```json
{
  "themes": [
    {
      "id": "modern-minimal",
      "name": "Modern Minimal",
      "description": "现代简约风格，适合科技行业",
      "preview": "/previews/modern-minimal.png"
    }
  ]
}
```

系统会自动识别并在首页展示新主题。

## 🌍 如何添加新语言

1. 在 `src/data/` 创建新语言文件，例如 `resume.ja.json`（日语）
2. 在主题的 `template.js` 中添加对应语言标签：

```javascript
const labels = {
  zh: { summary: '个人简介', ... },
  en: { summary: 'Summary', ... },
  ja: { summary: '要約', ... }  // 新增
};
```

3. 在 `src/index.html` 添加语言切换按钮

## 🛠 技术栈

- **Vite** - 开发服务器，快速热更新
- **Vanilla JavaScript** - 无框架依赖，纯净轻量
- **CSS Print Media** - 原生打印样式，完美 A4 输出
- **ES Modules** - 现代模块化，动态加载主题

## 📐 设计理念

### 1. 内容与样式分离
- 简历数据（JSON）与主题（HTML/CSS）完全解耦
- 修改内容时，所有主题自动更新
- 修改主题时，不影响数据完整性

### 2. 主题独立性
- 每个主题是独立的模块
- 主题之间互不干扰
- 易于开发、测试和维护

### 3. 语言本地化
- UI 标签根据语言自动切换
- 支持不同语言的排版规则（如中文的顿号"、"和英文逗号","）

## 🎯 URL 参数说明

访问 `viewer.html` 时可以通过 URL 参数控制：

```
http://localhost:5173/viewer.html?lang=zh&theme=consultant-polished
```

- `lang` - 语言代码（`zh`/`en`）
- `theme` - 主题 ID（参考 `themes.json`）

方便分享特定语言和主题的简历链接。

## 📝 数据文件格式

简历数据遵循统一的 JSON 结构，中英文字段名称一致：

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
  "summary": "个人简介 / Summary",
  "experience": [...],
  "projects": [...],
  "education": [...],
  "skills": {...}
}
```

## 🔮 路线图

- [x] Phase 1: 重构为多主题架构
- [x] Phase 2: 支持中英双语
- [x] Phase 3: 主题选择器界面
- [ ] Phase 4: 批量导出 PDF（Puppeteer）
- [ ] Phase 5: 更多主题（Modern Minimal, Classic 等）
- [ ] Phase 6: 在线主题编辑器

## 🎨 灵感来源

### 英文简历主题
- [Consultant Polished](https://registry.jsonresume.org/thomasdavis?theme=consultant-polished)
- [Minimalist Grid](https://registry.jsonresume.org/thomasdavis?theme=minimalist-grid)

### 中文简历参考
- 待收集优秀案例

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

**提示**：这个项目使用纯 Web 技术构建，无需任何服务端支持。你可以将 `dist/` 目录部署到任何静态托管服务（Vercel、Netlify、GitHub Pages 等）。
