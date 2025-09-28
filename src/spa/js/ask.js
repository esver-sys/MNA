// 使用DOM监听模式等待#ask_new元素出现
const waitForElement = () => {
  // 查找id为ask_new的元素
  const modules = document.querySelector('[id="17custom_comments_ef2akg4a"]');
  if (modules) {
    // 清除定时器
    clearInterval(checkInterval);
    
    // 创建外层容器
    const newContainer = document.createElement("div");
    newContainer.className = "faq_container";
    newContainer.style.fontFamily = '"Poppins", system-ui';
    newContainer.style.lineHeight = 1.25;
    newContainer.style.width = "100%";
    newContainer.style.maxWidth = "80rem";
    newContainer.style.margin = "0 auto";
    newContainer.style.padding = "0 16px";
    
    // 添加媒体查询样式
    const style = document.createElement("style");
    style.textContent = `
      @media screen and (max-width: 768px) {
        .faq_container {
          padding: 0 10px !important;
        }
        
        .faq_item {
          flex-direction: column !important;
        }
      }
      
      .rotate-90 {
        transform: rotate(-90deg) !important;
        transition: transform 0.2s ease;
      }
    `;
    
    // 将新容器插入到 modules 元素的下方（作为兄弟元素）
    modules.insertAdjacentElement("afterend", newContainer);
    // 插入样式
    document.head.appendChild(style);
    
    // FAQ数据
    const faqData = [
      {
        question: "How old are the Early Learning Flip Cards suitable for babies?",
        answer: "Generally speaking, the Early Learning Flip Cards are suitable for babies from 6 months to about 3 years old. 6-month-old babies are beginning to have the initial perception of colours and patterns, and as they grow older, the cognitive content of the cards can meet their evolving learning needs."
      },
      {
        question: "How to use the early education flip reading cards for effective early education?",
        answer: "Parents can flip through the cards with their babies, point to the patterns on them and clearly say the names, colours and features. For example, when you see an apple card, say 'this is a red apple, round'. You can also guide your baby's observation by asking questions, such as 'Which one is red, the apple or the strawberry?' Encourage your baby to participate in the interaction to enhance their cognitive and language skills."
      },
      {
        question: "Is the material of Early Learning Flip-Flop Reading Cards safe?",
        answer: "The Early Learning flip reading cards are made of safe and non-toxic materials, which will not harm the baby's health."
      },
      {
        question: "How do the Early Learning Flip-Flop Reading Cards help baby's language development?",
        answer: "When babies are reading the cards, they will hear clear language descriptions from their parents, which helps them to build up their vocabulary. Through repeated listening and imitation, babies gradually learn the correct pronunciation and expression. At the same time, the patterns on the cards can provide babies with contexts for language expression, which promotes their understanding of the meaning of language and improves their language comprehension and expression skills."
      }
    ];
    
    // 图标base64数据
    const iconBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAHdElNRQfkBAcCIjJFt66DAAAARUlEQVQoz2NgwAbcGJ4w2DLgBG4M3xmeMkjjlv7G8IJBiwLp54SkNcmU1mP4zvCUQQ1TgomBaOCK3/2DTQmByIIogUc3AHxYIH3HjME/AAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIwLTA0LTA3VDAyOjM0OjUwKzAwOjAwoLjuMQAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMC0wNC0wN1QwMjozNDo1MCswMDowMNHlVo0AAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAAElFTkSuQmCC";
    
    // 生成FAQ项
    let faqHTML = `
      <div style="text-align: center; padding: 15px 0 30px; font-weight: bold; color: #ffc12a;font-size: 26px;">
        Frequently Asked Questions
      </div>
      <div style="margin: 0 auto; max-width: 940px;">
    `;
    
    faqData.forEach(item => {
      faqHTML += `
        <div style="background: white; margin-bottom: 15px; border-radius: 5px;">
          <div
            style="width: 100%; display: flex; align-items: center; justify-content: space-between; cursor: pointer; border-radius: 5px; padding: 6px 16px; font-size: 16px;"
            class="faq-header">
            <div style="margin: 5px 5px 5px 0; font-weight: bold; text-align: left;">
              <span>${item.question}</span>
            </div>
            <img src="${iconBase64}" alt="" width="auto" height="auto"
              class="transform transition-transform duration-200 rotate-0 ls-is-cached lazyloaded faq-icon">
          </div>
          <div style="height: 0; overflow: hidden;" class="faq-content">
            <div style="padding:0 25px 21px; text-align: left;color: #747474;">
              <p>${item.answer}</p>
            </div>
          </div>
        </div>
      `;
    });
    
    faqHTML += `</div>`;
    newContainer.innerHTML = faqHTML;
    
    // 添加点击事件监听器
    const faqHeaders = newContainer.querySelectorAll('.faq-header');
    
    faqHeaders.forEach(header => {
      header.addEventListener('click', function() {
        // 找到下一个兄弟元素，即内容区域
        const content = this.nextElementSibling;
        // 找到图标元素
        const icon = this.querySelector('.faq-icon');
        
        // 切换内容区域的显示状态
        if (content.style.height === 'auto') {
          // 收起内容
          content.style.height = '0';
          content.style.overflow = 'hidden';
          // 移除旋转类
          icon.classList.remove('rotate-90');
        } else {
          // 展开内容
          content.style.height = 'auto';
          content.style.overflow = 'visible';
          // 添加旋转类
          icon.classList.add('rotate-90');
        }
      });
    });
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