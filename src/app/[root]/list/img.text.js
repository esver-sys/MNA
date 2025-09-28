// 使用定时器等待元素加载
const waitForElement = () => {
  const modules = document.querySelector('.modules_spa_container');
  if (modules) {
    // 清除定时器
    clearInterval(checkInterval);
    const newContainer = document.createElement('div');
    newContainer.className = 'img_content';
    newContainer.style.fontFamily = '"Poppins", system-ui'
    newContainer.style.lineHeight = 1.25
    newContainer.style.padding = '50px 30px';
    newContainer.style.background = '#fefdea'
    // 添加媒体查询样式
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
      
      @media (max-width: 768px) {
        .popup__index {
          display: none !important;
        }
      }
    `
    document.head.appendChild(style)
    modules.appendChild(newContainer);
    newContainer.innerHTML = `
        <div class="img_text"
          style="border-color: #707071; display: flex; justify-content: center; align-items: center; border: 1px dashed; background: #fff; height: fit-content;">
          <div style="max-width: 400px; overflow: hidden; flex-shrink: 0;">
            <img style="width: 100%; display: block;"
              data-src="https://cdn.myshopage.com/653b5d2b-fa27-4c79-bdb3-22ae589a8300.png" alt="" class=" lazyloaded" src="https://cdn.myshopage.com/653b5d2b-fa27-4c79-bdb3-22ae589a8300.png">
          </div>
          <div style="flex: 1; overflow: hidden; flex-shrink: 0; padding: 20px;">
            <div style="color: rgb(215, 46, 32); font-size: 30px;" class="text-size-lg">
              <p style="text-align: center;"><strong>UP TO 58% OFF</strong></p>
            </div>
            <div style="color: rgb(0, 0, 0); font-size: 30px; margin-bottom: 4px;" class="text-size-lg">
              <p style="text-align: center;"><strong>FOR A LIMITEDTIME ONLY!</strong></p>
            </div>
            <div style="color: rgb(0, 0, 0); font-size: 16px; margin-bottom: 24px;" class="text-size-md module_mb">
              <p style="text-align: center;">This limited-time deal is in high demand and stock keeps selling out.</p>
            </div>
            <a class="module_mb"
              href="https://one.wiseme.top/p/landingpage-radiant-whitening-toothpaste-cp-1"
              style="background-color: #53a6f8; display:block; text-align: center; padding: 16px 32px; border-radius: 4px; text-decoration: none; animation: scaleShrinkDrew 2.5s ease-in-out infinite; color: #ffffff; font-size: 24px; height: auto; margin: 0 auto; padding: 16px; border-radius: 6px; text-align: center; margin-bottom: 24px; max-width: 400px;">
              <p style="text-align: center;"><strong>GET 58% OFF</strong></p>
            </a>
            <div style="text-align: center; margin-bottom: 8px;">
              <div style="color: rgb(0, 0, 0); font-size: 16px; display: inline-block;" class="text-size-md">
                <p><strong>DEAL ENDING IN</strong></p>
              </div>
              <div style="color: rgb(218, 66, 57); font-size: 16px; display: inline-block;">
                <p><strong>00:26:08</strong></p>
              </div>
            </div>
            <div style="color: rgb(0, 0, 0); font-size: 16px;">
              <p style="text-align: center;">Try it today with a 90-Day Money Back Guarantee!</p>
            </div>
          </div>
        </div>
    `
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
