'use client'

import React from 'react'
import { ReactSVG } from 'react-svg'
import { IconProps } from '@/types/icon'
import { getIconSize, getIconColorClass } from '@/config/icon'

/**
 * SVG 图标组件
 * 
 * @param name - 图标名称
 * @param size - 图标尺寸，可以是预设值或数字
 * @param color - 图标颜色，可以是预设值或自定义颜色
 * @param className - 额外的 CSS 类名
 * @param style - 内联样式
 * @param onClick - 点击事件处理函数
 * @param aria-label - 无障碍标签
 */
export const Icon: React.FC<IconProps> = ({
  name,
  size = 'md',
  color = 'current',
  className = '',
  style,
  onClick,
  'aria-label': ariaLabel,
  ...props
}) => {
  // 计算尺寸
  const iconSize = getIconSize(size)
  
  // 计算颜色类名
  const colorClass = getIconColorClass(color)
  
  // SVG 文件路径
  const svgPath = `/imgs/${name}.svg`
  
  return (
    <ReactSVG
      src={svgPath}
      style={style}
      beforeInjection={(svg) => {
        svg.setAttribute('width', iconSize.toString())
        svg.setAttribute('height', iconSize.toString())
        svg.setAttribute('class', `${colorClass} ${className}`.trim())
        svg.setAttribute('aria-label', ariaLabel || `${name} icon`)
        svg.setAttribute('role', 'img')
        
        if (onClick) {
          svg.style.cursor = 'pointer'
          svg.addEventListener('click', onClick)
        }
      }}
      fallback={() => (
        <div 
          className={`inline-block ${colorClass} ${className}`.trim()}
          style={{ width: iconSize, height: iconSize }}
          aria-label={ariaLabel || `${name} icon not found`}
        >
          ?
        </div>
      )}
      {...props}
    />
  )
}

// 默认导出
export default Icon