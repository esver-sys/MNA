// 使用定时器等待元素加载
const waitForElement = () => {
  const modules = document.querySelector('.modules__index');
  if (modules) {
    // 清除定时器
    clearInterval(checkInterval);
    
    // 创建弹窗容器
    const popupContainer = document.createElement('div');
    popupContainer.className = 'popup__index';
    popupContainer.style.position = 'sticky';
    popupContainer.style.top = '0';
    popupContainer.style.left = '0';
    popupContainer.style.height = 'fit-content'
    popupContainer.style.paddingTop = '30px';
    popupContainer.style.paddingLeft = '30px';
    popupContainer.style.fontFamily = '"Poppins", system-ui';
    
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
      
      @media (max-width: 768px) {
        .popup__index {
          display: none !important;
        }
      }
    `
    document.head.appendChild(style)
    
    // 添加弹窗内容
    popupContainer.innerHTML = `
      <div class="right_content" style="width: 270px; height: 740px; border: 1px solid #ababab; padding: 20px; font-family: 'Poppins', system-ui;">
        <div style="color: #000;font-size: 30px; font-weight: 700; text-align: center; margin-bottom: 8px;">Radiant Whitening Toothpaste</div>
        <div style="max-width: 100px; height: 14px; position:relative; margin-bottom: 8px;margin: 0 auto;">
          <img style="position: absolute; height: 14px; top: 0; left: 0; width: 100%; display: block;" src="https://cdn.myshopage.com/e745f1e6-aefc-4717-a024-200be61b0000.png" alt="">
        </div>
        <div style="position:relative; margin-bottom: 16px;width: fit-content; height: fit-content;">
          <img style="height: 228px; top: 0; left: 0; width: 228px; display: block;" src="https://cdn.myshopage.com/37f5b25d-6bc1-4f1b-6d1b-59b69fa5fc00.png" alt="">
        </div>
        <a href="https://one.wiseme.top/p/landingpage-radiant-whitening-toothpaste-cp-1" style="width: 228px;text-decoration:none; display: block; position: relative; height: 92px; text-align: center; background: rgb(83, 166, 248);color:#fff;padding: 16px 24px; border-radius: 6px;display: flex; justify-content: center; align-items: center;font-size: 28px;font-weight: bolder;animation: scaleShrinkDrew 2.5s ease-in-out infinite; box-shadow: 0px 0px 0px 0px,  0px 0px 0px 0px,  0px 4px 6px -1px,  0px 2px 4px -2px;">
          <p><strong>GET 58% OFF NOW</strong></p>
        </a>
        <div style="color: #000; padding-left: 20px;padding-top: 32px; display: flex; font-size: 14px; flex-direction: column; gap: 16px; line-height: 17.5px;">
          <div style="display: flex; gap: 8px; align-items: center;">
            <div style="flex-shrink: 0; max-width: 25px;">
              <img style="width: 100%; height: 100%;" src="https://cdn.myshopage.com/f7c23ce4-f289-4ecc-2358-611fe12af100.png" alt="">
            </div>
            <div>
              <p>Powerful Whitening & Stain Removal</p>
            </div>
          </div>
          <div style="display: flex; gap: 8px; align-items: center;">
            <div style="flex-shrink: 0; max-width: 25px;">
              <img style="width: 100%; height: 100%;" src="https://cdn.myshopage.com/f7c23ce4-f289-4ecc-2358-611fe12af100.png" alt="">
            </div>
            <div>
              <p>Long-Lasting Fresh Breath</p>
            </div>
          </div>
          <div style="display: flex; gap: 8px; align-items: center;">
            <div style="flex-shrink: 0; max-width: 25px;">
              <img style="width: 100%; height: 100%;" src="https://cdn.myshopage.com/f7c23ce4-f289-4ecc-2358-611fe12af100.png" alt="">
            </div>
            <div>
              <p>Gentle on Enamel, Tough on Stains</p>
            </div>
          </div>
          <div style="display: flex; gap: 8px; align-items: center;">
            <div style="flex-shrink: 0; max-width: 25px;">
              <img style="width: 100%; height: 100%;" src="https://cdn.myshopage.com/f7c23ce4-f289-4ecc-2358-611fe12af100.png" alt="">
            </div>
            <div>
              <p>Complete Oral Care in One Step</p>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // 添加到页面
    modules.appendChild(popupContainer);
    
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