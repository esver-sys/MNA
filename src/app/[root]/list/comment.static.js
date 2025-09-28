// 使用定时器等待元素加载
const waitForElement = () => {
  const modules = document.querySelector('.modules_spa_container');
  if (modules) {
    // 清除定时器
    clearInterval(checkInterval);
    const newContainer = document.createElement('div');
    newContainer.className = 'comments__index';
    newContainer.style.padding = '30px 10px'
    newContainer.style.fontFamily = '"Poppins", system-ui'
    newContainer.style.lineHeight = 1.25
    // 设置响应式字号
    newContainer.style.fontSize = '18px' // PC端默认字号
    // 添加媒体查询样式
    const style = document.createElement('style')
    style.textContent = `
      @media (max-width: 768px) {
        .comments__index {
          font-size: 16px !important;
        }
        .comments__index .comment-actions {
          font-size: 14px !important;
        }
      }
      .comments__index .comment-actions {
        font-size: 16px;
      }
    `
    document.head.appendChild(style)
    // 将评论区作为 modules_spa_container 的最后一个子元素
    modules.appendChild(newContainer);
    newContainer.innerHTML = `
    <div style="max-width: 800px;">
    <h2 style="color: #333; margin-bottom: 20px;font-size: 20px;">Comments</h2>
    <textarea placeholder="Add a comment ..." style="width:100%;padding:16px;height:110px;border:1px solid #ccc;color: #000;
      border-radius:6px;outline:2px solid transparent;outline-offset:2px;
      margin-bottom:16px;font-size:14px;line-height:1.5;"></textarea>

    <!-- Comment 1 -->
    <div style="position: relative; margin-bottom: 20px">
      <div style="display: flex; margin-bottom: 5px">
        <img src="https://cdn.myshopage.com/8f5d6683-0252-45c8-c278-588fed1a7f00.png"  alt="James Holloway"
          style="width: 50px;height: 50px; border-radius: 50%;;margin-right: 10px;" />
        <div style="display: flex;flex-direction: column; gap: 16px;">
          <div>
            <span style="font-weight: 600; color: #3b5998;">James Holloway</span>
            <p style="margin: 5px 0; color: #000;">
              Is this safe for sensitive teeth? I want whitening but don't want pain.
            </p>
            <div
              class="comment-actions" style="display: flex; flex-wrap: wrap; gap: 8px;color: #3b5998;align-items: center; margin-top: 5px;">
              <div style="display: flex;flex-wrap: wrap; align-items: center; justify-content: center;gap: 8px;">
                <span>Like</span>
                <div style="width: 4px;height: 4px;border-radius: 9999px;background: #000;"></div>
                <span>Reply</span>
              </div>
              <div style="width: 4px;height: 4px;border-radius: 9999px;background: #000;"></div>
              <div style="display: flex;align-items: center;flex-wrap: wrap;justify-content: center; gap: 8px;">
                <img style="width: 20px; height: 20px; "
                  src="https://cdn.myshopage.com/641da459-7836-4fe5-24f9-79adfae05800.png" alt="" />
                <span>66</span>
              </div>
              <div style="width: 4px;height: 4px;border-radius: 9999px;background: #000;"></div>
              <span style="color: #999">36 hours ago</span>
            </div>
          </div>
          <!-- Nested Reply 1 -->
          <div style="border-left: 1px solid #8b8b8b; display: flex; flex-direction: column; gap: 16px;">
            <div style="padding-left: 8px; ">
              <div style="display: flex; margin-bottom: 5px">
                <img src="https://cdn.myshopage.com/5e303f7e-41ac-4d4b-4d9f-8c700bc35700.png" alt="David K."
                  style="width: 35px;height: 35px;border-radius: 50%;;margin-right: 10px;" />
                <div>
                  <span style="font-weight: 600; color: #3b5998;">David K.</span>
                  <p style="margin: 5px 0; color: #000;">
                    Yes, I've been using it for 2 months with no sensitivity issues.
                  </p>
                  <div
                    class="comment-actions" style="display: flex;flex-wrap: wrap; gap: 8px;color: #3b5998;align-items: center;margin-top: 5px; ">
                    <div style=" display: flex;flex-wrap: wrap;align-items: center;justify-content: center; gap: 8px;">
                      <span>Like</span>
                      <div style="width: 4px;height: 4px;border-radius: 9999px;background: #000;"></div>
                      <span>Reply</span>
                    </div>
                    <div style="width: 4px;height: 4px;border-radius: 9999px;background: #000;"></div>
                    <div style="display: flex;align-items: center;flex-wrap: wrap;justify-content: center;gap: 8px;">
                      <img style="width: 20px; height: 20px; "
                        src="https://cdn.myshopage.com/641da459-7836-4fe5-24f9-79adfae05800.png" alt="" />
                      <span>10</span>
                    </div>
                    <div style=" width: 4px;height: 4px; border-radius: 9999px;background: #000;"></div>
                    <span style="color: #999">10 hours ago</span>
                  </div>
                </div>
              </div>
            </div>
            <div style="padding-left: 8px;">
              <div style="display: flex; margin-bottom: 5px">
                <img src="https://cdn.myshopage.com/bd9a8a02-1389-417f-62cd-6033e0320300.png" alt="Anna W."
                  style="width: 35px;height: 35px;border-radius: 50%;; margin-right: 10px;" />
                <div>
                  <span style="font-weight: 600; color: #3b5998;">Anna W.</span>
                  <p style="margin: 5px 0; color: #000;">
                    Me too! No irritation at all and my teeth are getting whiter.
                  </p>
                  <div
                    class="comment-actions" style="display: flex;gap: 8px; flex-wrap: wrap;color: #3b5998;align-items: center; margin-top: 5px;">
                    <div style=" display: flex; flex-wrap: wrap;align-items: center;justify-content: center;gap: 8px; ">
                      <span>Like</span>
                      <div style="width: 4px;height: 4px; border-radius: 9999px;background: #000;"></div>
                      <span>Reply</span>
                    </div>
                    <div style="width: 4px;height: 4px; border-radius: 9999px;background: #000;"></div>
                    <div style="display: flex;flex-wrap: wrap;align-items: center;justify-content: center;gap: 8px;">
                      <img style="width: 20px; height: 20px; "
                        src="https://cdn.myshopage.com/641da459-7836-4fe5-24f9-79adfae05800.png" alt="" />
                      <span>10</span>
                    </div>
                    <div style="width: 4px;height: 4px; border-radius: 9999px;background: #000;"></div>
                    <span style="color: #999">10 minutes ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Comment 2 -->
    <div style="position: relative; margin-bottom: 20px">
      <div style="display: flex; margin-bottom: 5px">
        <img src="https://cdn.myshopage.com/652669be-e81f-4ba6-5bae-1a98c422b300.png" alt="Karen Stokes"
          style="width: 50px;height: 50px; border-radius: 50%;;margin-right: 10px;" />
        <div style="display: flex;flex-direction: column; gap: 16px;">
          <div>
            <span style="font-weight: 600; color: #3b5998;">Karen Stokes</span>
            <p style="margin: 5px 0; color: #000;">
              I just reordered mine. Subtle but real whitening effect and great
              fresh breath. Better than any toothpaste I tried before.
            </p>
            <div
              class="comment-actions" style="display: flex;gap: 8px;flex-wrap: wrap;color: #3b5998;align-items: center;margin-top: 5px;">
              <div style="display: flex;flex-wrap: wrap; align-items: center;justify-content: center;gap: 8px;">
                <span>Like</span>
                <div style="width: 4px;height: 4px;border-radius: 9999px;background: #000;"></div>
                <span>Reply</span>
              </div>
              <div style="width: 4px;height: 4px;border-radius: 9999px;background: #000;"></div>
              <div style=" display: flex;flex-wrap: wrap; align-items: center; justify-content: center;gap: 8px;">
                <img style="width: 20px; height: 20px; "
                  src="https://cdn.myshopage.com/641da459-7836-4fe5-24f9-79adfae05800.png" alt="" />
                <span>2</span>
              </div>
              <div style="width: 4px;height: 4px;border-radius: 9999px;background: #000;"></div>
              <span style="color: #999">2 hours ago</span>
            </div>
          </div>
          <!-- Nested Reply -->
          <div style="border-left: 1px solid #8b8b8b; display: flex; flex-direction: column; gap: 16px;">
            <div style="padding-left: 8px; ">
              <div style="display: flex; margin-bottom: 5px">
                <img src="https://cdn.myshopage.com/271b7488-d2a0-41ed-29f9-f1f882ab4500.png" alt="Emily Tran"
                  style="width: 35px;height: 35px;border-radius: 50%;;margin-right: 10px;" />
                <div>
                  <span style="font-weight: 600; color: #3b5998;">Emily Tran</span>
                  <p style="margin: 5px 0; color: #000;">
                    Completely agree! The results are noticeable but not harsh.
                  </p>
                  <div
                    class="comment-actions" style="display: flex; flex-wrap: wrap;gap: 8px;color: #3b5998;align-items: center;margin-top: 5px;">
                    <div style="display: flex;flex-wrap: wrap;align-items: center;justify-content: center;gap: 8px;">
                      <span>Like</span>
                      <div style="width: 4px;height: 4px;border-radius: 9999px;background: #000;"></div>
                      <span>Reply</span>
                    </div>
                    <div style="width: 4px;height: 4px;border-radius: 9999px;background: #000;"></div>
                    <div style="display: flex;flex-wrap: wrap; align-items: center;justify-content: center;gap: 8px;">
                      <img style="width: 20px; height: 20px; "
                        src="https://cdn.myshopage.com/641da459-7836-4fe5-24f9-79adfae05800.png" alt="" />
                      <span>5</span>
                    </div>
                    <div style="width: 4px;height: 4px;border-radius: 9999px;background: #000;"></div>
                    <span style="color: #999">12 minutes</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
    <!-- Comment 3 -->
    <div style="position: relative; margin-bottom: 20px">
      <div style="display: flex; margin-bottom: 5px">
        <img src="https://cdn.myshopage.com/e4ca471d-db51-46e6-623e-113ccb4b2d00.png" alt="Marcus Lane"
          style="width: 50px;height: 50px; border-radius: 50%;;margin-right: 10px; " />
        <div>
          <span style="font-weight: 600; color: #3b5998;">Marcus Lane</span>
          <p style="margin: 5px 0; color: #000;">
            I've tried many whitening toothpastes, but Radiant is the first
            that actually works for me without sensitivity. Love it!
          </p>
          <div
            class="comment-actions" style=" display: flex; gap: 8px; flex-wrap: wrap;color: #3b5998; align-items: center; margin-top: 5px; ">
            <div style="display: flex;flex-wrap: wrap;align-items: center;justify-content: center;gap: 8px;">
              <span>Like</span>
              <div style="width: 4px;height: 4px;border-radius: 9999px;background: #000;"></div>
              <span>Reply</span>
            </div>
            <div style="width: 4px;height: 4px;border-radius: 9999px;background: #000;"></div>
            <div style="display: flex;flex-wrap: wrap;align-items: center;justify-content: center;gap: 8px;">
              <img style="width: 20px; height: 20px; "
                src="https://cdn.myshopage.com/641da459-7836-4fe5-24f9-79adfae05800.png" alt="" />
              <span>35</span>
            </div>
            <div style="width: 4px;height: 4px;border-radius: 9999px;background: #000;"></div>
            <span style="color: #999">3 hours ago</span>
          </div>
        </div>
      </div>
    </div>
    <!-- Comment 4 -->
    <div style="position: relative; margin-bottom: 20px">
      <div style="display: flex; margin-bottom: 5px">
        <img src="https://cdn.myshopage.com/55ae36fe-a394-42a7-a81b-74d62e6ce900.png" alt="Sophia Rivera"
          style="width: 50px;height: 50px;border-radius: 50%;;margin-right: 10px;" />
        <div>
          <span style="font-weight: 600; color: #3b5998;">Sophia Rivera</span>
          <p style="margin: 5px 0; color: #000;">
            Does it remove coffee stains? I drink 3 cups a day.
          </p>
          <div
            class="comment-actions" style="display: flex;gap: 8px;flex-wrap: wrap;color: #3b5998;align-items: center;margin-top: 5px;">
            <div style="display: flex;align-items: center;flex-wrap: wrap;justify-content: center;gap: 8px;">
              <span>Like</span>
              <div style="width: 4px;height: 4px;border-radius: 9999px;background: #000;"></div>
              <span>Reply</span>
            </div>
            <div style="width: 4px;height: 4px;border-radius: 9999px;background: #000;"></div>
            <div style="display: flex;flex-wrap: wrap;align-items: center;justify-content: center;gap: 8px;">
              <img style="width: 20px; height: 20px; "
                src="https://cdn.myshopage.com/641da459-7836-4fe5-24f9-79adfae05800.png" alt="" />
              <span>18</span>
            </div>
            <div style="width: 4px;height: 4px;border-radius: 9999px;background: #000;"></div>
            <span style="color: #999">1 day ago</span>
          </div>
        </div>
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
