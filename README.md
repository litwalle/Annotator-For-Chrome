# Antigravity Annotator

> A Chrome extension for capturing, annotating, and sharing webpage screenshots with your IDE.

![Chrome Extension](https://img.shields.io/badge/Platform-Chrome%20Extension-4285F4?logo=googlechrome&logoColor=white)
![Manifest V3](https://img.shields.io/badge/Manifest-V3-34A853)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-yellow)

## Overview

Antigravity Annotator is a browser extension that lets you capture a full screenshot of the current webpage, annotate it with drawing tools, highlights, comments, and text, then send the result directly to your IDE. Built for designers and developers who need a fast feedback loop between the browser and their development environment.

## Features

- **Screenshot Capture** — One-click capture of the visible webpage
- **Freehand Drawing** — Draw freely with customizable neon colors
- **Rectangle Highlight** — Highlight areas with semi-transparent dashed rectangles
- **Comments** — Create comment boxes with pointer lines for contextual feedback
- **Text Annotations** — Place text directly on the screenshot
- **Send to IDE** — Push annotated screenshots to a local API endpoint for IDE integration
- **Keyboard Shortcuts** — Full shortcut support for fast workflows
- **Retina Support** — Full-resolution rendering on high-DPI displays
- **Isolated Rendering** — Shadow DOM ensures zero style conflicts with the host page

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

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| UI Framework | React 19, TypeScript 5.9 |
| Styling | Tailwind CSS 4, Radix UI, Lucide Icons |
| Build Tool | Vite 7 |
| Extension | Chrome Manifest V3, Shadow DOM, Canvas API |

## Project Structure

```
├── annotator-extension/    # Packaged Chrome extension (ready to install)
│   ├── manifest.json       # Extension manifest (V3)
│   ├── background.js       # Service worker for screenshot capture
│   ├── content.js          # Compiled content script (React app)
│   ├── content.css         # Content script styles
│   └── icons/              # Extension icons
└── annotator-react/        # React source code
    ├── src/
    │   ├── AnnotatorApp.tsx    # Main annotation UI component
    │   ├── content.tsx         # Content script entry point
    │   └── components/ui/      # Reusable UI components
    ├── vite.config.ts
    ├── package.json
    └── tsconfig.json
```

## Installation

### From Source

1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/antigravity-annotator.git
   ```

2. Build the React content script:
   ```bash
   cd annotator-react
   npm install
   npm run build
   ```

3. Load the extension in Chrome:
   - Navigate to `chrome://extensions/`
   - Enable **Developer mode**
   - Click **Load unpacked**
   - Select the `annotator-extension/` directory

### Pre-built

1. Download or clone this repository
2. Open `chrome://extensions/` and enable **Developer mode**
3. Click **Load unpacked** and select the `annotator-extension/` directory

## Usage

1. Navigate to any webpage you want to annotate
2. Click the **Antigravity Annotator** icon in the Chrome toolbar
3. The annotator overlay will appear with a screenshot of the current page
4. Use the toolbar to select drawing tools and colors
5. Annotate the screenshot as needed
6. Click **Send** to push the annotated image to your IDE

> The extension sends annotated images to `http://localhost:3001/api/screenshot`. Make sure the receiving server is running in your IDE environment.

## Development

```bash
cd annotator-react

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Lint
npm run lint
```

After building, the compiled output is placed in `annotator-extension/` and can be loaded directly as an unpacked Chrome extension.

## License

MIT
