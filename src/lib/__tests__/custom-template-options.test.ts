import assert from "node:assert/strict";
import test from "node:test";

import { templateOptions } from "../../app/(root)/custom/template-options";

test("templateOptions 包含默认模板并可用于下拉选择", () => {
  assert.deepEqual(templateOptions, [
    {
      label: "template-cleaner-product",
      value: "template-cleaner-product",
    },
  ]);
});
