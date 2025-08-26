import { cookies, headers } from 'next/headers'

export type Theme = 'light' | 'dark'

/**
 * 在服务端获取用户的主题偏好
 * 优先级：Cookie > 用户系统偏好 > 默认 light
 */
export async function getServerTheme(): Promise<Theme> {
  try {
    // 1. 首先尝试从 Cookie 获取
    const cookieStore = await cookies()
    const themeCookie = cookieStore.get('theme')
    
    if (themeCookie?.value && (themeCookie.value === 'light' || themeCookie.value === 'dark')) {
      return themeCookie.value as Theme
    }

    // 2. 如果没有 Cookie，尝试从 User-Agent 推断系统偏好
    // 注意：这只是一个备选方案，实际的系统偏好需要在客户端检测
    const headersList = await headers()
    const userAgent = headersList.get('user-agent') || ''
    
    // 简单的启发式检测（这不是完美的解决方案，但可以作为备选）
    // 在实际应用中，我们主要依赖客户端的首次检测和 Cookie 存储
    if (userAgent.includes('Dark') || userAgent.includes('dark')) {
      return 'dark'
    }

    // 3. 默认返回 light
    return 'light'
  } catch (error) {
    console.warn('Failed to get server theme:', error)
    return 'light'
  }
}

/**
 * 设置主题 Cookie
 */
export async function setThemeCookie(theme: Theme) {
  const cookieStore = await cookies()
  
  cookieStore.set('theme', theme, {
    httpOnly: false, // 允许客户端访问
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 365, // 1年
    path: '/'
  })
}

/**
 * 获取主题的 CSS 类名或属性
 */
export function getThemeAttributes(theme: Theme) {
  return {
    'data-theme': theme,
    className: theme
  }
}