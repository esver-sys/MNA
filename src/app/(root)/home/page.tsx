import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Boxes,
  ExternalLink,
  GitBranch,
  Image as ImageIcon,
  RefreshCw,
  Rocket,
  ShieldCheck,
  Sparkles,
  WandSparkles,
} from "lucide-react";

import homeBlocksConfig from "@/config/home-blocks.json";
import { ImageConverterCard } from "@/components/home/ImageConverterCard";
import {
  getHomeCardTheme,
  type HomeCardTheme,
} from "@/components/home/home-card-theme";

interface BlockConfig {
  id: string;
  type: string;
  title: string;
  description: string;
  url?: string;
  icon?: string;
  size: "small" | "medium" | "large";
  stats?: {
    count: number;
    label: string;
  };
  status?: {
    progress: number;
    label: string;
  };
  items?: string[];
}

interface HomeBlocksConfig {
  blocks: BlockConfig[];
  layout: {
    columns: number;
    gap: string;
    maxWidth: string;
  };
  styles: {
    cardBase: string;
    titleBase: string;
    descriptionBase: string;
  };
}

const config = homeBlocksConfig as HomeBlocksConfig;

const iconMap: Record<
  string,
  React.ComponentType<React.SVGProps<SVGSVGElement>>
> = {
  book: BookOpen,
  gitlab: GitBranch,
  progress: Rocket,
  update: WandSparkles,
};

const sizeClassMap: Record<BlockConfig["size"], string> = {
  small: "min-h-[148px]",
  medium: "min-h-[188px]",
  large: "min-h-[280px] md:col-span-2",
};

const summaryItems = [
  {
    label: "工具入口",
    value: config.blocks.length,
    hint: "个",
  },
  {
    label: "本地任务",
    value: config.blocks.filter((block) => block.url?.startsWith("/tools"))
      .length,
    hint: "项",
  },
  {
    label: "快捷导航",
    value: config.blocks.filter((block) => block.type === "link-card").length,
    hint: "组",
  },
];

const getIconComponent = (icon?: string) => {
  return icon ? iconMap[icon] ?? Boxes : Boxes;
};

type HomeMotionStyle = React.CSSProperties & {
  "--home-motion-delay": string;
};

const getMotionStyle = (index: number): HomeMotionStyle => {
  return {
    "--home-motion-delay": `${Math.min(index * 55, 260)}ms`,
  };
};

const getCardShellClassName = (block: BlockConfig, theme: HomeCardTheme) => {
  return [
    "home-card-surface home-card-enter group relative isolate h-full overflow-hidden rounded-lg border border-white/70 bg-white/80 p-5",
    "shadow-[0_24px_60px_-34px_rgba(15,23,42,0.72)] backdrop-blur-xl",
    "hover:border-white",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-100",
    "dark:border-white/10 dark:bg-slate-950/75 dark:shadow-[0_26px_70px_-34px_rgba(0,0,0,0.95)] dark:focus-visible:ring-offset-slate-950",
    sizeClassMap[block.size],
    theme.ring,
    theme.glow,
  ].join(" ");
};

const CardChrome = ({ theme }: { theme: HomeCardTheme }) => {
  return (
    <>
      {/* 顶部高光和底部阴影共同建立卡片厚度，避免只靠大阴影造成漂浮感。 */}
      <span
        aria-hidden="true"
        className="home-card-shine pointer-events-none absolute -top-12 bottom-[-48px] left-[-42%] z-20 w-[38%]"
      />
      <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/90 dark:bg-white/20" />
      <span
        className={`pointer-events-none absolute inset-x-4 top-0 h-1 rounded-b-full bg-linear-to-r ${theme.accent}`}
      />
      <span className="pointer-events-none absolute inset-x-5 bottom-0 h-8 rounded-[50%] bg-slate-950/8 blur-2xl dark:bg-black/45" />
    </>
  );
};

const CardBadge = ({
  children,
  theme,
}: {
  children: React.ReactNode;
  theme: HomeCardTheme;
}) => {
  return (
    <span
      className={`inline-flex h-7 items-center rounded-md px-2.5 text-xs font-semibold ${theme.badge}`}
    >
      {children}
    </span>
  );
};

