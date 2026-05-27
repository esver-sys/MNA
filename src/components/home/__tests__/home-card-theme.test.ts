import assert from "node:assert/strict";
import test from "node:test";

import {
  getHomeCardTheme,
  homeCardThemes,
} from "../home-card-theme";

test("getHomeCardTheme 会按卡片 id 返回稳定主题", () => {
  assert.equal(getHomeCardTheme("github-repo"), homeCardThemes["github-repo"]);
  assert.equal(getHomeCardTheme("github-repo"), getHomeCardTheme("github-repo"));
});

test("getHomeCardTheme 未配置 id 时回退到默认主题", () => {
  assert.equal(getHomeCardTheme("unknown-tool"), homeCardThemes.default);
});
