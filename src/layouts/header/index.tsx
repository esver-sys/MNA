"use client";
import { Icon } from "@/components/icons";
import setting from "@/config/setting.json";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

// logo 区域 PC端
function PcLogo() {
  const router = useRouter();
  return (
    <div className="flex items-center h-full gap-2 flex-1 cursor-pointer" onClick={()=>router.push('/')}>
      <Icon name="logo" className="w-8 h-8 text-green-300" />
      <span className="tracking-wide text-xl italic font-semibold text-white">
        {setting.name}
      </span>
    </div>
  );
}

// search区域
function HeaderSearch() {
  return (
    <div className="max-w-[640px] px-4 w-full h-full">
      <div className="w-full h-full py-2.5">
        <div className="w-full h-full bg-white/10 rounded-3xl flex items-center px-2.5">
          <Search color="#838383" size={20} />
          <input type="text" placeholder="请输入想要搜索的内容" className="flex-1 outline-none ml-2.5 text-[15px] text-[#f1f1f1] placeholder:text-[#818181] placeholder:font-light placeholder:italic placeholder:text-sm"/>
        </div>
      </div>
    </div>
  );
}

// action 区域
function ActionBar() {
  return (
    <div className="flex items-center gap-2 justify-end">
      {/* <ThemeToggle /> */}
    </div>
  );
}

export default function LayoutHeader() {
  return (
    <div className="h-full w-full grid grid-cols-3 px-5">
      <PcLogo />
      <HeaderSearch />
      <ActionBar />
    </div>
  );
}
