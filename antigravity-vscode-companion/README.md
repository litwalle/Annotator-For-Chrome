# Annotator - for VS Code

This is the companion extension for the **Annotator - for Chrome** browser extension. It enables seamless image and text injection from your browser directly into your IDE.

## 快速上手指南 (Quick Start)

为了让截图和标注能正确发送到当前打开的 VS Code 窗口中，你需要同时安装并启用浏览器端和 IDE 端的两个插件。具体步骤如下：

1. **第一步：安装 Chrome 扩展**
   在 Chrome 浏览器中安装并固定 "Annotator - for Chrome" 扩展。

2. **第二步：安装 VS Code 插件**
   在 VS Code 插件市场搜索并安装 `"Annotator - for VS Code"` (包名为 `annotator-for-vscode`)。

3. **第三步：开始通信**
   **只有当上述两端插件都安装并启用后，完整的通信链路才会建立。**
   
   使用方法：在浏览器扩展里截取网页、框选或输入文字后，点击 "Add to Antigravity"（或发送按钮）。屏幕截图和对应的内容会被通过本地网桥（端口 3001）自动注入到你当前在 VS Code 里打开、且光标所在的文件中。

> **提示:** 你可以通过 VS Code 命令面板 (Cmd+Shift+P / Ctrl+Shift+P) 搜索 `Restart Annotator Server` 来手动重启本地通信服务。
