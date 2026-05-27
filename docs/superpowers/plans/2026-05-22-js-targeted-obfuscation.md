# JS Targeted Obfuscation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor `/tools/js-obfuscator` from whole-file obfuscation into a three-panel tool that minifies all source code and only rewrites user-specified variable names and string literals.

**Architecture:** Keep the existing Next.js page/API structure, but replace the current `javascript-obfuscator` based core with an AST-based transform plus minification. The client submits source code, variable-name targets, and string-literal targets; the server returns compact output code.

**Tech Stack:** Next.js App Router, React, TypeScript, Ant Design message, Lucide icons, Babel parser/traverse/generator, Terser, Node test runner with `tsx`.

---

### Task 1: Core Transform Tests

**Files:**
- Modify: `src/lib/tools/__tests__/js-obfuscator.test.ts`
- Modify later: `src/lib/tools/js-obfuscator.ts`

- [ ] **Step 1: Write failing tests for the new contract**

Replace the old whole-file obfuscation tests with tests that import `transformJsCode` and cover:

```ts
import assert from "node:assert/strict";
import test from "node:test";
import vm from "node:vm";

import { transformJsCode } from "../js-obfuscator";

test("transformJsCode 无配置时只做压缩输出并保持可执行", () => {
  const sourceCode = `
    const visibleValue = 42;
    const untouched = "keep";
    console.log(visibleValue, untouched);
  `;

  const outputCode = transformJsCode({
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

test("transformJsCode 只改写指定变量名并保留未指定变量名", () => {
  const outputCode = transformJsCode({
    sourceCode: "const token = 1; const visibleValue = token + 1; console.log(token, visibleValue);",
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

test("transformJsCode 不误改同名对象属性名", () => {
  const outputCode = transformJsCode({
    sourceCode: "const token = 1; const payload = { token: 2 }; console.log(token, payload.token);",
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

test("transformJsCode 只改写指定字符串字面量并保留未指定字符串", () => {
  const outputCode = transformJsCode({
    sourceCode: "const hit = 'debug'; const keep = 'visible'; console.log(hit, keep);",
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

test("transformJsCode 会忽略重复项和未命中项", () => {
  const outputCode = transformJsCode({
    sourceCode: "const token = 'debug'; console.log(token);",
    identifierTargets: [" token ", "token", "missingName"],
    stringLiteralTargets: ["debug", " debug ", "missing-string"],
  });

  assert.equal(outputCode.includes("token"), false);
  assert.equal(outputCode.includes("debug"), false);
});

test("transformJsCode 会在输入为空白时抛出明确错误", () => {
  assert.throws(
    () =>
      transformJsCode({
        sourceCode: "   \n\t  ",
        identifierTargets: [],
        stringLiteralTargets: [],
      }),
    /JS 代码不能为空/
  );
});
```

- [ ] **Step 2: Run tests and verify they fail**

Run:

```powershell
pnpm test src/lib/tools/__tests__/js-obfuscator.test.ts
```

Expected: FAIL because `transformJsCode` is not exported yet and the old implementation still performs whole-file obfuscation.

### Task 2: AST Transform Core

**Files:**
- Modify: `package.json`
- Modify: `pnpm-lock.yaml`
- Modify: `src/lib/tools/js-obfuscator.ts`
- Test: `src/lib/tools/__tests__/js-obfuscator.test.ts`

- [ ] **Step 1: Install transform dependencies**

Run:

```powershell
pnpm add @babel/generator @babel/parser @babel/traverse @babel/types terser
pnpm add -D @types/babel__generator @types/babel__traverse
```

Expected: package and lockfile update successfully.

- [ ] **Step 2: Implement the minimal AST transform**

Replace `src/lib/tools/js-obfuscator.ts` with an implementation that:

- Defines `transformJsCode({ sourceCode, identifierTargets, stringLiteralTargets })`.
- Cleans duplicate/blank targets.
- Parses source with Babel.
- Renames only bindings whose names match `identifierTargets`.
- Replaces only string literals whose values match `stringLiteralTargets`.
- Generates code, then minifies with Terser using `mangle: false`.
- Throws clear Chinese errors for empty source and parse/minify failures.

