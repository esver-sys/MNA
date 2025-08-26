'use client'

import { useState, useEffect } from "react"

/**
 * 布局选项
 * 1. 布局1 - 顶部标题栏 + 左侧导航栏 + 右侧内容
 * 2. 布局2 - 左侧导航栏 + 顶部标题栏 + 下方内容  
 * 3. 布局3 - 顶部导航栏 + 下方内容（无侧边栏）
 */
export type LayoutOption = 'layout-one' | 'layout-two' | 'layout-three'


/**
 * 布局切换 Hook
 * @returns {Object} 包含当前布局、切换布局函数等
 */
export function useLayoutSwitch() {
  const [layout, setLayout] = useState<LayoutOption>('layout-one')

  // 从 localStorage 初始化布局
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLayout = localStorage.getItem('admin-layout') as LayoutOption
      if (savedLayout && ['layout-one', 'layout-two', 'layout-three'].includes(savedLayout)) {  
        setLayout(savedLayout)
      }
    }
  }, [])

  /**
   * 切换到指定布局
   * @param newLayout 新的布局选项
   */
  const switchLayout = (newLayout: LayoutOption) => {
    setLayout(newLayout)
    // 可选：保存到 localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('admin-layout', newLayout)
    }
  }


  /**
   * 重置为默认布局
   */
  const resetLayout = () => {
    switchLayout('layout-one')
  }

  return {
    layout,
    switchLayout,
    resetLayout,
  }
}
