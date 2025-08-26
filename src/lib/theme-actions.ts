'use server'

import { cookies } from 'next/headers'
import type { Theme } from './theme-server'

/**
 * 更新主题的 Server Action
 * 这个函数会在客户端调用，用于同步主题设置到服务端 Cookie
 */
export async function updateThemeAction(theme: Theme) {
  try {
    const cookieStore = await cookies()
    
    // 设置主题 Cookie
    cookieStore.set('theme', theme, {
      httpOnly: false, // 允许客户端访问
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 365, // 1年
      path: '/'
    })

    // 可选：重新验证路径以确保服务端渲染使用最新的主题
    // 注意：这可能会导致页面重新渲染，在某些情况下可能不需要
    // revalidatePath('/', 'layout')
    
    return { success: true }
  } catch (error) {
    console.error('Failed to update theme cookie:', error)
    return { success: false, error: 'Failed to update theme' }
  }
}

/**
 * 获取当前主题的 Server Action（可选）
 * 主要用于客户端组件需要获取服务端主题时使用
 */
export async function getThemeAction(): Promise<Theme> {
  try {
    const cookieStore = await cookies()
    const themeCookie = cookieStore.get('theme')
    
    if (themeCookie?.value && (themeCookie.value === 'light' || themeCookie.value === 'dark')) {
      return themeCookie.value as Theme
    }
    
    return 'light'
  } catch (error) {
    console.error('Failed to get theme from cookie:', error)
    return 'light'
  }
}