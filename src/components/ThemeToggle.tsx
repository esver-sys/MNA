"use client";

import React from "react";
import { useTheme } from "@/hooks/useTheme";
import { Icon } from "./icons";

export default function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();

  // 避免服务端渲染不匹配
  if (!mounted) {
    return <div className="w-14 h-8 bg-gray-200 rounded-full animate-pulse" />;
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex items-center w-14 h-8 rounded-full transition-colors duration-300"
      style={{
        backgroundColor: theme === "dark" ? "#374151" : "#e5e7eb",
      }}
      aria-label="切换主题"
    >
      {/* 滑块 */}
      <span
        className={`inline-block w-6 h-6 bg-white rounded-full shadow-lg transform transition-transform duration-300 ${
          theme === "dark" ? "translate-x-7" : "translate-x-1"
        }`}
      >
        {/* 图标 */}
        <span className="flex items-center justify-center w-full h-full">
          {theme === "light" ? (
            <i className="text-yellow-500">
              <Icon name="sun" size={16} />
            </i>
          ) : (
            <i className="text-blue-400">
              <Icon name="moon" size={16} />
            </i>
          )}
        </span>
      </span>
    </button>
  );
}
