"use client";

import React, { useState } from "react";
import { Icon } from "@/components/icons";
import { IconName } from "@/types/icon";

// 图标分类 - 基于实际可用的SVG文件
const iconCategories = {
  基础图标: ["home", "user", "settings", "search", "close"] as IconName[],
  箭头图标: ["arrow-right", "arrow-down"] as IconName[],
  菜单导航: ["menu"] as IconName[],
  主题相关: ["sun", "moon"] as IconName[],
};

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
const colors = [
  "current",
  "primary",
  "secondary",
  "success",
  "warning",
  "error",
  "info",
  "muted",
] as const;

export default function IconsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSize, setSelectedSize] =
    useState<(typeof sizes)[number]>("md");
  const [selectedColor, setSelectedColor] =
    useState<(typeof colors)[number]>("current");
  const [copiedIcon, setCopiedIcon] = useState<string | null>(null);

  // 过滤图标
  const filteredCategories = Object.entries(iconCategories).reduce(
    (acc, [category, icons]) => {
      const filteredIcons = icons.filter((icon) =>
        icon.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (filteredIcons.length > 0) {
        acc[category] = filteredIcons;
      }
      return acc;
    },
    {} as Record<string, IconName[]>
  );

  // 复制图标代码
  const copyIconCode = (iconName: string) => {
    const code = `<Icon name="${iconName}" size="${selectedSize}" color="${selectedColor}" />`;
    navigator.clipboard.writeText(code);
    setCopiedIcon(iconName);
    setTimeout(() => setCopiedIcon(null), 2000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-7xl mx-auto">
        {/* 页面标题 */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-card-foreground mb-2">
            SVG 图标系统
          </h1>
          <p className="text-muted-foreground text-lg">
            完整的 SVG 图标库，支持多种尺寸和颜色，适用于各种场景
          </p>
        </div>

        {/* 控制面板 */}
        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-card-foreground mb-4">
            图标预览控制
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {/* 搜索 */}
            <div>
              <label className="block text-sm font-medium text-card-foreground mb-2">
                搜索图标
              </label>
              <div className="relative">
                <Icon
                  name="search"
                  size="sm"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                />
                <input
                  type="text"
                  placeholder="输入图标名称..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* 尺寸选择 */}
            <div>
              <label className="block text-sm font-medium text-card-foreground mb-2">
                图标尺寸
              </label>
              <select
                value={selectedSize}
                onChange={(e) =>
                  setSelectedSize(e.target.value as (typeof sizes)[number])
                }
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {sizes.map((size) => (
                  <option key={size} value={size}>
                    {size.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            {/* 颜色选择 */}
            <div>
              <label className="block text-sm font-medium text-card-foreground mb-2">
                图标颜色
              </label>
              <select
                value={selectedColor}
                onChange={(e) =>
                  setSelectedColor(e.target.value as (typeof colors)[number])
                }
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {colors.map((color) => (
                  <option key={color} value={color}>
                    {color}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 使用示例 */}
          <div className="bg-muted rounded-lg p-4">
            <h3 className="text-sm font-medium text-card-foreground mb-2">
              使用示例
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground mb-1">基础用法：</p>
                <code className="bg-background px-2 py-1 rounded text-xs">
                  {`<Icon name="home" size="${selectedSize}" color="${selectedColor}" />`}
                </code>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">快捷组件：</p>
                <code className="bg-background px-2 py-1 rounded text-xs">
                  {`<HomeIcon size="${selectedSize}" color="${selectedColor}" />`}
                </code>
              </div>
            </div>
          </div>
        </div>

        {/* 图标展示 */}
        <div className="space-y-8">
          {Object.entries(filteredCategories).map(([category, icons]) => (
            <div
              key={category}
              className="bg-card border border-border rounded-lg p-6"
            >
              <h2 className="text-xl font-semibold text-card-foreground mb-4 flex items-center">
                <Icon name="home" size="sm" className="mr-2" />
                {category}
                <span className="ml-2 text-sm text-muted-foreground font-normal">
                  ({icons.length})
                </span>
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                {icons.map((iconName) => (
                  <div
                    key={iconName}
                    className="group relative bg-background border border-border rounded-lg p-4 hover:border-blue-500 hover:shadow-md transition-all cursor-pointer"
                    onClick={() => copyIconCode(iconName)}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <div className="flex items-center justify-center w-12 h-12 bg-muted rounded-lg group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-colors">
                        <Icon
                          name={iconName}
                          size={selectedSize}
                          color={selectedColor}
                        />
                      </div>
                      <div className="text-center">
                        <p className="text-xs font-medium text-card-foreground truncate w-full">
                          {iconName}
                        </p>
                      </div>
                    </div>

                    {/* 复制提示 */}
                    {copiedIcon === iconName && (
                      <div className="absolute inset-0 bg-green-500/10 border border-green-500 rounded-lg flex items-center justify-center">
                        <div className="flex items-center space-x-1 text-green-600 text-xs font-medium">
                          <Icon name="close" size="xs" />
                          <span>已复制</span>
                        </div>
                      </div>
                    )}

                    {/* 悬停提示 */}
                    <div className="absolute inset-0 bg-blue-500/5 border border-blue-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="flex items-center space-x-1 text-blue-600 text-xs font-medium">
                        <Icon name="menu" size="xs" />
                        <span>点击复制</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 空状态 */}
        {Object.keys(filteredCategories).length === 0 && (
          <div className="bg-card border border-border rounded-lg p-12 text-center">
            <Icon
              name="search"
              size="xl"
              className="mx-auto mb-4 text-muted-foreground"
            />
            <h3 className="text-lg font-medium text-card-foreground mb-2">
              未找到匹配的图标
            </h3>
            <p className="text-muted-foreground">请尝试其他搜索关键词</p>
          </div>
        )}

        {/* 使用说明 */}
        <div className="bg-card border border-border rounded-lg p-6 mt-8">
          <h2 className="text-xl font-semibold text-card-foreground mb-4 flex items-center">
            <Icon name="close" size="sm" className="mr-2" />
            使用说明
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <h3 className="font-medium text-card-foreground mb-2">
                导入方式
              </h3>
              <div className="space-y-2">
                <div>
                  <p className="text-muted-foreground mb-1">基础组件：</p>
                  <code className="bg-muted px-2 py-1 rounded text-xs block">
                    {'import { Icon } from @/components/icons'}
                  </code>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">快捷组件：</p>
                  <code className="bg-muted px-2 py-1 rounded text-xs block">
                    {'import { HomeIcon, UserIcon } from @/components/icons/CommonIcons'}
                  </code>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-card-foreground mb-2">
                属性说明
              </h3>
              <div className="space-y-1 text-muted-foreground">
                <p>
                  <code className="bg-muted px-1 rounded text-xs">name</code>:
                  图标名称
                </p>
                <p>
                  <code className="bg-muted px-1 rounded text-xs">size</code>:
                  xs | sm | md | lg | xl | number
                </p>
                <p>
                  <code className="bg-muted px-1 rounded text-xs">color</code>:
                  预设颜色或自定义颜色
                </p>
                <p>
                  <code className="bg-muted px-1 rounded text-xs">
                    className
                  </code>
                  : 额外的 CSS 类名
                </p>
                <p>
                  <code className="bg-muted px-1 rounded text-xs">onClick</code>
                  : 点击事件处理函数
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
