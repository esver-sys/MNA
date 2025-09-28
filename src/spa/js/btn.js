// 使用定时器等待元素加载
const waitForElement = () => {
  const modules = document.querySelector(".modules_spa_container");
  if (modules) {
    // 清除定时器
    clearInterval(checkInterval);
    const newContainer = document.createElement("div");
    newContainer.className = "btn_content";
    newContainer.style.fontFamily = '"Poppins", system-ui';
    // 添加媒体查询样式
    const style = document.createElement("style");
    style.textContent = `
      @keyframes scaleShrinkDrew {
        0% {
          transform: scale(1);
        }
        50% {
          transform: scale(.9);
        }
        100% {
          transform: scale(1);
        }
      }
    `
    document.head.appendChild(style);
    modules.appendChild(newContainer);
    newContainer.innerHTML = `
      <div style="background-color: rgb(255, 255, 255);padding: 16px 0; width: 100%; display: block; font-family: 'Poppins', system-ui;">
        <div style="display: grid; gap: 8px; max-width: 80rem; margin: 0 auto; padding: 0 10px; width: 100%;">
          <div style="max-width: 600px;width: 100%; margin: 0 auto;">
            <a href="https://one.wiseme.top/p/landingpage-radiant-whitening-toothpaste-cp-1" style="margin: 0 auto;text-decoration:none; display: block; position: relative; text-align: center;display: flex; justify-content: center; align-items: center;font-size: 28px;font-weight: bolder;animation: scaleShrinkDrew 2.5s ease-in-out infinite;">
              <p style="font-size: 14px; width: 100%;color: rgb(255, 255, 255);border-radius: 0.5rem;background-color: rgb(249, 151, 76);font-size: 24px;padding: 0.75rem;">BUY NOW →</p>
            </a>
          </div>
        </div>
      </div>
    `;
  } else {
    // 如果元素还不存在，继续等待
    console.log("Waiting for .modules__index element...");
  }
};

// 每100毫秒检查一次
const checkInterval = setInterval(waitForElement, 100);

// 设置最大等待时间（10秒），避免无限等待
setTimeout(() => {
  clearInterval(checkInterval);
  console.log("Timeout: .modules__index element not found after 10 seconds");
}, 10000);
