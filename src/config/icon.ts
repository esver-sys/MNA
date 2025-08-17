import { IconConfig } from '@/types/icon'

// 图标系统配置
export const iconConfig: IconConfig = {
  // 默认尺寸
  defaultSize: 'md',
  
  // 尺寸映射（像素值）
  sizeMap: {
    xs: 12,
    sm: 16,
    md: 20,
    lg: 24,
    xl: 32
  },
  
  // 颜色映射（Tailwind CSS 类名）
  colorMap: {
    primary: 'text-blue-600 dark:text-blue-400',
    secondary: 'text-gray-600 dark:text-gray-400',
    success: 'text-green-600 dark:text-green-400',
    warning: 'text-yellow-600 dark:text-yellow-400',
    error: 'text-red-600 dark:text-red-400',
    info: 'text-blue-500 dark:text-blue-300',
    muted: 'text-gray-400 dark:text-gray-500'
  }
}

// 获取图标尺寸
export const getIconSize = (size: string | number): number => {
  if (typeof size === 'number') {
    return size
  }
  return iconConfig.sizeMap[size as keyof typeof iconConfig.sizeMap] || iconConfig.sizeMap[iconConfig.defaultSize as keyof typeof iconConfig.sizeMap]
}

// 获取图标颜色类名
export const getIconColorClass = (color: string): string => {
  if (color === 'current') {
    return 'text-current'
  }
  
  if (color in iconConfig.colorMap) {
    return iconConfig.colorMap[color as keyof typeof iconConfig.colorMap]
  }
  
  // 如果是自定义颜色，直接返回
  return color
}