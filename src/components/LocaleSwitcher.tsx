"use client";

import React, { useTransition } from "react";
import { useLocale } from "next-intl";
import { setUserLocale } from "@/i18n/service";
import { Icon } from "./icons";

export default function LocaleSwitcher() {
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();

  const handleToggleLocale = () => {
    const newLocale = locale === "zh" ? "en" : "zh";
    startTransition(() => {
      setUserLocale(newLocale);
    });
  };

  return (
    <div
      className="flex items-center justify-center mx-2.5 rounded-full p-2 hover:bg-black/20 duration-150 cursor-pointer transition-colors"
      title={`${locale === "zh" ? "English" : "中文"}`}
      onClick={handleToggleLocale}
      style={{ opacity: isPending ? 0.6 : 1 }}
    >
      {locale === "zh" ? (
        <Icon name="zh" size={24} />
      ) : (
        <Icon name="en" size={24} />
      )}
    </div>
  );
}
