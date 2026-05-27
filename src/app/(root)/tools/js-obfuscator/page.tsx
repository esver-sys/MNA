"use client";

import React, { useMemo, useState } from "react";
import {
  Copy,
  Eraser,
  ShieldEllipsis,
  Sparkles,
} from "lucide-react";
import { message } from "antd";

import { CodeEditorPanel } from "@/components/tools/js-obfuscator/CodeEditorPanel";
import { FeatureTargetPanel } from "@/components/tools/js-obfuscator/FeatureTargetPanel";

type ObfuscationStatus = "idle" | "success" | "error";

const INPUT_PLACEHOLDER = `function hello(name) {
  const message = "Hello, " + name;
  console.log(message);
}

hello("world");`;

const OUTPUT_PLACEHOLDER =
  "混淆结果会显示在这里。输出区域支持直接复制。";

function getCodeMeta(code: string): string {
  const lineCount = code.length === 0 ? 0 : code.split(/\r?\n/).length;
  return `${lineCount} 行 · ${code.length} 字符`;
}

function sanitizeTargets(values: string[]): string[] {
  return Array.from(
    new Set(
      values
        .map((value) => value.trim())
        .filter((value) => value.length > 0)
    )
  );
}

export default function JsObfuscatorPage() {
  const [sourceCode, setSourceCode] = useState("");
  const [outputCode, setOutputCode] = useState("");
  const [identifierTargets, setIdentifierTargets] = useState([""]);
  const [stringLiteralTargets, setStringLiteralTargets] = useState([""]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<ObfuscationStatus>("idle");

  const statusNode = useMemo(() => {
    const statusMap: Record<
      ObfuscationStatus,
      { label: string; className: string }
    > = {
      idle: {
        label: "等待处理",
        className: "border-slate-700 bg-slate-800 text-slate-300",
      },
      success: {
        label: "处理完成",
        className: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
      },
      error: {
        label: "处理失败",
        className: "border-red-500/30 bg-red-500/10 text-red-300",
      },
    };

    const currentStatus = statusMap[status];

    return (
      <span
        className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${currentStatus.className}`}
      >
        {currentStatus.label}
      </span>
    );
  }, [status]);

  async function handleObfuscate() {
    if (sourceCode.trim().length === 0) {
      message.warning("请先输入需要处理的 JS 代码");
      return;
    }

    const cleanedIdentifierTargets = sanitizeTargets(identifierTargets);
    const cleanedStringLiteralTargets = sanitizeTargets(stringLiteralTargets);

    setLoading(true);
    setStatus("idle");
    setOutputCode("");

    try {
      const response = await fetch("/api/tools/js-obfuscator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sourceCode,
          identifierTargets: cleanedIdentifierTargets,
          stringLiteralTargets: cleanedStringLiteralTargets,
        }),
      });

      const result = (await response.json()) as {
        error?: string;
        outputCode?: string;
      };

      if (!response.ok || typeof result.outputCode !== "string") {
        throw new Error(result.error || "JS 定向处理失败");
      }

      setOutputCode(result.outputCode);
      setStatus("success");
      message.success("JS 定向处理完成");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "JS 定向处理失败";

      setStatus("error");
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  function handleClear() {
    setSourceCode("");
    setOutputCode("");
    setIdentifierTargets([""]);
    setStringLiteralTargets([""]);
    setStatus("idle");
  }

  async function handleCopy() {
    if (!outputCode) {
      return;
    }

    try {
      await navigator.clipboard.writeText(outputCode);
      message.success("混淆结果已复制");
    } catch {
      message.error("复制失败，请手动复制");
    }
  }

  return (
    <div className="h-full overflow-auto bg-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-full max-w-[1600px] flex-col px-6 py-6 lg:px-8">
        <header className="border-b border-slate-800 pb-6">
          <span className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs font-medium text-slate-300">
            极简模式
          </span>
          <div className="mt-4 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="flex items-center gap-3 text-3xl font-semibold tracking-tight text-white">
                <ShieldEllipsis className="h-8 w-8 text-blue-400" />
                JS 代码混淆
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                整体仅压缩，按配置定向处理变量名与字符串字面量。
              </p>
            </div>
            <div className="text-sm text-slate-500">
              源码、配置与结果分区对照
            </div>
          </div>
        </header>

        <section className="py-5">
          <div className="flex flex-col gap-4 rounded-xl border border-slate-800 bg-slate-900/80 px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-sm font-semibold text-slate-100">核心操作</h2>
              <p className="mt-1 text-xs leading-5 text-slate-400">
                主按钮负责执行定向处理与整体压缩，清空会同时重置源码、配置与结果。
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleObfuscate}
                disabled={loading || sourceCode.trim().length === 0}
                className="inline-flex h-11 min-w-[144px] items-center justify-center gap-2 rounded-lg bg-blue-500 px-5 text-sm font-medium text-slate-950 transition hover:bg-blue-400 disabled:cursor-not-allowed disabled:bg-slate-800 disabled:text-slate-500"
              >
                <Sparkles className="h-4 w-4" />
                {loading ? "处理中..." : "开始处理"}
              </button>

              <button
                type="button"
                onClick={handleClear}
                disabled={
                  loading ||
                  (sourceCode.length === 0 &&
                    outputCode.length === 0 &&
                    identifierTargets.every((value) => value.length === 0) &&
                    stringLiteralTargets.every((value) => value.length === 0))
                }
                className="inline-flex h-11 min-w-[112px] items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-950 px-5 text-sm font-medium text-slate-200 transition hover:border-slate-500 hover:text-white disabled:cursor-not-allowed disabled:border-slate-800 disabled:text-slate-600"
              >
                <Eraser className="h-4 w-4" />
                清空
              </button>

              <button
                type="button"
                onClick={handleCopy}
                disabled={!outputCode}
                className="inline-flex h-11 min-w-[128px] items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-950 px-5 text-sm font-medium text-slate-200 transition hover:border-slate-500 hover:text-white disabled:cursor-not-allowed disabled:border-slate-800 disabled:text-slate-600"
              >
                <Copy className="h-4 w-4" />
                复制结果
              </button>
            </div>
          </div>
        </section>

        <section className="grid flex-1 grid-cols-1 gap-4 pb-6 2xl:grid-cols-[minmax(0,1.25fr)_360px_minmax(0,1.25fr)]">
          <CodeEditorPanel
            title="输入 JS 代码"
            description="粘贴原始代码后发起处理。输入区不会在失败时被清空。"
            value={sourceCode}
            placeholder={INPUT_PLACEHOLDER}
            disabled={loading}
            metaText={getCodeMeta(sourceCode)}
            onChange={setSourceCode}
            statusNode={
              <span className="inline-flex items-center rounded-full border border-slate-700 bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-300">
                可编辑
              </span>
            }
          />

          <div className="flex flex-col gap-4">
            <FeatureTargetPanel
              title="变量名"
              description="仅处理这里列出的变量名。未填写的变量名保持原样。"
              values={identifierTargets}
              placeholder="例如：token"
              disabled={loading}
              onChange={setIdentifierTargets}
            />

            <FeatureTargetPanel
              title="字符串字面量"
              description="仅处理这里列出的字符串内容。未填写的字符串保持原样。"
              values={stringLiteralTargets}
              placeholder="例如：debug"
              disabled={loading}
              onChange={setStringLiteralTargets}
            />
          </div>

          <CodeEditorPanel
            title="处理结果"
            description="处理成功后会在这里展示压缩后的结果，可直接复制到其他环境使用。"
            value={outputCode}
            placeholder={OUTPUT_PLACEHOLDER}
            readOnly
            metaText={getCodeMeta(outputCode)}
            statusNode={statusNode}
          />
        </section>
      </div>
    </div>
  );
}
