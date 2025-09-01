# MNA

一个基于 Next.js 15 的现代化后台管理系统，集成了国际化、主题切换、响应式布局等功能。

## ✨ 特性

- 🚀 **Next.js 15** - 使用最新的 Next.js 框架，支持 Turbopack
- 🌍 **国际化支持** - 基于 next-intl 的多语言支持（中文/英文）
- 🎨 **主题切换** - 支持明暗主题切换
- 📱 **响应式设计** - 适配桌面端和移动端
- 🎯 **TypeScript** - 完整的 TypeScript 支持
- 💅 **现代化 UI** - 集成 Material-UI 和 Tailwind CSS
- 🔧 **ESLint** - 代码质量保证
- 📦 **组件化** - 模块化的组件架构

## 🛠️ 技术栈

- **框架**: Next.js 15.4.6
- **语言**: TypeScript 5
- **UI 库**: Material-UI 7.3.1
- **样式**: Tailwind CSS 4
- **国际化**: next-intl 4.3.4
- **图标**: React SVG
- **开发工具**: ESLint, Turbopack

## 📦 安装

```bash
# 克隆项目
git clone https://github.com/esver-sys/MNA.git

# 安装依赖
npm install
# 或
yarn install
```

## 🚀 开发

```bash
# 启动开发服务器（使用 Turbopack）
npm run start

# 或使用标准开发模式
npm run dev

# 构建生产版本
npm run build

# 代码检查
npm run lint
```

开发服务器将在 [http://localhost:3124](http://localhost:3124) 启动。

## 📁 项目结构

```
src/
├── app/                 # Next.js App Router
│   ├── (auth)/         # 认证相关页面
│   ├── [root]/         # 动态路由
│   └── layout.tsx      # 根布局
├── components/         # 公共组件
│   ├── LocaleSwitcher.tsx  # 语言切换器
│   ├── ThemeToggle.tsx     # 主题切换器
│   └── icons/          # 图标组件
├── config/             # 配置文件
│   ├── menu.json       # 菜单配置
│   ├── setting.json    # 系统设置
│   └── routes/         # 路由配置
├── hooks/              # 自定义 Hooks
│   ├── useLayoutSwitch.ts  # 布局切换
│   ├── useMobileDetect.ts  # 移动端检测
│   └── useTheme.ts         # 主题管理
├── i18n/               # 国际化配置
├── layouts/            # 布局组件
│   ├── aside/          # 侧边栏
│   ├── header/         # 头部
│   └── index.tsx       # 主布局
├── lib/                # 工具库
├── styles/             # 样式文件
├── types/              # TypeScript 类型定义
└── utils/              # 工具函数
```

## 🌍 国际化

项目支持中文和英文两种语言：

- 默认语言：中文 (zh)
- 支持语言：中文 (zh)、英文 (en)
- 语言文件位置：`public/lang/`

## 🎨 主题

支持明暗两种主题模式：

- 自动检测系统主题偏好
- 手动切换主题
- 主题状态持久化

## 📱 响应式设计

- 桌面端：完整的侧边栏和头部布局
- 移动端：自适应布局，优化触摸体验
- 断点适配：基于 Tailwind CSS 的响应式设计

## 🔧 配置

### 系统设置

编辑 `src/config/setting.json` 来修改系统基本信息：

```json
{
  "name": "MNA",
  "dosc": "全能的管理平台",
  "logoUrl": "/public/logo.png"
}
```

### 菜单配置

自动化菜单配置
基于 app 目录的路由配置，自动生成菜单
采取 npm run extract-routes 命令提取路由配置
提取后的路由配置会自动更新 `src/config/routes/routes.json` 文件

## 📝 开发指南

### 添加新页面

1. 在 `src/app/` 目录下创建新的路由文件夹
2. 添加 `page.tsx` 文件
3. 编写页面配置文件 `index.json`
4. 更新国际化文件

### 添加新组件

1. 在 `src/components/` 目录下创建组件文件
2. 使用 TypeScript 定义组件类型
3. 遵循项目的代码规范

### 自定义主题

1. 编辑 `src/styles/theme/` 目录下的样式文件
2. 使用 CSS 变量定义主题色彩
3. 确保明暗主题的兼容性