const LinkCard: React.FC<{ block: BlockConfig; index: number }> = ({
  block,
  index,
}) => {
  const theme = getHomeCardTheme(block.id);
  const IconComponent = getIconComponent(block.icon);
  const isExternal = block.url?.startsWith("http");

  const cardContent = (
    <article className={getCardShellClassName(block, theme)} style={getMotionStyle(index)}>
      <CardChrome theme={theme} />

      <div className="relative z-10 flex h-full flex-col justify-between gap-5">
        <div className="flex items-start justify-between gap-4">
          <div
            className={`home-icon-motion grid size-12 shrink-0 place-items-center rounded-lg shadow-lg shadow-slate-950/12 ${theme.iconPanel}`}
          >
            <IconComponent aria-hidden="true" className="size-6" />
          </div>
          <CardBadge theme={theme}>{isExternal ? "外部" : "内部"}</CardBadge>
        </div>

        <div>
          <h3 className="text-lg font-semibold leading-snug text-slate-950 dark:text-white">
            {block.title}
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
            {block.description}
          </p>
        </div>

        <div className="flex items-center justify-between border-t border-slate-200/70 pt-4 text-sm font-medium text-slate-700 dark:border-white/10 dark:text-slate-200">
          <span>立即进入</span>
          {isExternal ? (
            <ExternalLink aria-hidden="true" className="size-4" />
          ) : (
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform duration-300 group-hover:translate-x-1"
            />
          )}
        </div>
      </div>
    </article>
  );

  if (!block.url) {
    return cardContent;
  }

  if (isExternal) {
    return (
      <a
        aria-label={`打开 ${block.title}`}
        className="block h-full focus-visible:outline-none"
        href={block.url}
        rel="noopener noreferrer"
        target="_blank"
      >
        {cardContent}
      </a>
    );
  }

  return (
    <Link
      aria-label={`打开 ${block.title}`}
      className="block h-full focus-visible:outline-none"
      href={block.url}
    >
      {cardContent}
    </Link>
  );
};

const InfoCard: React.FC<{ block: BlockConfig; index: number }> = ({
  block,
  index,
}) => {
  const theme = getHomeCardTheme(block.id);
  const IconComponent = getIconComponent(block.icon);

  return (
    <article className={getCardShellClassName(block, theme)} style={getMotionStyle(index)}>
      <CardChrome theme={theme} />
      <div className="relative z-10 flex h-full flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className={`home-icon-motion grid size-11 place-items-center rounded-lg ${theme.iconPanel}`}>
            <IconComponent aria-hidden="true" className="size-5" />
          </div>
          <h3 className="text-lg font-semibold text-slate-950 dark:text-white">
            {block.title}
          </h3>
        </div>
        <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
          {block.description}
        </p>
        {block.stats && (
          <div className="mt-auto">
            <div className="text-3xl font-semibold text-slate-950 dark:text-white">
              {block.stats.count}
            </div>
            <div className="text-sm text-slate-500 dark:text-slate-400">
              {block.stats.label}
            </div>
          </div>
        )}
      </div>
    </article>
  );
};

