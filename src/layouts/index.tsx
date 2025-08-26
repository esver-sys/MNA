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
        <div className="h-[64px] w-full shadow-2xs absolute left-0 top-0">
          <LayoutHeader></LayoutHeader>
        </div>
        <div className="h-full w-[256px] shadow-2xs absolute left-0 top-[64px]">
          <LayoutAside></LayoutAside>
        </div>
        <div className="content p-6 absolute left-[256px] top-[64px] w-[calc(100%-256px)] h-[calc(100%-64px)]">
          {children}
        </div>
      </div>
    </div>
  );
}
