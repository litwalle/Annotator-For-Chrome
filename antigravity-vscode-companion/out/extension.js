"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = require("vscode");
const http = require("http");
const child_process_1 = require("child_process");
let server;
const PORT = 3001;
function activate(context) {
    console.log('Antigravity Companion is now active!');
    startServer();
    let disposable = vscode.commands.registerCommand('annotator-for-vscode.restartServer', () => {
        startServer();
        vscode.window.showInformationMessage('Antigravity Companion Server restarted!');
    });
    context.subscriptions.push(disposable);
}
function startServer() {
    if (server) {
        server.close();
    }
    server = http.createServer((req, res) => {
        // Handle CORS
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        if (req.method === 'OPTIONS') {
            res.writeHead(200);
            res.end();
            return;
        }
        if (req.method === 'POST' && req.url === '/api/send-screenshot') {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                try {
                    const payload = JSON.parse(body);
                    const includePrompt = payload.includePrompt !== false; // defaults to true if missing
                    // We use AppleScript to forcefully bring Antigravity to the front,
                    // paste the image, then conditionally replace the clipboard with text
                    // and paste again, depending on includePrompt flag
                    let script = `
tell application "Antigravity" to activate
delay 0.3
tell application "System Events"
    keystroke "v" using command down
end tell
`;
                    if (includePrompt) {
                        const textPrompt = `Please modify based on the information in the screenshot.`;
                        script += `
set the clipboard to "${textPrompt}"
delay 0.1
tell application "System Events"
    keystroke "v" using command down
end tell
`;
                    }
                    const escapedScript = script.trim().split('\\n').map(line => `-e '${line}'`).join(' ');
                    (0, child_process_1.exec)(`osascript ${escapedScript}`, (error, stdout, stderr) => {
                        if (error) {
                            console.error('AppleScript error:', error);
                            res.writeHead(500, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify({ status: 'error', message: error.message }));
                            return;
                        }
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ status: 'success' }));
                    });
                }
                catch (e) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ status: 'error', message: e.message || String(e) }));
                }
            });
        }
        else {
            res.writeHead(404);
            res.end();
        }
    });
    server.listen(PORT, '127.0.0.1', () => {
        console.log(`Antigravity Companion server listening on port ${PORT}`);
    });
    server.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.error(`Port ${PORT} is already in use.`);
            vscode.window.showErrorMessage(`Antigravity Companion: Port ${PORT} is already in use.`);
        }
        else {
            console.error('Server error:', err);
        }
    });
}
function deactivate() {
    if (server) {
        server.close();
    }
}
//# sourceMappingURL=extension.js.map