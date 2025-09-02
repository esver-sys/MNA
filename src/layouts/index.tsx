"use client";
import React from "react";
import LayoutHeader from "./header";
import LayoutAside from "./aside";
import { useLayoutSwitch } from "@/hooks/useLayoutSwitch";

export default function ComponentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { layout, switchLayout } = useLayoutSwitch();

  return (
    <div id="root">
      <div className="w-full h-full relative">
        <div className="h-[64px] w-full absolute left-0 top-0 layout-header">
          <LayoutHeader></LayoutHeader>
        </div>
        <div className="h-full w-[256px] absolute left-0 top-[64px] layout-aside">
          <LayoutAside></LayoutAside>
        </div>
        <div className="content absolute left-[256px] layout-main top-[64px] w-[calc(100%-256px)] h-[calc(100%-64px)]">
          <div className="h-full w-full">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
