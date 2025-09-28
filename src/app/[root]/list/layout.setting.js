// 使用定时器等待元素加载
const waitForElement = () => {
  const modules = document.querySelector('.modules__index');
  if (modules) {
    // 清除定时器
    clearInterval(checkInterval);
    
    // 创建最大宽度为1280px的新容器
    const newContainer = document.createElement('div');
    newContainer.className = 'modules_spa_container'
    newContainer.style.flex = '1';
    
    // 将原modules__index的子元素移动到新容器中
    while (modules.firstChild) {
      newContainer.appendChild(modules.firstChild);
    }
    
    // 将新容器添加到modules中
    modules.appendChild(newContainer);
    
    // 设置modules为flex布局
    modules.style.display = 'flex';
    modules.style.justifyContent = 'center';
    modules.style.maxWidth = '1280px';
    modules.style.margin = '0 auto';
    
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