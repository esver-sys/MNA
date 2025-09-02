import { Icon } from "@/components/icons";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import ThemeToggle from "@/components/ThemeToggle";
import setting from "@/config/setting.json";
import Image from "next/image";
import React from "react";

// logo 区域 PC端
function PcLogo() {
  return (
    <div className="flex items-center h-full gap-2 flex-1">
      <Icon name="logo" className="w-10 h-10" />
      <span className="tracking-wide text-2xl font-semibold">
        {setting.name}
      </span>
    </div>
  );
}

// 标题区域
function Title() {
  return <div>title</div>;
}

// 操作区域
function ActionBar() {
  return (
    <div className="flex h-full items-center gap-4">
      <ThemeToggle />
      <LocaleSwitcher />
    </div>
  );
}

export default function LayoutHeader() {
  return (
    <div className="h-full w-full flex justify-center items-center px-14">
      <PcLogo />
      <ActionBar />
    </div>
  );
}
