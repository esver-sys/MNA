// 使用DOM监听模式等待#ask_new元素出现
const waitForElement = () => {
  // 查找id为ask_new的元素
  const modules = document.querySelector('[id="app"]');
  if (modules) {
    // 清除定时器
    clearInterval(checkInterval);
    
    modules.style.maxWidth = "768px";
    modules.style.margin = "0 auto";
    
  } else {
    // 如果元素还不存在，继续等待
    console.log("Waiting for #ask_new element...");
  }
};

// 每100毫秒检查一次
const checkInterval = setInterval(waitForElement, 100);

// 设置最大等待时间（10秒），避免无限等待
setTimeout(() => {
  clearInterval(checkInterval);
  console.log("Timeout: #ask_new element not found after 10 seconds");
}, 10000);