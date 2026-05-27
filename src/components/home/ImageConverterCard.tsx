"use client";

import React, { useEffect, useState } from "react";
import {
  ChevronRight,
  CornerLeftUp,
  ExternalLink,
  Folder,
  HardDrive,
  Image as ImageIcon,
  Play,
  RotateCcw,
} from "lucide-react";
import { message, Modal } from "antd";
import Link from "next/link";

import {
  getHomeCardTheme,
  type HomeCardTheme,
} from "@/components/home/home-card-theme";

interface DirectoryItem {
  name: string;
  path: string;
  isDirectory: boolean;
}

interface ImageConverterBlock {
  id: string;
  title: string;
  description: string;
  url?: string;
}

interface ImageConverterCardProps {
  block: ImageConverterBlock;
  className?: string;
  style?: React.CSSProperties;
  theme?: HomeCardTheme;
}

export const ImageConverterCard: React.FC<ImageConverterCardProps> = ({
  block,
  className,
  style,
  theme,
}) => {
  const [directory, setDirectory] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [browserPath, setBrowserPath] = useState("");
  const [browserItems, setBrowserItems] = useState<DirectoryItem[]>([]);
  const [browserLoading, setBrowserLoading] = useState(false);
  const cardTheme = theme ?? getHomeCardTheme(block.id);

  useEffect(() => {
    // 弹窗首次打开时拉取根目录，避免页面首屏加载时就触发本地文件系统请求。
    if (isModalOpen && !browserPath) {
      fetchDirectories("");
    }
  }, [isModalOpen, browserPath]);

  const fetchDirectories = async (path: string) => {
    setBrowserLoading(true);
    try {
      const res = await fetch(`/api/fs/list-dirs?path=${encodeURIComponent(path)}`);
      if (!res.ok) throw new Error("Failed to list directories");
      const data = await res.json();
      setBrowserItems(data.items);
      setBrowserPath(data.currentPath || "");
    } catch {
      message.error("无法加载目录");
    } finally {
      setBrowserLoading(false);
    }
  };

  const handleProcess = async () => {
    if (!directory) {
      message.error("请选择文件夹");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/tools/image-converter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ directory }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "处理失败");
      }

      const convertedCount = result.results.filter(
        (item: { status: string }) => item.status === "converted"
      ).length;
      const errorCount = result.results.filter(
        (item: { status: string }) => item.status === "error"
      ).length;

      if (errorCount > 0) {
        message.warning(
          `处理完成: ${convertedCount} 个文件已转换, ${errorCount} 个出错`
        );
      } else {
        message.success(`处理完成: ${convertedCount} 个文件已转换`);
      }
    } catch (error: unknown) {
      message.error(error instanceof Error ? error.message : "处理失败");
    } finally {
      setLoading(false);
    }
  };

  const handleNavigate = (path: string) => {
    fetchDirectories(path);
  };

  const handleGoUp = () => {
    // 兼容 Windows 根盘符与普通目录：根盘符继续返回驱动器列表，普通目录取父级路径。
    if (!browserPath || browserPath.endsWith(":\\")) {
      fetchDirectories("");
      return;
    }

    const separator = browserPath.includes("\\") ? "\\" : "/";
    const parts = browserPath.split(separator);
    parts.pop();

    if (parts.length === 0 || (parts.length === 1 && parts[0] === "")) {
      fetchDirectories("");
      return;
    }

    let newPath = parts.join(separator);
    if (newPath.match(/^[a-zA-Z]:$/)) newPath += "\\";
    fetchDirectories(newPath);
  };

  return (
    <>
      <article
        className={
          className ??
          "home-card-surface home-card-enter group relative isolate h-full overflow-hidden rounded-lg border border-white/70 bg-white/80 p-5 shadow-xl backdrop-blur-xl"
        }
        style={style}
      >
        {/* 与普通入口卡片保持同一套厚度语言，强化首页整体一致性。 */}
        <span
          aria-hidden="true"
          className="home-card-shine pointer-events-none absolute -top-12 bottom-[-48px] left-[-42%] z-20 w-[38%]"
        />
        <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/90 dark:bg-white/20" />
        <span
          className={`pointer-events-none absolute inset-x-4 top-0 h-1 rounded-b-full bg-linear-to-r ${cardTheme.accent}`}
        />
        <span className="pointer-events-none absolute inset-x-5 bottom-0 h-8 rounded-[50%] bg-slate-950/8 blur-2xl dark:bg-black/45" />

        <div className="relative z-10 flex h-full flex-col justify-between gap-5">
          <div>
            <div className="flex items-start justify-between gap-4">
              <div className="flex min-w-0 items-center gap-3">
                <div
                  className={`home-icon-motion grid size-12 shrink-0 place-items-center rounded-lg shadow-lg shadow-slate-950/12 ${cardTheme.iconPanel}`}
                >
                  <ImageIcon aria-hidden="true" className="size-6" />
                </div>
                <div className="min-w-0">
                  <h3 className="truncate text-lg font-semibold text-slate-950 dark:text-white">
                    {block.title}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {block.description}
                  </p>
                </div>
              </div>

              {block.url && (
                <Link
                  aria-label={`打开 ${block.title} 完整页面`}
                  className="home-pressable grid size-10 shrink-0 place-items-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:hover:bg-white/10 dark:hover:text-white"
                  href={block.url}
                  title="打开完整页面"
                >
                  <ExternalLink aria-hidden="true" className="size-5" />
                </Link>
              )}
            </div>

            <div className="mt-6">
              <button
                className="home-pressable flex min-h-11 w-full items-center gap-2 rounded-lg border border-slate-200 bg-white/80 px-3 py-2 text-left text-sm text-slate-600 shadow-inner shadow-slate-950/5 transition-colors hover:border-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:border-amber-300/60"
                onClick={() => setIsModalOpen(true)}
                title={directory || "点击选择文件夹"}
                type="button"
              >
                <Folder
                  aria-hidden="true"
                  className="size-4 shrink-0 text-slate-400"
                />
                <span className="truncate">{directory || "点击选择文件夹..."}</span>
              </button>
            </div>
          </div>

          <div className="border-t border-slate-200/70 pt-4 dark:border-white/10">
            <button
              className={`home-pressable flex min-h-11 w-full items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold transition-all ${
                loading || !directory
                  ? "cursor-not-allowed bg-slate-100 text-slate-400 dark:bg-white/10 dark:text-slate-500"
                  : `bg-linear-to-r ${cardTheme.progress} text-white shadow-lg shadow-amber-500/20 hover:brightness-105`
              }`}
              disabled={loading || !directory}
              onClick={handleProcess}
              type="button"
            >
              {loading ? (
                <RotateCcw aria-hidden="true" className="size-4 animate-spin" />
              ) : (
                <Play aria-hidden="true" className="size-4" />
              )}
              {loading ? "处理中..." : "开始处理"}
            </button>
          </div>
        </div>
      </article>

      <Modal
        footer={[
          <button
            className="home-pressable mr-2 rounded-lg px-4 py-2 text-sm text-slate-600 transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
            key="cancel"
            onClick={() => setIsModalOpen(false)}
            type="button"
          >
            取消
          </button>,
          <button
            className="home-pressable rounded-lg bg-blue-600 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!browserPath}
            key="confirm"
            onClick={() => {
              setDirectory(browserPath);
              setIsModalOpen(false);
            }}
            type="button"
          >
            选择当前目录
          </button>,
        ]}
        onCancel={() => setIsModalOpen(false)}
        open={isModalOpen}
        title="选择文件夹"
        width={600}
      >
        <div className="flex h-[400px] flex-col">
          <div className="mb-4 flex items-center gap-2 rounded-lg bg-slate-100 p-2 font-mono text-sm break-all">
            <HardDrive
              aria-hidden="true"
              className="size-4 shrink-0 text-slate-500"
            />
            {browserPath || "此电脑"}
          </div>

          <div className="flex-1 overflow-y-auto rounded-lg border border-slate-200">
            {browserPath && (
              <button
                className="home-pressable flex w-full items-center gap-3 border-b border-slate-100 p-3 text-left transition-colors hover:bg-slate-50"
                onClick={handleGoUp}
                type="button"
              >
                <CornerLeftUp
                  aria-hidden="true"
                  className="size-5 text-slate-400"
                />
                <span className="text-slate-600">... (返回上级)</span>
              </button>
            )}

            {browserLoading ? (
              <div className="flex h-20 items-center justify-center text-slate-400">
                <RotateCcw
                  aria-hidden="true"
                  className="mr-2 size-5 animate-spin"
                />
                加载中...
              </div>
            ) : browserItems.length === 0 ? (
              <div className="flex h-20 items-center justify-center text-sm text-slate-400">
                没有子文件夹
              </div>
            ) : (
              browserItems.map((item) => (
                <button
                  className="home-pressable group flex w-full items-center gap-3 border-b border-slate-50 p-3 text-left transition-colors last:border-0 hover:bg-blue-50"
                  key={item.path}
                  onClick={() => handleNavigate(item.path)}
                  type="button"
                >
                  <Folder
                    aria-hidden="true"
                    className="size-5 text-yellow-400 group-hover:text-yellow-500"
                  />
                  <span className="flex-1 text-slate-700">{item.name}</span>
                  <ChevronRight
                    aria-hidden="true"
                    className="size-4 text-slate-300"
                  />
                </button>
              ))
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};
