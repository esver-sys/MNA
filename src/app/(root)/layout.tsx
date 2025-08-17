import ComponentLayout from "@/layouts";
import React from "react";

export default async function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ComponentLayout>
      {children}
    </ComponentLayout>
  );
}
