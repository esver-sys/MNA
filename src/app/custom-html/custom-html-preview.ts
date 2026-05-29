export const EMPTY_SOURCE_MESSAGE = "在左侧输入 HTML 源码后，这里会显示预览。";

export const PREVIEW_VIEWPORTS = {
  // 预览视口尺寸作为单一配置源，页面展示文案与 iframe 画布共用，避免两端尺寸不一致。
  desktop: {
    width: 1280,
    height: 720,
    label: "1280x720",
  },
  mobile: {
    width: 350,
    height: 700,
    label: "350x700",
  },
} as const;

export type PreviewMode = keyof typeof PREVIEW_VIEWPORTS;

export const DEFAULT_PREVIEW_MODE: PreviewMode = "desktop";

// 预览模式作为按钮组的单一数据源，确保页面一次只选择并渲染一个端的预览。
export const PREVIEW_MODE_OPTIONS = [
  {
    value: "desktop",
    label: "PC 端",
    description: `固定 ${PREVIEW_VIEWPORTS.desktop.label}，适合检查桌面端横向结构。`,
  },
  {
    value: "mobile",
    label: "手机端",
    description: "固定窄屏，快速检查移动端换行与堆叠。",
  },
] as const satisfies ReadonlyArray<{
  value: PreviewMode;
  label: string;
  description: string;
}>;


export interface SourceMeta {
  lineCount: number;
  charCount: number;
  label: string;
}

export function getSourceMeta(source: string): SourceMeta {
  const lineCount = source.length === 0 ? 0 : source.split(/\r?\n/).length;

  return {
    lineCount,
    charCount: source.length,
    label: `${lineCount} 行 · ${source.length} 字符`,
  };
}


