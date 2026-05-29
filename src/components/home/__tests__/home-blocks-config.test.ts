import assert from "node:assert/strict";
import test from "node:test";

import homeBlocksConfig from "../../../config/home-blocks.json";

test("homeBlocksConfig 包含 custom-html 首页入口并跳转到对应页面", () => {
  const customHtmlBlock = homeBlocksConfig.blocks.find(
    (block) => block.id === "custom-html",
  );

  // 重点入口使用显式断言，避免首页配置被改动后静默丢失跳转能力。
  assert.ok(customHtmlBlock, "首页配置缺少 custom-html 入口");
  assert.equal(customHtmlBlock.type, "link-card");
  assert.equal(customHtmlBlock.title, "自定义Html");
  assert.equal(customHtmlBlock.url, "/custom-html");
});
