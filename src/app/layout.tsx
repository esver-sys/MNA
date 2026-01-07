import { Geist, Geist_Mono } from "next/font/google";
import { getServerTheme } from "@/lib/theme-server";
import setting from "@/config/setting.json";

import "../styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: `${setting.name} - 首页`,
  description: setting.dosc,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = await getServerTheme();

  return (
    <html data-theme={theme} suppressHydrationWarning>
      <link rel="shortcut icon" href={setting.logoUrl} type="image/x-icon" />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
