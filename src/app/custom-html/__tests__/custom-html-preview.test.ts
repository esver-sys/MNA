import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import {
  DEFAULT_PREVIEW_MODE,
  PREVIEW_MODE_OPTIONS,
  PREVIEW_VIEWPORTS,
} from "../custom-html-preview";

test("PREVIEW_VIEWPORTS 固定 PC 与移动端预览视口尺寸", () => {
  assert.deepEqual(PREVIEW_VIEWPORTS.desktop, {
    width: 1280,
    height: 720,
    label: "1280x720",
  });
  assert.deepEqual(PREVIEW_VIEWPORTS.mobile, {
    width: 390,
    height: 844,
    label: "390x844",
  });
});

test("预览模式通过 PC 与手机按钮单选切换，默认展示 PC 端", () => {
  assert.equal(DEFAULT_PREVIEW_MODE, "desktop");
  assert.deepEqual(
    PREVIEW_MODE_OPTIONS.map(({ value, label }) => ({ value, label })),
    [
      { value: "desktop", label: "PC 端" },
      { value: "mobile", label: "手机端" },
    ],
  );
});

test("custom-html 页面使用左右布局，不再渲染顶部横栏", () => {
  const pageSource = readFileSync(
    new URL("../page.tsx", import.meta.url),
    "utf8",
  );

  assert.equal(pageSource.includes("<header className="), false);
});
