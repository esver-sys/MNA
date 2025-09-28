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
      <div class="right_content" style="width: 270px; height: fit-content; border: 1px solid rgb(237, 237, 237); padding: 20px; font-family: 'Poppins', system-ui;">
        <div style="color: #000;font-size: 22px; font-weight: 700; text-align: center; margin-bottom: 8px;">30 Read and Rhyme Flip Books</div>
        <div style="position:relative; margin-bottom: 16px;width: fit-content; height: fit-content;">
          <img style="height: 228px; top: 0; left: 0; width: 228px; display: block;" src="https://cdn.myshopage.com/1a9e88fb-c53f-4f30-d47f-74ac38148f00.jpg" alt="">
        </div>
        <a href="https://one.wiseme.top/p/landingpage-radiant-whitening-toothpaste-cp-1" style="width: 228px;text-decoration:none; display: block; position: relative; height: 92px; text-align: center;display: flex; justify-content: center; align-items: center;font-size: 28px;font-weight: bolder;animation: scaleShrinkDrew 2.5s ease-in-out infinite;">
          <p style="font-size: 24px;width:100%;color: rgb(255, 255, 255);border-radius: 0.5rem;background-color: rgb(249, 151, 76);padding: 0.75rem;">BUY NOW →</p>
        </a>
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