"use client";

import React, { useMemo, useState } from "react";
import {
  Code2,
  Copy,
  Eraser,
  FileCode2,
  Monitor,
  PanelLeftClose,
  PanelLeftOpen,
  RefreshCw,
  Smartphone,
  WandSparkles,
} from "lucide-react";
import { message } from "antd";

import {
  DEFAULT_PREVIEW_MODE,
  PREVIEW_MODE_OPTIONS,
  PREVIEW_VIEWPORTS,
  type PreviewMode,
  getSourceMeta,
} from "./custom-html-preview";

interface ToolbarButtonProps {
  children: React.ReactNode;
  icon: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary";
}

function ToolbarButton({
  children,
  icon,
  onClick,
  disabled = false,
  variant = "secondary",
}: ToolbarButtonProps) {
  const variantClassName =
    variant === "primary"
      ? "border-blue-500 bg-blue-600 text-white shadow-lg shadow-blue-950/18 hover:bg-blue-500"
      : "border-slate-700 bg-slate-900 text-slate-200 hover:border-slate-500 hover:text-white";

  return (
    <button
      type="button"
      className={`inline-flex h-10 items-center justify-center gap-2 rounded-lg border px-3.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 ${variantClassName}`}
      disabled={disabled}
      onClick={onClick}
    >
      {icon}
      {children}
    </button>
  );
}

