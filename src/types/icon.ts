

// 图标尺寸类型
export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number

// 图标颜色类型
export type IconColor = 
  | 'current'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'muted'
  | string

// 图标组件属性类型
export interface IconProps {
  name: string
  size?: IconSize
  color?: IconColor
  className?: string
  style?: React.CSSProperties
  onClick?: () => void
  'aria-label'?: string
}

// 图标配置类型
export interface IconConfig {
  defaultSize: IconSize
  sizeMap: Record<Exclude<IconSize, number>, number>
  colorMap: Record<Exclude<IconColor, 'current' | string>, string>
}