- [ ] **Step 3: Run core tests**

Run:

```powershell
pnpm test src/lib/tools/__tests__/js-obfuscator.test.ts
```

Expected: PASS.

### Task 3: API Contract Update

**Files:**
- Modify: `src/app/api/tools/js-obfuscator/route.ts`
- Test: `src/lib/tools/__tests__/js-obfuscator.test.ts`

- [ ] **Step 1: Update request/response names**

Change the API to accept:

```ts
{
  sourceCode: string;
  identifierTargets: string[];
  stringLiteralTargets: string[];
}
```

Return:

```ts
{
  outputCode: string;
}
```

- [ ] **Step 2: Keep server-side validation**

Validate `sourceCode` is a string. Normalize missing target arrays to empty arrays. Return `{ error }` with status `400` for invalid input or transform errors.

- [ ] **Step 3: Run tests**

Run:

```powershell
pnpm test src/lib/tools/__tests__/js-obfuscator.test.ts
```

Expected: PASS.

### Task 4: Configuration Form UI

**Files:**
- Create: `src/components/tools/js-obfuscator/FeatureTargetPanel.tsx`
- Modify: `src/app/(root)/tools/js-obfuscator/page.tsx`
- Modify: `src/components/tools/js-obfuscator/CodeEditorPanel.tsx` only if needed for layout support

- [ ] **Step 1: Create the reusable form list component**

Create `FeatureTargetPanel.tsx` with props:

```ts
interface FeatureTargetPanelProps {
  title: string;
  description: string;
  values: string[];
  placeholder: string;
  disabled?: boolean;
  onChange: (values: string[]) => void;
}
```

It should render dynamic rows with Add/Delete buttons and keep at least one row visible.

- [ ] **Step 2: Update the page state**

In `page.tsx`, replace `obfuscatedCode` with `outputCode`, add:

```ts
const [identifierTargets, setIdentifierTargets] = useState([""]);
const [stringLiteralTargets, setStringLiteralTargets] = useState([""]);
```

Add helper `sanitizeTargets(values: string[]): string[]`.

- [ ] **Step 3: Update the submit request**

POST to `/api/tools/js-obfuscator` with `sourceCode`, `identifierTargets`, and `stringLiteralTargets`, and read `outputCode` from the response.

- [ ] **Step 4: Update layout to three panels**

Use a desktop grid that gives source/result more room and config less room, e.g.:

```tsx
<section className="grid flex-1 grid-cols-1 gap-4 pb-6 2xl:grid-cols-[minmax(0,1.25fr)_360px_minmax(0,1.25fr)]">
```

The middle column contains `FeatureTargetPanel` for variable names and string literals.

- [ ] **Step 5: Update copy**

Use subtitle:

```txt
整体仅压缩，按配置定向处理变量名与字符串字面量。
```

Rename main button to `开始处理`.

### Task 5: Verification

**Files:**
- No expected source changes unless verification finds a defect.

- [ ] **Step 1: Run focused tests**

Run:

```powershell
pnpm test src/lib/tools/__tests__/js-obfuscator.test.ts
```

Expected: PASS.

- [ ] **Step 2: Run lint**

Run:

```powershell
pnpm lint
```

Expected: command succeeds; existing unrelated warnings may remain.

- [ ] **Step 3: Run build**

Run:

```powershell
pnpm build
```

Expected: current repository may still fail on pre-existing missing `next-intl` in `src/components/LocaleSwitcher.tsx`; confirm no new js-obfuscator type errors appear before that failure.

- [ ] **Step 4: Browser smoke test**

Run dev server on an available port and open `/tools/js-obfuscator`. Enter code, add variable target `token` and string target `debug`, click `开始处理`, and confirm the output no longer contains `token` or `debug` while still executing equivalent behavior.
