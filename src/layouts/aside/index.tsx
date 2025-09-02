"use client";
import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Box,
} from "@mui/material";
import { useRouter, usePathname } from "next/navigation";
import routes from "@/config/routes/routes.json";
import Icon from "@/components/icons/Icon";

interface RouteItem {
  name: string;
  path: string;
  icon?: string | null;
  children?: RouteItem[];
  meta?: {
    title: string;
    auth?: boolean;
  };
}

interface MenuItemProps {
  route: RouteItem;
  level?: number;
  isOpen?: boolean;
  onToggle?: () => void;
}

function MenuItem({ route, level = 0, isOpen, onToggle }: MenuItemProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [localOpen, setLocalOpen] = useState(false);

  const hasChildren = route.children && route.children.length > 0;
  const isActive = pathname === route.path;
  const isParentActive = route.children?.some(
    (child) => pathname === child.path
  );

  const handleClick = () => {
    if (hasChildren) {
      if (onToggle) {
        onToggle();
      } else {
        setLocalOpen(!localOpen);
      }
    } else {
      router.push(route.path);
    }
  };

  const currentOpen = onToggle ? isOpen : localOpen;

  return (
    <>
      <ListItem disablePadding sx={{ display: "block" }}>
        <ListItemButton
          onClick={handleClick}
          sx={{
            minHeight: 48,
            justifyContent: "initial",
            px: 2.5,
            pl: level * 2 + 2.5,
            backgroundColor: isActive ? "action.selected" : "transparent",
            "&:hover": {
              backgroundColor: "action.hover",
            },
            borderRadius: 1,
            mx: 1,
            mb: 0.5,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: 2,
              justifyContent: "center",
              color:
                isActive || isParentActive ? "primary.main" : "text.secondary",
            }}
          >
            {route.icon ? (
              <Icon name={route.icon.replace("icon-", "")} size="md" />
            ) : (
              <Box sx={{ width: 20, height: 20 }} />
            )}
          </ListItemIcon>
          <ListItemText
            primary={route.name}
            sx={{
              opacity: 1,
              "& .MuiListItemText-primary": {
                fontSize: "0.875rem",
                fontWeight: isActive || isParentActive ? 600 : 400,
                color:
                  isActive || isParentActive ? "primary.main" : "text.primary",
              },
            }}
          />
          {hasChildren && (
            <Box sx={{ color: "text.secondary" }}>
              {currentOpen ? <Icon name="minus" /> : <Icon name="plus" />}
            </Box>
          )}
        </ListItemButton>
      </ListItem>

      {hasChildren && (
        <Collapse in={currentOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {route.children?.map((child, index) => (
              <MenuItem
                key={child.path || index}
                route={child}
                level={level + 1}
              />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
}

export default function LayoutAside() {
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});

  // 过滤掉登录页面，因为它不应该在侧边栏显示
  const filteredRoutes = routes.filter((route) => route.path !== "/login");

  const handleToggle = (path: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [path]: !prev[path],
    }));
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        backgroundColor: "transparent",
        borderRight: 1,
        borderColor: "divider",
        overflow: "auto",
      }}
    >
      <List sx={{ pt: 1 }}>
        {filteredRoutes.map((route, index) => (
          <MenuItem
            key={route.path || index}
            route={route}
            isOpen={openItems[route.path]}
            onToggle={() => handleToggle(route.path)}
          />
        ))}
      </List>
    </Box>
  );
}
