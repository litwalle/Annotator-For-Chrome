// annotator-extension/background.js

// 正在等待 CONTENT_READY 的 tab，避免注入后立刻发消息的时序问题
const pendingTabs = new Map(); // tabId → { tab, timer }

chrome.action.onClicked.addListener((tab) => {
  if (!tab || !tab.id) return;

  // 首先尝试探测 content script 是否存活
  chrome.tabs.sendMessage(tab.id, { action: "PING" }, (response) => {
    if (chrome.runtime.lastError || !response || response.action !== "PONG") {
      console.log("Content script not responding, injecting...");
      injectAndInit(tab);
    } else {
      console.log("Content script alive, checking if annotator is open...");
      // 如果标注器已打开，忽略此次点击（避免截到自己然后重新打开）
      if (response.isOpen) {
        console.log("Annotator already open, ignoring click.");
        return;
      }
      captureAndSend(tab);
    }
  });
});

function injectAndInit(tab) {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["content.js"]
  }).then(() => {
    // 等待 content script 发来 CONTENT_READY，而不是立刻截图
    // 同时设置 500ms 超时保险，防止信号丢失
    const timer = setTimeout(() => {
      if (pendingTabs.has(tab.id)) {
        pendingTabs.delete(tab.id);
        console.log("CONTENT_READY timeout, falling back to direct capture");
        captureAndSend(tab);
      }
    }, 500);
    pendingTabs.set(tab.id, { tab, timer });
  }).catch(err => {
    console.error("Failed to inject script:", err);
  });
}

function captureAndSend(tab) {
  chrome.tabs.captureVisibleTab(tab.windowId, { format: "png" }, (dataUrl) => {
    if (chrome.runtime.lastError) {
      console.error("Capture failed:", chrome.runtime.lastError.message);
      return;
    }
    // 不传 callback：content script 不会调用 sendResponse，传 callback 反而触发 Chrome 的 "port closed" 假报错
    chrome.tabs.sendMessage(tab.id, {
      action: "INIT_ANNOTATOR",
      image: dataUrl
    });
  });
}

// 统一监听 content script 发来的所有消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'CONTENT_READY') {
    const tabId = sender.tab?.id;
    if (tabId && pendingTabs.has(tabId)) {
      const { tab, timer } = pendingTabs.get(tabId);
      clearTimeout(timer);
      pendingTabs.delete(tabId);
      console.log("Content script ready, capturing...");
      captureAndSend(tab);
    }
    return;
  }

  if (request.action === 'SEND_TO_IDE') {
    // 方案 1: Deep Link. 扩展只负责接收前台的发起请求(如果需要跨权限剪贴板，可以在这里做，
    // 但是在这个场景下，前台 Content Script 可以直接操作 clipboard && window.open)
    // 所以这里直接返回成功即可，如果未来有额外后台处理，可加这里
    sendResponse({ success: true });
    return false;
  }

  if (request.action === 'TRIGGER_LOCAL_DAEMON') {
    fetch('http://localhost:3001/api/send-screenshot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ source: 'extension', url: request.url, includePrompt: request.includePrompt !== false }),
    })
      .then(resp => {
        if (!resp.ok) throw new Error('Daemon returned error');
        sendResponse({ success: true });
      })
      .catch(err => {
        console.warn("Daemon fetch failed", err);
        sendResponse({ success: false, error: err.message });
      });
    return true; // Keep message channel open for async response
  }
});
