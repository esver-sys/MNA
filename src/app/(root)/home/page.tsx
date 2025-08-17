'use client'

import LocaleSwitcher from "@/components/LocaleSwitcher";
import ThemeToggle from "@/components/ThemeToggle";
import { useTranslations } from "next-intl";
import React from "react";

export default function Home() {
  const t = useTranslations("Home");
  
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-card-foreground">
            我的管理后台
          </h1>
          <div className="flex items-center gap-4">
            <LocaleSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Welcome Card */}
          <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-card-foreground mb-3">
              🎉 欢迎使用
            </h2>
            <p className="text-muted-foreground mb-4">
              {t("step1")} <code className="bg-muted px-2 py-1 rounded text-sm">src/app/(root)/home/page.tsx</code>
            </p>
            <p className="text-muted-foreground">
              {t("step2")}
            </p>
          </div>

          {/* Theme Demo Card */}
          <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-card-foreground mb-3">
              🌓 主题切换
            </h2>
            <p className="text-muted-foreground mb-4">
              点击右上角的主题切换按钮来体验明暗主题切换效果。
            </p>
            <div className="space-y-2">
              <div className="bg-primary text-primary-foreground px-3 py-2 rounded text-sm">
                主要颜色示例
              </div>
              <div className="bg-secondary text-secondary-foreground px-3 py-2 rounded text-sm">
                次要颜色示例
              </div>
              <div className="bg-muted text-muted-foreground px-3 py-2 rounded text-sm">
                静音颜色示例
              </div>
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-card-foreground mb-3">
              🚀 快速操作
            </h2>
            <div className="space-y-3">
              <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded transition-colors">
                {t("deploy")}
              </button>
              <button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground px-4 py-2 rounded transition-colors">
                {t("docs")}
              </button>
              <button className="w-full border border-border hover:bg-muted text-card-foreground px-4 py-2 rounded transition-colors">
                {t("learn")}
              </button>
            </div>
          </div>

          {/* Features Card */}
          <div className="bg-card border border-border rounded-lg p-6 shadow-sm md:col-span-2 lg:col-span-3">
            <h2 className="text-xl font-semibold text-card-foreground mb-4">
              ✨ 功能特性
            </h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="text-center">
                <div className="text-3xl mb-2">🌍</div>
                <h3 className="font-medium text-card-foreground mb-1">国际化支持</h3>
                <p className="text-sm text-muted-foreground">支持多语言切换</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🎨</div>
                <h3 className="font-medium text-card-foreground mb-1">主题切换</h3>
                <p className="text-sm text-muted-foreground">明暗主题无缝切换</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">⚡</div>
                <h3 className="font-medium text-card-foreground mb-1">高性能</h3>
                <p className="text-sm text-muted-foreground">基于Next.js 15</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">📱</div>
                <h3 className="font-medium text-card-foreground mb-1">响应式设计</h3>
                <p className="text-sm text-muted-foreground">适配各种设备</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
