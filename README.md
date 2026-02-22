# Antigravity Annotator

> A Chrome extension for capturing, annotating, and sharing webpage screenshots with Antigravity.

![Chrome Extension](https://img.shields.io/badge/Platform-Chrome%20Extension-4285F4?logo=googlechrome&logoColor=white)
![Manifest V3](https://img.shields.io/badge/Manifest-V3-34A853)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-yellow)

## Overview

Antigravity Annotator is a browser extension that lets you capture a full screenshot of the current webpage, annotate it with drawing tools, highlights, comments, and text, then inject the result directly into **Antigravity** for AI-assisted development. Built for developers who need a fast feedback loop between the browser and Antigravity.

---

## 📦 Download & Installation

### Step 1 — Install the Chrome Extension

You can install the Chrome extension in two ways:

#### Option A: Direct Download (Recommended for most users)

1. **Download** the latest pre-built package from this repository:
   👉 [`Annotator-Chrome-Extension-1.0.6.zip`](./Annotator-Chrome-Extension-1.0.6.zip)

2. **Unzip** the downloaded file to a folder on your computer.

3. Open Chrome and go to `chrome://extensions/`

4. Enable **Developer Mode** by toggling the switch in the top-right corner.

5. Click **"Load unpacked"** and select the unzipped folder.

6. The **Annotator** icon will appear in your Chrome toolbar. Pin it for easy access.

#### Option B: From Source

```bash
git clone https://github.com/litwalle/Antigravity-Annotator-1.0.git
cd annotator-react
npm install
npm run build
```

Then load the `annotator-extension/` folder via **Load unpacked** as described above.

---

### Step 2 — Install the Antigravity Companion Extension

To enable image injection from the browser into Antigravity, you also need to install the companion extension inside **Antigravity**.

✅ **This extension is now available on the VS Code Marketplace:**

> Search for **"Annotator for Antigravity"** in Antigravity's Extensions panel, or install it directly from the [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=litwalle.antigravity).

1. Open **Antigravity**.
2. Go to the **Extensions** panel (`Cmd+Shift+X`).
3. Search for **`Annotator for Antigravity`**.
4. Click **Install**.
5. *(Optional)* Reload the Antigravity window to ensure the local bridge server starts correctly.

---

## Features

- **Screenshot Capture** — One-click capture of the visible webpage
- **Crop Tool** — Crop the screenshot to focus on specific areas
- **Freehand Drawing** — Draw freely with customizable neon colors
- **Highlight** — Highlight areas with semi-transparent rectangles
- **Comments** — Create comment boxes with pointer lines for contextual feedback
- **Text Annotations** — Place text directly on the screenshot
- **Image & Prompt Integration** — Seamlessly copy annotated images and generated context prompts
- **Send to Antigravity** — Push annotated screenshots directly into Antigravity chat
- **Keyboard Shortcuts** — Full shortcut support for fast workflows
- **Retina Support** — Full-resolution rendering on high-DPI displays
- **Isolated Rendering** — Shadow DOM ensures zero style conflicts with the host page

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `P` | Freehand drawing tool |
| `H` | Rectangle highlight tool |
| `C` | Comment tool |
| `T` | Text tool |
| `⌘Z` / `Ctrl+Z` | Undo |
| `Escape` | Close annotator |

## Color Palette

8 neon colors available: Fluorescent Yellow, Green, Cyan, Blue, Purple, Pink, Red, and Orange.

---

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| UI Framework | React 19, TypeScript 5.9 |
| Styling | Tailwind CSS 4, Radix UI, Lucide Icons |
| Build Tool | Vite 7 |
| Extension | Chrome Manifest V3, Shadow DOM, Canvas API |

---

## Project Structure

```
├── Annotator-Chrome-Extension-1.0.6.zip   # Pre-built Chrome extension (ready to install)
├── annotator-extension/    # Chrome extension source files
│   ├── manifest.json       # Extension manifest (V3)
│   ├── background.js       # Service worker for screenshot capture
│   ├── content.js          # Compiled content script (React app)
│   ├── content.css         # Content script styles
│   └── icons/              # Extension icons
├── annotator-react/        # React source code
│   ├── src/
│   │   ├── AnnotatorApp.tsx    # Main annotation UI component
│   │   ├── content.tsx         # Content script entry point
│   │   └── components/ui/      # Reusable UI components
│   ├── vite.config.ts
│   ├── package.json
│   └── tsconfig.json
└── antigravity-vscode-companion/   # Antigravity companion extension source
```

---

## Development

```bash
cd annotator-react

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

After building, the compiled output is placed in `annotator-extension/` and can be loaded directly as an unpacked Chrome extension.

---

## License

MIT
