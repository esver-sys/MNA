# Custom HTML Preview Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build `/custom-html` into a three-column HTML preview workspace with source configuration on the left, PC preview in the center, and phone preview on the right.

**Architecture:** Keep the feature local to `src/app/custom-html`. Extract small pure helpers for preview document generation and source metadata so behavior can be tested without rendering the page. The React page owns only local UI state and renders two sandboxed iframes from the same source.

**Tech Stack:** Next.js App Router, React client component, TypeScript, Tailwind CSS, Lucide icons, Node test runner with `tsx`.

---

### Task 1: Preview Helper Contract

**Files:**
- Create: `src/app/custom-html/custom-html-preview.ts`
- Create: `src/app/custom-html/__tests__/custom-html-preview.test.ts`

- [ ] **Step 1: Write the failing tests**

Create `src/app/custom-html/__tests__/custom-html-preview.test.ts`:

```ts
import assert from "node:assert/strict";
import test from "node:test";

import {
  buildPreviewDocument,
  EMPTY_SOURCE_MESSAGE,
  getSourceMeta,
} from "../custom-html-preview";

test("getSourceMeta 返回源码行数与字符数", () => {
  assert.equal(getSourceMeta("").label, "0 行 · 0 字符");
  assert.equal(getSourceMeta("<main>Hi</main>").label, "1 行 · 15 字符");
  assert.equal(getSourceMeta("<main>\n  Hi\n</main>").label, "3 行 · 19 字符");
});

test("buildPreviewDocument 将非空源码放入完整预览文档", () => {
  const doc = buildPreviewDocument("<h1>Hello</h1>");

  assert.match(doc, /<!doctype html>/i);
  assert.match(doc, /<meta name="viewport"/i);
  assert.match(doc, /<h1>Hello<\/h1>/);
});

test("buildPreviewDocument 为空源码生成空状态文档", () => {
  const doc = buildPreviewDocument("   \n ");

  assert.match(doc, /<!doctype html>/i);
  assert.match(doc, new RegExp(EMPTY_SOURCE_MESSAGE));
});
```

- [ ] **Step 2: Run tests and verify they fail**

Run:

```powershell
pnpm test src/app/custom-html/__tests__/custom-html-preview.test.ts
```

Expected: fail because `custom-html-preview.ts` does not exist.

- [ ] **Step 3: Implement the helper**

Create `src/app/custom-html/custom-html-preview.ts` with:

```ts
export const EMPTY_SOURCE_MESSAGE = "在左侧输入 HTML 源码后，这里会显示预览。";

export const DEFAULT_HTML_SOURCE = `...`;

export function getSourceMeta(source: string) {
  const lineCount = source.length === 0 ? 0 : source.split(/\r?\n/).length;

  return {
    lineCount,
    charCount: source.length,
    label: `${lineCount} 行 · ${source.length} 字符`,
  };
}

export function buildPreviewDocument(source: string) {
  if (source.trim().length === 0) {
    return `<!doctype html>...${EMPTY_SOURCE_MESSAGE}...</html>`;
  }

  return `<!doctype html>...${source}</html>`;
}
```

- [ ] **Step 4: Run tests and verify they pass**

Run:

```powershell
pnpm test src/app/custom-html/__tests__/custom-html-preview.test.ts
```

Expected: pass.

### Task 2: Three-Column Page UI

**Files:**
- Modify: `src/app/custom-html/page.tsx`
- Test: `src/app/custom-html/__tests__/custom-html-preview.test.ts`

- [ ] **Step 1: Replace the current page with the confirmed C layout**

Implement `src/app/custom-html/page.tsx` as a client component that:

1. Imports `DEFAULT_HTML_SOURCE`, `buildPreviewDocument`, and `getSourceMeta`.
2. Uses local state for `source`, `previewSource`, and `sourcePanelCollapsed`.
3. Renders a top toolbar with `加载示例`, `清空`, and `刷新预览`.
4. Renders left source panel, center PC iframe, right phone iframe.
5. Uses `sandbox="allow-same-origin"` and `srcDoc={buildPreviewDocument(previewSource)}`.

- [ ] **Step 2: Add Chinese comments for core logic**

Add concise Chinese comments before:

1. Preview document memoization.
2. Source panel collapse behavior.
3. iframe sandbox usage.

- [ ] **Step 3: Run automated checks**

Run:

```powershell
pnpm test
pnpm build
```

Expected: both commands complete successfully.

### Task 3: Browser Verification

**Files:**
- Verify: `src/app/custom-html/page.tsx`

- [ ] **Step 1: Start or reuse the dev server**

Run:

```powershell
pnpm dev
```

Expected: Next.js serves the app at `http://localhost:3124`.

- [ ] **Step 2: Open and inspect the page**

Open:

```text
http://localhost:3124/custom-html
```

Verify:

1. Source configuration is on the left.
2. PC preview is centered and wider than the phone preview.
3. Phone preview appears on the right inside a device frame.
4. `清空` shows empty state in both previews.
5. `加载示例` restores content.
6. `刷新预览` syncs edited source into both previews.