const StatusCard: React.FC<{ block: BlockConfig; index: number }> = ({
  block,
  index,
}) => {
  const theme = getHomeCardTheme(block.id);
  const IconComponent = getIconComponent(block.icon);

  return (
    <article className={getCardShellClassName(block, theme)} style={getMotionStyle(index)}>
      <CardChrome theme={theme} />
      <div className="relative z-10 flex h-full flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className={`home-icon-motion grid size-11 place-items-center rounded-lg ${theme.iconPanel}`}>
            <IconComponent aria-hidden="true" className="size-5" />
          </div>
          <h3 className="text-lg font-semibold text-slate-950 dark:text-white">
            {block.title}
          </h3>
        </div>
        {block.status && (
          <div className="mt-auto">
            <div className="mb-2 flex items-center justify-between text-sm text-slate-600 dark:text-slate-300">
              <span>{block.status.label}</span>
              <span className="font-semibold text-slate-950 dark:text-white">
                {block.status.progress}%
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
              <div
                className={`h-full rounded-full bg-linear-to-r ${theme.progress} transition-[width] duration-500`}
                style={{ width: `${block.status.progress}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </article>
  );
};

const ListCard: React.FC<{ block: BlockConfig; index: number }> = ({
  block,
  index,
}) => {
  const theme = getHomeCardTheme(block.id);
  const IconComponent = getIconComponent(block.icon);

  return (
    <article className={getCardShellClassName(block, theme)} style={getMotionStyle(index)}>
      <CardChrome theme={theme} />
      <div className="relative z-10 flex h-full flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className={`home-icon-motion grid size-11 place-items-center rounded-lg ${theme.iconPanel}`}>
            <IconComponent aria-hidden="true" className="size-5" />
          </div>
          <h3 className="text-lg font-semibold text-slate-950 dark:text-white">
            {block.title}
          </h3>
        </div>
        {block.items && (
          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
            {block.items.slice(0, 3).map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span
                  className={`size-1.5 rounded-full bg-linear-to-r ${theme.progress}`}
                />
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
};

const BlockCard: React.FC<{ block: BlockConfig; index: number }> = ({
  block,
  index,
}) => {
  const theme = getHomeCardTheme(block.id);

  switch (block.type) {
    case "link-card":
      return <LinkCard block={block} index={index} />;
    case "info-card":
      return <InfoCard block={block} index={index} />;
    case "status-card":
      return <StatusCard block={block} index={index} />;
    case "list-card":
      return <ListCard block={block} index={index} />;
    case "image-converter":
      return (
        <ImageConverterCard
          block={block}
          className={getCardShellClassName(block, theme)}
          style={getMotionStyle(index)}
          theme={theme}
        />
      );
    default:
      return <LinkCard block={block} index={index} />;
  }
};

export default function Home() {
  return (
    <main className="relative h-full overflow-y-auto bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-white">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-70 dark:opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(15,23,42,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.05) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
          maskImage: "linear-gradient(to bottom, black, transparent 78%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(248,250,252,0.96) 0%, rgba(240,253,250,0.9) 42%, rgba(245,243,255,0.88) 100%)",
        }}
      />
      <div className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8">
        <section className="grid gap-5 lg:grid-cols-[1fr_360px] lg:items-end">
          <div className="home-panel-enter rounded-lg border border-white/70 bg-white/75 p-5 shadow-[0_24px_70px_-42px_rgba(15,23,42,0.75)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/75" style={getMotionStyle(0)}>
            <div className="inline-flex h-8 items-center gap-2 rounded-md bg-slate-950 px-3 text-xs font-semibold text-white shadow-lg shadow-slate-950/20 dark:bg-white dark:text-slate-950">
              <Sparkles aria-hidden="true" className="size-3.5" />
              My Next Admin
            </div>
            <h1 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight tracking-normal text-slate-950 sm:text-4xl dark:text-white">
              首页工作台
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base dark:text-slate-300">
              聚合常用工具、内部入口与本地处理能力，让每个入口都有清晰层级和稳定状态。
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {summaryItems.map((item, index) => (
              <div
                className="home-panel-enter rounded-lg border border-white/70 bg-white/80 p-4 text-center shadow-[0_18px_46px_-34px_rgba(15,23,42,0.7)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/70"
                key={item.label}
                style={getMotionStyle(index + 1)}
              >
                <div className="text-2xl font-semibold tabular-nums text-slate-950 dark:text-white">
                  {item.value}
                </div>
                <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {item.label}
                  {item.hint}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          aria-label="快捷工具"
          className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {config.blocks.map((block, index) => (
            <BlockCard key={block.id} block={block} index={index + 3} />
          ))}
        </section>

        <section className="grid gap-4 pb-8 md:grid-cols-3">
          <div className="rounded-lg border border-slate-200/70 bg-white/70 p-4 backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
            <ShieldCheck
              aria-hidden="true"
              className="mb-3 size-5 text-emerald-600 dark:text-emerald-300"
            />
            <h2 className="text-sm font-semibold text-slate-950 dark:text-white">
              稳定渲染
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
              卡片色彩按 id 固定映射，刷新和水合时保持一致。
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/70 bg-white/70 p-4 backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
            <RefreshCw
              aria-hidden="true"
              className="mb-3 size-5 text-cyan-600 dark:text-cyan-300"
            />
            <h2 className="text-sm font-semibold text-slate-950 dark:text-white">
              即时反馈
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
              本地处理类工具保留禁用、加载和结果提示状态。
            </p>
          </div>
          <div className="rounded-lg border border-slate-200/70 bg-white/70 p-4 backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
            <ImageIcon
              aria-hidden="true"
              className="mb-3 size-5 text-amber-600 dark:text-amber-300"
            />
            <h2 className="text-sm font-semibold text-slate-950 dark:text-white">
              视觉层次
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
              使用高光、边框和投影建立厚度，不改变原有入口结构。
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
