"use client";
import React, { useState } from "react";
import { Menu, Layout } from "antd";
import type { MenuProps } from "antd";
import { useRouter, usePathname } from "next/navigation";
import routes from "@/routes/routes.json";
import Icon from "@/components/icons/Icon";
import { RouteItem } from "@/types";

type MenuItemType = {
  key: string;
  label: string;
  route?: string;
  icon?: React.ReactNode;
  children?: MenuItemType[];
} & Exclude<MenuProps['items'], undefined>[number];

const { Sider } = Layout;

function convertToMenuItems(routes: RouteItem[]): MenuItemType[] {
  return routes.map((route) => {
    const hasChildren = route.children && route.children.length > 0;
    
    const menuItem: MenuItemType = {
      key: route.path,
      label: route.name,
      route: route.path,
    };

    // 添加图标，并使用 span 包裹以解决对齐问题
    if (route.icon) {
      menuItem.icon = <span className="inline-flex items-center justify-center">
        <Icon name={route.icon.replace("icon-", "")} size="md" />
      </span>;
    }

    // 处理子菜单
    if (hasChildren && route.children) {
      menuItem.children = convertToMenuItems(route.children);
    }

    return menuItem;
  });
}

export default function LayoutAside() {
  const router = useRouter();
  const pathname = usePathname();
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  
  // 过滤掉登录页面，因为它不应该在侧边栏显示
  const filteredRoutes = routes.filter((route) => route.path !== "/login");
  const menuItems = convertToMenuItems(filteredRoutes);

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    // 查找被点击的菜单项，获取其routePath
    const findRoutePath = (items: MenuItemType[]): string | undefined => {
      for (const item of items) {
        if (item.key === key) {
          return item.route;
        }
        if (item.children) {
          const childRoutePath = findRoutePath(item.children);
          if (childRoutePath) {
            return childRoutePath;
          }
        }
      }
    };

    const routePath = findRoutePath(menuItems);
    if (routePath) {
      router.push(routePath);
    }
  };

  const handleOpenChange: MenuProps['onOpenChange'] = (keys) => {
    setOpenKeys(keys as string[]);
  };

  // 查找应该展开的菜单项
  const getDefaultOpenKeys = (): string[] => {
    const openKeys: string[] = [];
    const pathParts = pathname.split("/").filter(Boolean);
    
    // 构建所有可能的父路径
    let currentPath = "";
    pathParts.forEach(part => {
      currentPath += "/" + part;
      // 检查是否有菜单项匹配当前路径
      const hasMatchingItem = filteredRoutes.some(route => {
        if (route.path === currentPath) return true;
        if (route.children) {
          return route.children.some(child => child.path === currentPath);
        }
        return false;
      });
      
      if (hasMatchingItem) {
        openKeys.push(currentPath);
      }
    });
    
    return openKeys;
  };

  return (
    <Sider
      width={'100%'}
      style={{
        height: '100%',
        backgroundColor: 'transparent',
        borderRight: '1px solid #f0f0f0',
        overflow: 'auto',
      }}
      theme="light"
    >
      <Menu
        mode="inline"
        selectedKeys={[pathname]}
        openKeys={openKeys.length ? openKeys : getDefaultOpenKeys()}
        onOpenChange={handleOpenChange}
        onClick={handleMenuClick}
        items={menuItems}
        style={{ 
          height: '100%', 
          border: 'none' ,
          fontSize: '14px',
          backgroundColor: 'transparent'
        }}
      />
    </Sider>
  );
}
