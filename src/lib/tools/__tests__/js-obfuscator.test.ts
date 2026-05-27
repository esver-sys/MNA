import assert from "node:assert/strict";
import test from "node:test";
import vm from "node:vm";

import { transformJsCode } from "../js-obfuscator";

test("transformJsCode 无配置时只做压缩输出并保持可执行", async () => {
  const sourceCode = `
    const visibleValue = 42;
    const untouched = "keep";
    console.log(visibleValue, untouched);
  `;

  const outputCode = await transformJsCode({
    sourceCode,
    identifierTargets: [],
    stringLiteralTargets: [],
  });
  const logs: string[] = [];

  vm.runInNewContext(outputCode, {
    console: {
      log: (...values: unknown[]) => logs.push(values.join(",")),
    },
  });

  assert.equal(outputCode.includes("\n"), false);
  assert.equal(outputCode.includes("visibleValue"), true);
  assert.equal(outputCode.includes("keep"), true);
  assert.deepEqual(logs, ["42,keep"]);
});

test("transformJsCode 只改写指定变量名并保留未指定变量名", async () => {
  const outputCode = await transformJsCode({
    sourceCode:
      "const token = 1; const visibleValue = token + 1; console.log(token, visibleValue);",
    identifierTargets: ["token"],
    stringLiteralTargets: [],
  });
  const logs: string[] = [];

  vm.runInNewContext(outputCode, {
    console: {
      log: (...values: unknown[]) => logs.push(values.join(",")),
    },
  });

  assert.equal(outputCode.includes("token"), false);
  assert.equal(outputCode.includes("visibleValue"), true);
  assert.deepEqual(logs, ["1,2"]);
});

test("transformJsCode 不误改同名对象属性名", async () => {
  const outputCode = await transformJsCode({
    sourceCode:
      "const token = 1; const payload = { token: 2 }; console.log(token, payload.token);",
    identifierTargets: ["token"],
    stringLiteralTargets: [],
  });
  const logs: string[] = [];

  vm.runInNewContext(outputCode, {
    console: {
      log: (...values: unknown[]) => logs.push(values.join(",")),
    },
  });

  assert.equal(outputCode.includes("payload.token"), true);
  assert.deepEqual(logs, ["1,2"]);
});

test("transformJsCode 只改写指定字符串字面量并保留未指定字符串", async () => {
  const outputCode = await transformJsCode({
    sourceCode:
      "const hit = 'debug'; const keep = 'visible'; console.log(hit, keep);",
    identifierTargets: [],
    stringLiteralTargets: ["debug"],
  });
  const logs: string[] = [];

  vm.runInNewContext(outputCode, {
    console: {
      log: (...values: unknown[]) => logs.push(values.join(",")),
    },
  });

  assert.equal(outputCode.includes("debug"), false);
  assert.equal(outputCode.includes("visible"), true);
  assert.deepEqual(logs, ["debug,visible"]);
});

test("transformJsCode 会忽略重复项和未命中项", async () => {
  const outputCode = await transformJsCode({
    sourceCode: "const token = 'debug'; console.log(token);",
    identifierTargets: [" token ", "token", "missingName"],
    stringLiteralTargets: ["debug", " debug ", "missing-string"],
  });

  assert.equal(outputCode.includes("token"), false);
  assert.equal(outputCode.includes("debug"), false);
});

test("transformJsCode 会在输入为空白时抛出明确错误", async () => {
  await assert.rejects(
    () =>
      transformJsCode({
        sourceCode: "   \n\t  ",
        identifierTargets: [],
        stringLiteralTargets: [],
      }),
    /JS 代码不能为空/
  );
});
