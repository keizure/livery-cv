# 个人简历项目

通过 Web 界面维护简历内容和样式，使用 Chrome 浏览器导出为 PDF。

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

浏览器会自动打开 `http://localhost:5173`，你可以实时预览简历效果。

### 3. 修改简历内容

编辑 `src/resume.json` 文件，保存后浏览器会自动刷新显示最新内容。

### 4. 修改样式

- **屏幕显示样式**：编辑 `src/styles/screen.css`
- **PDF 打印样式**：编辑 `src/styles/print.css`

### 5. 导出 PDF

1. 在浏览器中按 `Cmd+P`（Mac）或 `Ctrl+P`（Windows）
2. 目标打印机选择 **"另存为 PDF"**
3. 确保以下设置：
   - 纸张尺寸：**A4**
   - 边距：**无**
   - 背景图形：**勾选**
4. 点击保存

## 项目结构

```
resume/
├── src/
│   ├── index.html           # HTML 模板
│   ├── resume.json          # 简历数据
│   ├── main.js              # 渲染逻辑
│   └── styles/
│       ├── screen.css       # 屏幕显示样式
│       └── print.css        # PDF 打印样式（控制 A4 尺寸）
├── package.json
└── README.md
```

## 技术栈

- **Vite**：开发服务器，支持热更新
- **原生 JavaScript**：无框架依赖，简单直接
- **CSS Print Media**：专门的打印样式，确保 PDF 输出质量

## 注意事项

### A4 尺寸保证

- 使用 `@page { size: A4; }` 声明页面尺寸
- 容器宽度固定为 `210mm`（A4 宽度）
- 使用 `mm` 或 `pt` 单位确保打印准确性

### 字体建议

- 默认使用系统字体栈，兼容中英文
- 打印时字体大小使用 `pt` 单位（10pt 正文，12pt 标题）

### 分页控制

- 使用 `page-break-inside: avoid` 避免内容被截断
- 重要章节添加 `page-break-after: always` 强制分页

## 常见问题

**Q: PDF 导出后字体太小/太大？**
A: 调整 `src/styles/print.css` 中的字体大小（使用 pt 单位）

**Q: 内容超过一页怎么办？**
A: 项目已配置自动分页，内容会自然分布到多页

**Q: 如何切换简历主题？**
A: 修改 `src/styles/screen.css` 和 `print.css` 中的颜色变量

**Q: 可以添加照片吗？**
A: 可以，在 `resume.json` 添加 `photo` 字段，在 `main.js` 中渲染即可
