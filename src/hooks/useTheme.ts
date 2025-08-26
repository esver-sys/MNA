'use client'

import { useState, useEffect, useTransition } from 'react'
import { updateThemeAction } from '@/lib/theme-actions'

export type Theme = 'light' | 'dark'

/**
 * 获取 Cookie 中的主题值
 */
function getThemeFromCookie(): Theme | null {
  if (typeof document === 'undefined') return null
  
  const cookies = document.cookie.split(';')
  const themeCookie = cookies.find(cookie => cookie.trim().startsWith('theme='))
  
  if (themeCookie) {
    const value = themeCookie.split('=')[1] as Theme
    return value === 'light' || value === 'dark' ? value : null
  }
  
  return null
}

export function useTheme() {
  const [isPending, startTransition] = useTransition()
  const [theme, setTheme] = useState<Theme>(() => {
    // 在客户端环境下，尝试从document获取当前主题
    if (typeof window !== 'undefined') {
      const currentTheme = document.documentElement.getAttribute('data-theme') as Theme
      return currentTheme || 'light'
    }
    return 'light'
  })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // 从 Cookie 读取主题设置
    const cookieTheme = getThemeFromCookie()
    if (cookieTheme && cookieTheme !== theme) {
      setTheme(cookieTheme)
    } else if (!cookieTheme) {
      // 如果没有 Cookie，检查系统偏好并设置初始值
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      const systemTheme = prefersDark ? 'dark' : 'light'
      if (systemTheme !== theme) {
        setTheme(systemTheme)
        // 立即同步到服务端
        startTransition(() => {
          updateThemeAction(systemTheme)
        })
      }
    }
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      // 更新document的data-theme属性
      document.documentElement.setAttribute('data-theme', theme)
    }
  }, [theme, mounted])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    
    // 使用 Server Action 更新 Cookie
    startTransition(() => {
      updateThemeAction(newTheme)
    })
  }

  return {
    theme,
    toggleTheme,
    mounted,
    isPending
  }
}