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
    buttonContainer.style.padding = '10px';
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
      <div style="display: grid; gap: 8px; max-width: 80rem; margin: 0 auto; padding: 0 10px; width: 100%;">
            <div style="max-width: 600px;width: 100%; margin: 0 auto;">
                <a href="https://one.wiseme.top/p/landingpage-radiant-whitening-toothpaste-cp-1"
                    style="text-decoration:none;animation: scaleShrinkDrew 2.5s ease-in-out infinite;background-color: rgb(255, 193, 42); border: 1px solid #000; box-shadow: rgb(206, 210, 203) 0px 4px 3px 1px; 
                   color: rgb(255, 255, 255); font-size: 24px; display: flex;justify-content: center; align-items: center; border-radius: 40px; 
                   cursor: pointer; font-family: 'Poppins', system-ui; padding: 8px; padding-left: 16px; width: fit-content; margin: 0 auto;">
                    <p><strong>Order Now & Save</strong></p>
                    <div
                        style="border-radius: 50%; width: 40px;height: 40px;margin-left: 10px; background: #fff; border: 1px solid #000; padding: 6px">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="size-6" style="color: rgb(0, 0, 0);">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"></path>
                        </svg>
                    </div>
                </a>
            </div>
            <div style="display: flex; justify-content: center; align-items: center; margin-top: 16px;">
                <div
                    style="background-color: rgb(247, 201, 26); width: 7px;height: 7px;border-radius: 50%; box-shadow: rgb(250, 224, 125) 0px 0px 0px 2px; animation: scaleShrinkDrew 2.5s ease-in-out infinite">
                </div> 
                <span
                    style="font-size: 11px; margin-left: 8px; margin-right: 6px; font-weight: bold;  color: rgb(0, 0, 0);">30 Read and Rhyme Flip Books l I Stock Levels</span>
                <div style="display: flex; align-items: center; justify-content: center;">
                    <div style="width: 10px;height: 10px;margin-right: 4px; background-color: rgb(252, 34, 1);"></div>
                    <div style="width: 10px;height: 10px;margin-right: 4px; background-color: rgb(217, 217, 217);"></div>
                    <div style="width: 10px;height: 10px;margin-right: 4px; background-color: rgb(217, 217, 217);"></div>
                    <div style="width: 10px;height: 10px;margin-right: 4px; background-color: rgb(217, 217, 217);"></div>
                    <div style="width: 10px;height: 10px;margin-right: 4px; background-color: rgb(217, 217, 217);"></div>
                    <div style="font-size: 12px; font-weight: bold; padding-left: 4px; color: rgb(252, 34, 1);">
                        Low
                    </div>
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