// 使用定时器等待元素加载
const waitForElement = () => {
  const modules = document.querySelector('.modules__index');
  if (modules) {
    // 清除定时器
    clearInterval(checkInterval);
    
    // 创建底部悬浮按钮容器
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'button__index';
    buttonContainer.style.position = 'fixed';
    buttonContainer.style.width = '100vw';
    buttonContainer.style.height = '106px';
    buttonContainer.style.padding = '16px 0';
    buttonContainer.style.background = '#fff';
    buttonContainer.style.bottom = '0px';
    buttonContainer.style.display = 'flex';
    buttonContainer.style.justifyContent = 'center';
    buttonContainer.style.alignItems = 'center';
    buttonContainer.style.fontFamily = '"Poppins", system-ui';
    buttonContainer.style.zIndex = '9998'; // 略低于弹窗
    
    // 添加媒体查询样式和动画定义
    const style = document.createElement('style')
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
    document.head.appendChild(style)
    
    // 添加按钮内容
    buttonContainer.innerHTML = `
      <div style="background-color: rgb(255, 255, 255);padding: 16px 0; width: 100%; display: block; position: fixed; left: 0; bottom: 0; font-family: 'Poppins', system-ui;">
        <div style="display: grid; gap: 8px; max-width: 80rem; margin: 0 auto; padding: 0 10px; width: 100%;">
          <div style="max-width: 600px;width: 100%; margin: 0 auto;">
            <a href="https://one.wiseme.top/p/landingpage-radiant-whitening-toothpaste-cp-1" style="text-decoration:none;background-color: rgb(83, 166, 248); display: block; color: rgb(255, 255, 255); font-size: 24px; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 16px 24px; border-radius: 6px;animation: scaleShrinkDrew 2.5s ease-in-out infinite; cursor: pointer; font-family: 'Poppins', system-ui;">
                <p><strong>GET 58% OFF NOW</strong></p>
            </a>
          </div>
        </div>
      </div>
    `;
    
    // 添加到页面
    document.body.appendChild(buttonContainer);
    
  } else {
    // 如果元素还不存在，继续等待
    console.log('Waiting for .modules__index element...');
  }
};

// 每100毫秒检查一次
const checkInterval = setInterval(waitForElement, 100);

// 设置最大等待时间（10秒），避免无限等待
setTimeout(() => {
  clearInterval(checkInterval);
  console.log('Timeout: .modules__index element not found after 10 seconds');
}, 10000);