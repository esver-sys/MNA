// 允许访问的 locale 列表
export const allowedLocales = new Set(["en", "zh"]);

// 默认 locale
export const defaultLocale = "en";

// 检查 locale 是否被允许
export function isLocaleAllowed(locale: string): boolean {
  return allowedLocales.has(locale);
}