export default function Page() {
  const [source, setSource] = useState('');
  const [previewSource, setPreviewSource] = useState('');
  const [sourcePanelCollapsed, setSourcePanelCollapsed] = useState(false);
  const [previewMode, setPreviewMode] = useState<PreviewMode>(DEFAULT_PREVIEW_MODE);

  const sourceMeta = useMemo(() => getSourceMeta(source), [source]);
  const previewMeta = useMemo(() => getSourceMeta(previewSource), [previewSource]);
  const hasPendingPreview = source !== previewSource;
  const activePreviewViewport = PREVIEW_VIEWPORTS[previewMode];
  const activePreviewMode = PREVIEW_MODE_OPTIONS.find(
    ({ value }) => value === previewMode,
  ) ?? PREVIEW_MODE_OPTIONS[0];

  function handleRefreshPreview() {
    setPreviewSource(source);
    message.success("预览已刷新");
  }

  function handleLoadSample() {
    message.success("已加载示例源码");
  }

  function handleClear() {
    setSource("");
    setPreviewSource("");
    message.success("源码与预览已清空");
  }

  async function handleCopySource() {
    if (source.length === 0) {
      message.warning("当前没有可复制的源码");
      return;
    }

    try {
      await navigator.clipboard.writeText(source);
      message.success("源码已复制");
    } catch {
      message.error("复制失败，请手动复制");
    }
  }

  const layoutClassName = [
    "grid min-h-0 grid-cols-1 gap-4 lg:h-full",
    sourcePanelCollapsed
      ? "lg:grid-cols-[72px_minmax(0,1fr)]"
      : "lg:grid-cols-[360px_minmax(0,1fr)]",
  ].join(" ");

  return (
    <main className="h-dvh overflow-auto bg-slate-100 p-4 text-slate-950">
      <div className={layoutClassName}>
          <aside className="min-h-[420px] overflow-hidden rounded-lg border border-slate-800 bg-slate-950 text-slate-100 shadow-[0_24px_80px_-52px_rgba(15,23,42,0.9)]">
            {/* 折叠后只保留一个窄控制条，让单预览区在桌面端获得更多可检查宽度。 */}
            {sourcePanelCollapsed ? (
              <div className="flex h-full flex-col items-center gap-4 px-3 py-4">
                <button
                  type="button"
                  aria-label="展开源码配置"
                  className="grid size-11 place-items-center rounded-lg border border-slate-700 bg-slate-900 text-slate-200 transition hover:border-slate-500 hover:text-white"
                  onClick={() => setSourcePanelCollapsed(false)}
                >
                  <PanelLeftOpen aria-hidden="true" className="size-5" />
                </button>
                <div className="flex flex-1 items-center justify-center">
                  <span className="origin-center rotate-90 whitespace-nowrap text-xs font-semibold tracking-normal text-slate-400">
                    源码配置
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex h-full min-h-[560px] flex-col">
                <div className="border-b border-slate-800 px-4 py-4">
                  <div className="inline-flex h-8 items-center gap-2 rounded-md border border-blue-400/20 bg-blue-400/10 px-3 text-xs font-semibold text-blue-200">
                    <FileCode2 aria-hidden="true" className="size-4" />
                    Custom HTML
                  </div>
                  <h1 className="mt-3 text-xl font-semibold tracking-normal text-white">
                    双端 HTML 预览工作台
                  </h1>
                  <p className="mt-1 text-xs leading-5 text-slate-400">
                    左侧编辑源码，右侧通过按钮在 PC 端和手机端之间切换预览。
                  </p>

                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <ToolbarButton
                      icon={<WandSparkles aria-hidden="true" className="size-4" />}
                      onClick={handleLoadSample}
                    >
                      加载示例
                    </ToolbarButton>
                    <ToolbarButton
                      icon={<Copy aria-hidden="true" className="size-4" />}
                      onClick={handleCopySource}
                    >
                      复制源码
                    </ToolbarButton>
                    <ToolbarButton
                      icon={<Eraser aria-hidden="true" className="size-4" />}
                      onClick={handleClear}
                      disabled={source.length === 0 && previewSource.length === 0}
                    >
                      清空
                    </ToolbarButton>
                    <ToolbarButton
                      icon={<RefreshCw aria-hidden="true" className="size-4" />}
                      onClick={handleRefreshPreview}
                      variant="primary"
                    >
                      刷新预览
                    </ToolbarButton>
                  </div>
                </div>

                <div className="flex items-start justify-between gap-3 border-b border-slate-800 px-4 py-4">
                  <div>
                    <label
                      htmlFor="custom-html-source"
                      className="flex items-center gap-2 text-sm font-semibold text-white"
                    >
                      <Code2 aria-hidden="true" className="size-4 text-blue-300" />
                      源码配置
                    </label>
                    <p className="mt-1 text-xs leading-5 text-slate-400">
                      支持 HTML 片段、完整 HTML 文档和内联 CSS。
                    </p>
                  </div>
                  <button
                    type="button"
                    aria-label="折叠源码配置"
                    className="grid size-9 shrink-0 place-items-center rounded-lg border border-slate-700 bg-slate-900 text-slate-300 transition hover:border-slate-500 hover:text-white"
                    onClick={() => setSourcePanelCollapsed(true)}
                  >
                    <PanelLeftClose aria-hidden="true" className="size-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
                  <span
                    className={`inline-flex h-7 items-center rounded-md px-2.5 text-xs font-semibold ${
                      hasPendingPreview
                        ? "bg-amber-400/15 text-amber-200"
                        : "bg-emerald-400/15 text-emerald-200"
                    }`}
                  >
                    {hasPendingPreview ? "待刷新" : "已同步"}
                  </span>
                  <span className="text-xs text-slate-500">{sourceMeta.label}</span>
                </div>

                <textarea
                  id="custom-html-source"
                  value={source}
                  spellCheck={false}
                  onChange={(event) => setSource(event.target.value)}
                  placeholder="在这里粘贴 HTML 源码..."
                  className="min-h-[360px] flex-1 resize-none bg-slate-950 px-4 py-4 font-mono text-sm leading-7 text-slate-100 outline-none placeholder:text-slate-600"
                />

                <div className="grid grid-cols-2 gap-2 border-t border-slate-800 p-3">
                  <button
                    type="button"
                    className="h-10 rounded-lg border border-slate-700 bg-slate-900 text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:text-white"
                    onClick={handleCopySource}
                  >
                    复制
                  </button>
                  <button
                    type="button"
                    className="h-10 rounded-lg border border-slate-700 bg-slate-900 text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:text-white disabled:cursor-not-allowed disabled:text-slate-600"
                    disabled={source.length === 0}
                    onClick={() => setSource("")}
                  >
                    清空源码
                  </button>
                </div>
              </div>
            )}
          </aside>

          <section className="min-w-0 flex min-h-[560px] flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_24px_80px_-58px_rgba(15,23,42,0.72)]">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-4 py-3">
              <div>
                <h2 className="flex items-center gap-2 text-sm font-semibold text-slate-950">
                  {previewMode === "desktop" ? (
                    <Monitor aria-hidden="true" className="size-4 text-blue-600" />
                  ) : (
                    <Smartphone aria-hidden="true" className="size-4 text-emerald-600" />
                  )}
                  {activePreviewMode.label}预览
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  {activePreviewMode.description}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-end gap-2">
                <div
                  aria-label="切换预览端"
                  className="flex rounded-lg border border-slate-200 bg-slate-100 p-1"
                  role="group"
                >
                  {PREVIEW_MODE_OPTIONS.map((mode) => {
                    const isSelected = mode.value === previewMode;
                    const PreviewIcon = mode.value === "desktop" ? Monitor : Smartphone;

                    return (
                      <button
                        key={mode.value}
                        type="button"
                        aria-pressed={isSelected}
                        className={`inline-flex h-8 items-center justify-center gap-1.5 whitespace-nowrap rounded-md px-2.5 text-xs font-semibold transition ${
                          isSelected
                            ? "bg-white text-slate-950 shadow-sm"
                            : "text-slate-500 hover:text-slate-900"
                        }`}
                        onClick={() => setPreviewMode(mode.value)}
                      >
                        <PreviewIcon aria-hidden="true" className="size-3.5" />
                        {mode.label}
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span>{previewMeta.label}</span>
                  <span className="rounded-md bg-slate-100 px-2 py-1 font-semibold text-slate-600">
                    {activePreviewViewport.label}
                  </span>
                </div>
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-auto bg-slate-100 p-4 flex justify-center items-center">
              {/* 关键逻辑：只按当前按钮态渲染一个预览外框，避免 PC 与手机端同时占用页面空间。 */}
              {previewMode === "desktop" ? (
                <div
                  className="overflow-hidden rounded-lg border border-gray-200 bg-white"
                  style={{
                    width: activePreviewViewport.width,
                    height: activePreviewViewport.height,
                    backgroundImage:
                      "linear-gradient(rgba(15,23,42,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.05) 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                  }}
                >
                  {/* iframe 固定为 PC 设计稿视口，外层滚动容器负责承载超出区域，不压缩预览内容。 */}
                  <iframe
                    title="PC 端 HTML 预览"
                    sandbox=""
                    srcDoc={previewSource}
                    className="h-full w-full border-0 bg-white"
                  />
                </div>
              ) : (
                <div
                  className="mx-auto shrink-0 rounded-[32px] border-[5px] border-slate-950 bg-slate-950 p-2"
                  style={{ width: activePreviewViewport.width + 25 }}
                >
                  <div className="mx-auto mb-3 h-1.5 w-16 rounded-full bg-slate-700" />
                  <div
                    className="overflow-hidden rounded-[22px] bg-white"
                    style={{
                      width: activePreviewViewport.width,
                      height: activePreviewViewport.height,
                    }}
                  >
                    {/* 手机 iframe 固定为移动端设计稿视口，便于和真实移动首屏尺寸对齐检查。 */}
                    <iframe
                      title="手机端 HTML 预览"
                      sandbox=""
                      srcDoc={previewSource}
                      className="h-full w-full border-0 bg-white"
                    />
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
    </main>
  );
}
