import { useTranslations } from "next-intl";
import React from "react";

export default function Dosc() {
  const t = useTranslations();
  return (
    <div>
      <span>Dosc</span>
      <span>{t("Home.learn")}</span>

      <div className="w-[1600px] h-[800px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-100 flex justify-center items-center">
        <label className="p-[2px] border-[10px] border-black flex justify-center items-center">
          <div className="w-[126px] h-[126px] bg-white"></div>
        </label>
      </div>
    </div>
  );
}
