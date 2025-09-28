const waitForElement = () => {
  
  // 使用属性选择器来选择类名以"5image_oo9imla8"开头的元素
  const modules = document.querySelector('[id="5image_oo9imla8"]');

  if (modules) {
    const newContainer = document.createElement("div");
    newContainer.className = "card_container_index";
    newContainer.style.fontFamily = '"Poppins", system-ui';
    newContainer.style.lineHeight = 1.25;
    newContainer.style.width = "100%";
    newContainer.style.maxWidth = "80rem";
    newContainer.style.padding = "0 32px";
    newContainer.style.margin = "0 auto";
    const style = document.createElement("style");
    style.textContent = `
      @media screen and (max-width: 768px) {
      .card_container_index {
        padding: 0 10px !important;
        }
        .card_con {
            flex-direction: column !important;
        }
    }
    `;
    // 修改这里：将新容器插入到 modules 元素的下方（作为兄弟元素）
    modules.insertAdjacentElement("afterend", newContainer);
    // 插入样式
    document.head.appendChild(style);
    newContainer.innerHTML = `
        <div class="card_con" style="margin: 0 auto; display: flex; flex-wrap: nowrap; gap: 12px;">
          <div style="overflow: hidden; border-radius: 6px; min-height: 240px; margin-bottom: 8px; box-shadow: 0 0 #000, 0 0 #000, 0 0 #000, 0 0 #000, 0 4px 6px -1px #0000001a, 0 2px 4px -2px #0000001a">
            <div style="margin: 0 auto;margin-bottom: 16px; ">
              <img style="width: 100%; height: 100%;" data-src="https://cdn.myshopage.com/d436e0fd-1062-4f13-dfc4-69fe78415c00.png" alt="" width="600" height="326" class="tiling_item_img w-full h-auto object-cover rounded-t-md lazyloaded" data-v-50cbc926="" src="https://cdn.myshopage.com/d436e0fd-1062-4f13-dfc4-69fe78415c00.png">
            </div>
            <div style="color: #191919; font-size: 18px; line-height: 1.25rem; text-align: center; padding: 0 8px; margin-bottom: 8px; font-weight: 700;">Whitening Power</div>
          </div>
          <div style="overflow: hidden;  border-radius: 6px; min-height: 240px; margin-bottom: 8px; box-shadow: 0 0 #000, 0 0 #000, 0 0 #000, 0 0 #000, 0 4px 6px -1px #0000001a, 0 2px 4px -2px #0000001a">
            <div style=" margin: 0 auto;margin-bottom: 16px;">
              <img style="width: 100%; height: 100%;" data-src="https://cdn.myshopage.com/2ad60ca6-e538-4bdf-ad49-ec3c476ad200.png" alt="" width="600" height="326" class="tiling_item_img w-full h-auto object-cover rounded-t-md lazyloaded" data-v-50cbc926="" src="https://cdn.myshopage.com/2ad60ca6-e538-4bdf-ad49-ec3c476ad200.png">
          </div>
          <div style="color: #191919; font-size: 18px; line-height: 1.25rem; text-align: center; padding: 0 8px; margin-bottom: 8px; font-weight: 700;">Stain Removal</div>
          </div>
          <div style="overflow: hidden; border-radius: 6px; min-height: 240px; margin-bottom: 8px; box-shadow: 0 0 #000, 0 0 #000, 0 0 #000, 0 0 #000, 0 4px 6px -1px #0000001a, 0 2px 4px -2px #0000001a">
            <div style=" margin: 0 auto;margin-bottom: 16px;">
              <img style="width: 100%; height: 100%;" data-src="https://cdn.myshopage.com/ab60e10a-afa8-47bc-96df-3c4039a58000.png" alt="" width="600" height="326" class="tiling_item_img w-full h-auto object-cover rounded-t-md lazyloaded" data-v-50cbc926="" src="https://cdn.myshopage.com/ab60e10a-afa8-47bc-96df-3c4039a58000.png">
            </div>
            <div style="color: #191919; font-size: 18px; line-height: 1.25rem; text-align: center; padding: 0 8px; margin-bottom: 8px; font-weight: 700;">Deep Cleaning</div>
          </div>
          <div style="overflow: hidden;  border-radius: 6px; min-height: 240px; margin-bottom: 8px; box-shadow: 0 0 #000, 0 0 #000, 0 0 #000, 0 0 #000, 0 4px 6px -1px #0000001a, 0 2px 4px -2px #0000001a">
            <div style=" margin: 0 auto;margin-bottom: 16px;">
              <img style="width: 100%; height: 100%;" data-src="https://cdn.myshopage.com/d436e0fd-1062-4f13-dfc4-69fe78415c00.png" alt="" width="600" height="326" class="tiling_item_img w-full h-auto object-cover rounded-t-md lazyloaded" data-v-50cbc926="" src="https://cdn.myshopage.com/d436e0fd-1062-4f13-dfc4-69fe78415c00.png">
            </div>
            <div style="color: #191919; font-size: 18px; line-height: 1.25rem; text-align: center; padding: 0 8px; margin-bottom: 8px; font-weight: 700;">Fresh Breath</div>
          </div>
          <div style="overflow: hidden;  border-radius: 6px; min-height: 240px; margin-bottom: 8px; box-shadow: 0 0 #000, 0 0 #000, 0 0 #000, 0 0 #000, 0 4px 6px -1px #0000001a, 0 2px 4px -2px #0000001a">
            <div style="margin: 0 auto;margin-bottom: 16px; ">
              <img style="width: 100%; height: 100%;" data-src="https://cdn.myshopage.com/d436e0fd-1062-4f13-dfc4-69fe78415c00.png" alt="" width="600" height="326" class="tiling_item_img w-full h-auto object-cover rounded-t-md lazyloaded" data-v-50cbc926="" src="https://cdn.myshopage.com/d436e0fd-1062-4f13-dfc4-69fe78415c00.png">
            </div>
            <div style="color: #191919; font-size: 18px; line-height: 1.25rem; text-align: center; padding: 0 8px; margin-bottom: 8px; font-weight: 700;">Enamel Safe</div>
          </div>
        </div>
    `;
  }
};

// 等待DOM加载完成后执行
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", waitForElement);
} else {
  waitForElement();
}
