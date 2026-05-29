export interface HomeCardTheme {
  accent: string;
  badge: string;
  glow: string;
  iconPanel: string;
  progress: string;
  ring: string;
}

export const homeCardThemes: Record<string, HomeCardTheme> = {
  default: {
    accent: "from-slate-500 to-zinc-700",
    badge:
      "bg-slate-100 text-slate-700 dark:bg-slate-500/15 dark:text-slate-200",
    glow: "shadow-slate-500/15",
    iconPanel: "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-950",
    progress: "from-slate-400 to-zinc-600",
    ring: "ring-slate-400/20",
  },
  "github-repo": {
    accent: "from-cyan-500 to-blue-600",
    badge: "bg-cyan-50 text-cyan-700 dark:bg-cyan-400/10 dark:text-cyan-200",
    glow: "shadow-cyan-500/20",
    iconPanel: "bg-cyan-600 text-white",
    progress: "from-cyan-400 to-blue-500",
    ring: "ring-cyan-400/25",
  },
  "svg-base64": {
    accent: "from-violet-500 to-fuchsia-600",
    badge:
      "bg-violet-50 text-violet-700 dark:bg-violet-400/10 dark:text-violet-200",
    glow: "shadow-violet-500/20",
    iconPanel: "bg-violet-600 text-white",
    progress: "from-violet-400 to-fuchsia-500",
    ring: "ring-violet-400/25",
  },
  "spa-version": {
    accent: "from-emerald-500 to-teal-600",
    badge:
      "bg-emerald-50 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-200",
    glow: "shadow-emerald-500/20",
    iconPanel: "bg-emerald-600 text-white",
    progress: "from-emerald-400 to-teal-500",
    ring: "ring-emerald-400/25",
  },
  "img-converter": {
    accent: "from-amber-400 to-orange-600",
    badge:
      "bg-amber-50 text-amber-800 dark:bg-amber-400/10 dark:text-amber-200",
    glow: "shadow-amber-500/20",
    iconPanel: "bg-amber-500 text-slate-950",
    progress: "from-amber-300 to-orange-500",
    ring: "ring-amber-400/25",
  },
  "js-obfuscator": {
    accent: "from-rose-500 to-red-600",
    badge: "bg-rose-50 text-rose-700 dark:bg-rose-400/10 dark:text-rose-200",
    glow: "shadow-rose-500/20",
    iconPanel: "bg-rose-600 text-white",
    progress: "from-rose-400 to-red-500",
    ring: "ring-rose-400/25",
  },
  "custom-html": {
    accent: "from-sky-500 to-indigo-600",
    badge: "bg-sky-50 text-sky-700 dark:bg-sky-400/10 dark:text-sky-200",
    glow: "shadow-sky-500/20",
    iconPanel: "bg-sky-600 text-white",
    progress: "from-sky-400 to-indigo-500",
    ring: "ring-sky-400/25",
  },
};

// 用稳定的 id 映射替代随机色，避免服务端渲染与客户端水合时出现颜色不一致。
export const getHomeCardTheme = (id: string) => {
  return homeCardThemes[id] ?? homeCardThemes.default;
};
