// 使用定时器等待元素加载
const waitForElement = () => {
  const modules = document.querySelector('.modules_spa_container');
  if (modules) {
    // 清除定时器
    clearInterval(checkInterval);
    const newContainer = document.createElement('div');
    newContainer.className = 'news-review_container';
    newContainer.style.fontFamily = '"Poppins", system-ui'
    newContainer.style.lineHeight = 1.25
    // 设置响应式字号
    newContainer.style.fontSize = '18px' // PC端默认字号
    // 添加媒体查询样式
    const style = document.createElement('style')
    style.textContent = `
      @media screen and (max-width: 768px) {
      .social_media_index {
        columns: 1 !important
      }
      .sm_two {
        display: none;
      }
    }
    `
    document.head.appendChild(style)
    // 将评论区作为 modules_spa_container 的最后一个子元素
    modules.appendChild(newContainer);
    newContainer.innerHTML = `
    <div style="padding-top: 30px;">
        <div style="color: rgb(0, 0, 0); margin-bottom: 24px;font-size: 28px;">
          <p style="text-align: center;"><strong>It's Going Viral on Social Media</strong></p>
        </div>
        <div class="social_media_index" style="columns: 2; column-gap: 20px;">
          <div style="padding: 16px; flex: 1; margin-bottom: 20px;background-color: rgb(240, 242, 245);">
            <div style="background: #fff; border-radius: 12px; padding: 16px;">
              <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px;">
                <div style="display: flex; align-content: center; gap: 8px; flex: 1;">
                  <div style="max-width: 50px;">
                    <img style="width: 100%; height: 50px;"
                      data-src="https://cdn.myshopage.com/df5192b6-4a66-423d-f1af-818ee8632c00.png" alt="" width="300"
                      height="300" class="lazycover lazyloaded"
                      src="https://cdn.myshopage.com/df5192b6-4a66-423d-f1af-818ee8632c00.png">
                  </div>
                  <div style="flex: 1;">
                    <div style="font-size: 14px;color: rgb(63, 88, 147);">Emily L.</div>
                    <div style="display: flex; align-content: center; gap: 8px; padding-top: 6px;">
                      <div style="color: rgb(98, 103, 111);font-size: 12px;">15 hours ago</div>
                      <div style="max-width: 12px;">
                        <img style="width: 100%; height: 12px;"
                          data-src="https://cdn.myshopage.com/ad487802-d08e-40a2-a164-6016c2322600.svg" alt=""
                          width="150" height="150" class="lazycover lazyloaded"
                          src="https://cdn.myshopage.com/ad487802-d08e-40a2-a164-6016c2322600.svg">
                      </div>
                    </div>
                  </div>
                </div>
                <div style="max-width: 20px;">
                  <img data-src="https://cdn.myshopage.com/7c62e3bd-b66a-4475-b79d-13e1e3bb8e00.svg" alt="" width="17"
                    height="4" class="lazycontain lazyloaded"
                    src="https://cdn.myshopage.com/7c62e3bd-b66a-4475-b79d-13e1e3bb8e00.svg">
                </div>
              </div>
              <div style="font-size: 14px;color: #000; margin-top: 20px;">
                <p>Just started using Radiant Whitening Toothpaste last week—already seeing a noticeable difference in
                  my smile! ☺️ Big thanks to my friend Sarah for recommending it. Got it during their promo. Can’t wait
                  to keep using it!</p>
              </div>
              <div
                style="display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-top: 8px;">
                <div style="display: flex; align-items: center; gap: 4px;">
                  <div style="display: flex; align-items: center;">
                    <img style="width: 20px; height: 20px;"
                      data-src="https://cdn.myshopage.com/899ee967-e5d9-4fee-73cf-1ee69188b200.svg" alt="" width="16"
                      height="16" class="lazycover lazyloaded"
                      src="https://cdn.myshopage.com/899ee967-e5d9-4fee-73cf-1ee69188b200.svg">
                    <img style="width: 20px; height: 20px;"
                      data-src="https://cdn.myshopage.com/395ed445-9a7b-40c2-d28a-b8392fb90400.svg" alt="" width="16"
                      height="16" class="lazycover lazyloaded"
                      src="https://cdn.myshopage.com/395ed445-9a7b-40c2-d28a-b8392fb90400.svg">
                    <img style="width: 20px; height: 20px;"
                      data-src="https://cdn.myshopage.com/5dd9a4e0-6e10-4603-abdc-dd9bb5f44100.svg" alt="" width="16"
                      height="16" class="lazycover lazyloaded"
                      src="https://cdn.myshopage.com/5dd9a4e0-6e10-4603-abdc-dd9bb5f44100.svg">
                  </div>
                  <div style="color: rgb(98, 103, 111);font-size: 12px;">27</div>
                </div>
                <div style="color: rgb(98, 103, 111);font-size: 12px;">2 Comments</div>
              </div>
              <div
                style="display: flex; margin-top: 12px; gap: 12px; padding: 12px 0; border-top: 1px solid #ced0d4;  border-bottom: 1px solid #ced0d4;">
                <div style="display: flex; align-items: center; gap: 4px;">
                  <img style="width: 18px; height: 18px;"
                    data-src="https://cdn.myshopage.com/1b2a32da-9ab4-4e25-704a-8a119f1ddb00.svg" alt="" width="150"
                    height="150" class=" lazyloaded"
                    src="https://cdn.myshopage.com/1b2a32da-9ab4-4e25-704a-8a119f1ddb00.svg">
                  <div style="color: rgb(113, 128, 150); font-size: 12px;">
                    Like
                  </div>
                </div>
                <div style="display: flex; align-items: center; gap: 4px;">
                  <img style="width: 18px; height: 18px;"
                    data-src="https://cdn.myshopage.com/66751281-7363-4ce8-d13e-44f7c490ec00.svg" alt="" width="16"
                    height="16" class=" lazyloaded"
                    src="https://cdn.myshopage.com/66751281-7363-4ce8-d13e-44f7c490ec00.svg">
                  <div style="color: rgb(113, 128, 150); font-size: 12px;">
                    Comment
                  </div>
                </div>
              </div>
              <div style="display: flex; align-items: flex-start; gap: 8px; margin-top: 16px;">
                <div style="max-width: 50px;">
                  <img style="width: 50px; height: 50px;"
                    data-src="https://cdn.myshopage.com/93d4b417-95de-4f59-3177-2195faf08200.png" alt="" width="300"
                    height="300" class="lazycover lazyloaded"
                    src="https://cdn.myshopage.com/93d4b417-95de-4f59-3177-2195faf08200.png">
                </div>
                <div style="flex: 1;">
                  <div style="padding: 8px 16px; background-color: rgb(241 242 246); border-radius: 12px;">
                    <div style="color: rgb(0, 0, 0); font-size: 13px; font-weight: 700; margin-bottom: 6px;">
                      Sandra M.
                    </div>
                    <div style="color: #000; font-size: 14px;">
                      <p>Wow! I’ve been searching for a good whitening toothpaste that’s gentle on my teeth. Where did
                        you order it from?</p>
                    </div>
                  </div>
                  <div style="padding-top: 8px;">
                    <span style="padding-left: 16px;color: rgb(98, 103, 111); font-size: 10px;">Like</span>
                    <span style="padding-left: 16px;color: rgb(98, 103, 111); font-size: 10px;">Reply</span>
                    <span style="padding-left: 16px;color: rgb(98, 103, 111); font-size: 10px;">5 hours ago</span>
                  </div>
                </div>
              </div>
              <div style="display: flex; align-items: flex-start; gap: 8px; margin-top: 16px;">
                <div style="max-width: 50px;">
                  <img style="width: 50px;height: 50px;" data-src="https://cdn.myshopage.com/bce73a65-2afd-4730-e891-97785e8cd000.png" alt="" width="300" height="300" class="lazycover lazyloaded" src="https://cdn.myshopage.com/bce73a65-2afd-4730-e891-97785e8cd000.png">
                </div>
                <div style="flex: 1;">
                  <div style="padding: 8px 16px; background-color: rgb(241 242 246); border-radius: 12px;">
                    <div style="color: rgb(0, 0, 0); font-size: 13px; font-weight: 700; margin-bottom: 6px;">
                      Michael T.
                    </div>
                    <div style="color: #000; font-size: 14px;">
                      <p>This toothpaste really changed my routine. Love how fresh my breath stays all day!</p>
                    </div>
                  </div>
                  <div style="padding-top: 8px;">
                    <span style="padding-left: 16px;color: rgb(98, 103, 111); font-size: 10px;">Like</span>
                    <span style="padding-left: 16px;color: rgb(98, 103, 111); font-size: 10px;">Reply</span>
                    <span style="padding-left: 16px;color: rgb(98, 103, 111); font-size: 10px;">32 minutes ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="sm_two" style="padding: 16px; flex: 1; margin-bottom: 20px;background-color: rgb(240, 242, 245);">
            <div style="background: #fff; border-radius: 12px; padding: 16px;">
              <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px;">
                <div style="display: flex; align-content: center; gap: 8px; flex: 1;">
                  <div style="max-width: 50px;">
                   <img style="width: 50px; height: 50px" data-src="https://cdn.myshopage.com/019f10c1-8c24-4078-fbf9-5ea8ad33dc00.png" alt="" width="300" height="300" class="lazycover lazyloaded" src="https://cdn.myshopage.com/019f10c1-8c24-4078-fbf9-5ea8ad33dc00.png">
                  </div>
                  <div style="flex: 1;">
                    <div style="font-size: 14px;color: rgb(63, 88, 147);">Emily L.</div>
                    <div style="display: flex; align-content: center; gap: 8px; padding-top: 6px;">
                      <div style="color: rgb(98, 103, 111);font-size: 12px;">12 hours ago</div>
                      <div style="max-width: 12px;">
                        <img style="width: 100%; height: 12px;"
                          data-src="https://cdn.myshopage.com/ad487802-d08e-40a2-a164-6016c2322600.svg" alt=""
                          width="150" height="150" class="lazycover lazyloaded"
                          src="https://cdn.myshopage.com/ad487802-d08e-40a2-a164-6016c2322600.svg">
                      </div>
                    </div>
                  </div>
                </div>
                <div style="max-width: 20px;">
                  <img data-src="https://cdn.myshopage.com/7c62e3bd-b66a-4475-b79d-13e1e3bb8e00.svg" alt="" width="17"
                    height="4" class="lazycontain lazyloaded"
                    src="https://cdn.myshopage.com/7c62e3bd-b66a-4475-b79d-13e1e3bb8e00.svg">
                </div>
              </div>
              <div style="font-size: 14px;color: #000; margin-top: 20px;">
                <p>This toothpaste does everything I want—whitening, stain removal, and fresh breath. Plus it’s gentle on my gums. Highly recommend!</p>
              </div>
              <div
                style="display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-top: 8px;">
                <div style="display: flex; align-items: center; gap: 4px;">
                  <div style="display: flex; align-items: center;">
                    <img style="width: 20px; height: 20px;"
                      data-src="https://cdn.myshopage.com/899ee967-e5d9-4fee-73cf-1ee69188b200.svg" alt="" width="16"
                      height="16" class="lazycover lazyloaded"
                      src="https://cdn.myshopage.com/899ee967-e5d9-4fee-73cf-1ee69188b200.svg">
                    <img style="width: 20px; height: 20px;"
                      data-src="https://cdn.myshopage.com/395ed445-9a7b-40c2-d28a-b8392fb90400.svg" alt="" width="16"
                      height="16" class="lazycover lazyloaded"
                      src="https://cdn.myshopage.com/395ed445-9a7b-40c2-d28a-b8392fb90400.svg">
                    <img style="width: 20px; height: 20px;"
                      data-src="https://cdn.myshopage.com/5dd9a4e0-6e10-4603-abdc-dd9bb5f44100.svg" alt="" width="16"
                      height="16" class="lazycover lazyloaded"
                      src="https://cdn.myshopage.com/5dd9a4e0-6e10-4603-abdc-dd9bb5f44100.svg">
                  </div>
                  <div style="color: rgb(98, 103, 111);font-size: 12px;">46</div>
                </div>
                <div style="color: rgb(98, 103, 111);font-size: 12px;">3 Comments</div>
              </div>
              <div
                style="display: flex; margin-top: 12px; gap: 12px; padding: 12px 0; border-top: 1px solid #ced0d4;  border-bottom: 1px solid #ced0d4;">
                <div style="display: flex; align-items: center; gap: 4px;">
                  <img style="width: 18px; height: 18px;"
                    data-src="https://cdn.myshopage.com/1b2a32da-9ab4-4e25-704a-8a119f1ddb00.svg" alt="" width="150"
                    height="150" class=" lazyloaded"
                    src="https://cdn.myshopage.com/1b2a32da-9ab4-4e25-704a-8a119f1ddb00.svg">
                  <div style="color: rgb(113, 128, 150); font-size: 12px;">
                    Like
                  </div>
                </div>
                <div style="display: flex; align-items: center; gap: 4px;">
                  <img style="width: 18px; height: 18px;"
                    data-src="https://cdn.myshopage.com/66751281-7363-4ce8-d13e-44f7c490ec00.svg" alt="" width="16"
                    height="16" class=" lazyloaded"
                    src="https://cdn.myshopage.com/66751281-7363-4ce8-d13e-44f7c490ec00.svg">
                  <div style="color: rgb(113, 128, 150); font-size: 12px;">
                    Comment
                  </div>
                </div>
              </div>
              <div style="display: flex; align-items: flex-start; gap: 8px; margin-top: 16px;">
                <div style="max-width: 50px;">
                  <img style="width: 50px; height: 50px;" data-src="https://cdn.myshopage.com/8aae744b-7a5d-48ce-b200-9b7b928aea00.png" alt="" width="99" height="100" class="lazycover lazyloaded" src="https://cdn.myshopage.com/8aae744b-7a5d-48ce-b200-9b7b928aea00.png">
                </div>
                <div style="flex: 1;">
                  <div style="padding: 8px 16px; background-color: rgb(241 242 246); border-radius: 12px;">
                    <div style="color: rgb(0, 0, 0); font-size: 13px; font-weight: 700; margin-bottom: 6px;">
                      Adam Lewis
                    </div>
                    <div style="color: #000; font-size: 14px;">
                      <p>I love the minty freshness and how smooth my teeth feel after brushing.</p>
                    </div>
                  </div>
                  <div style="padding-top: 8px;">
                    <span style="padding-left: 16px;color: rgb(98, 103, 111); font-size: 10px;">Like</span>
                    <span style="padding-left: 16px;color: rgb(98, 103, 111); font-size: 10px;">Reply</span>
                    <span style="padding-left: 16px;color: rgb(98, 103, 111); font-size: 10px;">5 hours ago</span>
                  </div>
                </div>
              </div>
              <div style="display: flex; align-items: flex-start; gap: 8px; margin-top: 16px;">
                <div style="max-width: 50px;">
                  <img style="width: 50px; height: 50px;" data-src="https://cdn.myshopage.com/0ecdf167-4f7d-4a6b-fd8a-dd96c6032a00.png" alt="" width="150" height="150" class="lazycover lazyloaded" src="https://cdn.myshopage.com/0ecdf167-4f7d-4a6b-fd8a-dd96c6032a00.png">
                </div>
                <div style="flex: 1;">
                  <div style="padding: 8px 16px; background-color: rgb(241 242 246); border-radius: 12px;">
                    <div style="color: rgb(0, 0, 0); font-size: 13px; font-weight: 700; margin-bottom: 6px;">
                      Olivia Ward
                    </div>
                    <div style="color: #000; font-size: 14px;">
                      <p>Bought it last month during a promo, coffee stains fading fast!</p>
                    </div>
                  </div>
                  <div style="padding-top: 8px;">
                    <span style="padding-left: 16px;color: rgb(98, 103, 111); font-size: 10px;">Like</span>
                    <span style="padding-left: 16px;color: rgb(98, 103, 111); font-size: 10px;">Reply</span>
                    <span style="padding-left: 16px;color: rgb(98, 103, 111); font-size: 10px;">2 hours ago</span>
                  </div>
                </div>
              </div>
              <div style="display: flex; align-items: flex-start; gap: 8px; margin-top: 16px;">
                <div style="max-width: 50px;">
                  <img style="width: 50px; height: 50px;" data-src="https://cdn.myshopage.com/089352bd-5d75-44f1-4104-842143b7d700.png" alt="" width="150" height="150" class="lazycover lazyloaded" src="https://cdn.myshopage.com/089352bd-5d75-44f1-4104-842143b7d700.png">
                </div>
                <div style="flex: 1;">
                  <div style="padding: 8px 16px; background-color: rgb(241 242 246); border-radius: 12px;">
                    <div style="color: rgb(0, 0, 0); font-size: 13px; font-weight: 700; margin-bottom: 6px;">
                      Danielle Cruz
                    </div>
                    <div style="color: #000; font-size: 14px;">
                      <p>I ordered mine yesterday. Can’t wait to see results!</p>
                    </div>
                  </div>
                  <div style="padding-top: 8px;">
                    <span style="padding-left: 16px;color: rgb(98, 103, 111); font-size: 10px;">Like</span>
                    <span style="padding-left: 16px;color: rgb(98, 103, 111); font-size: 10px;">Reply</span>
                    <span style="padding-left: 16px;color: rgb(98, 103, 111); font-size: 10px;">2 minutes ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`
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
