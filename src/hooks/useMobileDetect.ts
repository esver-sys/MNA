"use client";
import { useState, useEffect } from 'react';

/**
 * 检测是否为移动设备的自定义Hook
 * 基于屏幕尺寸判断（768px以下为移动设备）
 * @returns {boolean} 是否为移动设备
 */
export function useMobileDetect(): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = () => {
      const isMobileScreen = window.matchMedia('(max-width: 768px)').matches;
      setIsMobile(isMobileScreen);
    };

    // 初始检测
    checkMobile();

    // 监听屏幕尺寸变化
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    const handleResize = () => checkMobile();
    
    mediaQuery.addEventListener('change', handleResize);

    return () => {
      mediaQuery.removeEventListener('change', handleResize);
    };
  }, []);

  return isMobile;
}

export default useMobileDetect;