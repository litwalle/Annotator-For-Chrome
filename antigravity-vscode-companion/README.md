# Annotator for Antigravity

**Antigravity Annotator** is a powerful productivity tool. It bridges the gap between your web browser and the **Antigravity** macOS desktop application, allowing you to capture, annotate, and instantly teleport screenshots and context directly into your Antigravity chat.

This is the companion extension for Antigravity. Because modern browsers restrict direct system-level execution, this extension runs a secure local background daemon inside Antigravity to handle the routing.

---

## 🚀 Quick Start Guide

To enable seamless image and text injection from your browser into the Antigravity app, please follow these steps:

### Step 1: Install the Chrome Extension First

> ⏳ **Note:** The Chrome extension is currently **under review** on the Chrome Web Store and is not yet publicly searchable.
> In the meantime, you can install it manually in under a minute using the steps below.

**Install manually via GitHub (available now):**
1. Visit the [GitHub repository](https://github.com/litwalle/Antigravity-Annotator-1.0) and download **`Annotator-Chrome-Extension-1.0.6.zip`** from the root of the repo.
2. **Unzip** the downloaded file to a local folder.
3. Open Chrome and go to `chrome://extensions/`
4. Enable **Developer Mode** (toggle in the top-right corner).
5. Click **"Load unpacked"** and select the unzipped folder.
6. **Pin** the Annotator icon to your Chrome toolbar for quick access.

**Install from Chrome Web Store (coming soon):**
Once the review is complete, you will be able to search for **"Annotator - for Chrome"** directly in the Chrome Web Store and install it with one click.

### Step 2: Install this Companion Extension in Antigravity
1. Open **Antigravity**.
2. Go to the Extensions Marketplace (or Open VSX Registry) and search for **"Annotator for Antigravity"**.
3. Click **Install**.
4. *(Optional but recommended)* Reload your Antigravity window to ensure the background local daemon starts correctly.

### Step 3: Start Annotating & Injecting!
The complete communication bridge is now established.
1. Navigate to any webpage in your Chrome browser.
2. Click the **Annotator** icon in your browser toolbar to take a full-page screenshot.
3. Use the built-in annotation tools to draw, highlight, comment, or write text.
4. **Make sure your IDE is running in the background**, so the local bridge is active.
5. In the browser annotator, click the **"Add to Antigravity"** button.
6. The extension will automatically wake up your **Antigravity desktop app**, bring it to the front, and inject the annotated screenshot and prompt right into your chat!

---

## ⚠️ Important Precautions & Usage Tips

* **macOS Only**: This specific routing mechanism relies on AppleScript (`tell application "Antigravity"`), which means it is designed specifically for macOS users running the Antigravity desktop client.
* **Keep Antigravity open**: The local receiver server (`http://localhost:3001`) only runs while Antigravity is open. If you quit Antigravity, the browser extension will temporarily lose its bridge.
* **Server Status**: If for any reason the connection drops, you can restart the local server manually:
  * Open the Command Palette in Antigravity (`Cmd+Shift+P`).
  * Type and execute: `Restart Annotator Server`.

---

**Enjoy a frictionless feedback loop and turbocharge your workflow in Antigravity!**
