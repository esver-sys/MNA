"use client";
import React from "react";
import LayoutHeader from "./header";
import LayoutAside from "./aside";
import Ui1 from "@/components/demo/ui-1";
import Ui2 from "@/components/demo/ui-2";

export default function ComponentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div id="root">
      <div className="w-full h-full relative bg-[#1a1a1a]">
        <div className="h-[54px] w-full absolute left-0 top-0 layout-header">
          <LayoutHeader></LayoutHeader>
        </div>
        <div className="absolute top-[54px] w-full h-[calc(100%-54px)] bg-white rounded-t-2xl overflow-hidden">
          {children}
          {/* <div className="h-full w-full">
            <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4">
              <Ui1 />
              <Ui2 />
            </div>
          </div> */}
          {/* <div className="h-full w-[256px] absolute left-0 layout-aside p-2.5">
            <LayoutAside></LayoutAside>
          </div>
          <div className="content absolute left-[256px] layout-main w-[calc(100%-256px)] h-[calc(100%-64px)]">
            <div className="h-full w-full">
              {children}
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
