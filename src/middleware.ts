// 导入 next-intl 的中间件创建函数
import createMiddleware from "next-intl/middleware";
// 导入国际化配置中的语言列表和默认语言
import { locales, defaultLocale } from "./i18n/config";

// 创建并导出国际化中间件
export default createMiddleware({
  locales, // 支持的语言列表
  defaultLocale, // 默认语言
  localePrefix: "never", // 不在URL中显示语言前缀
});

// 中间件配置
export const config = {
  // 匹配器：定义哪些路径会被中间件处理
  // '/' 匹配根路径，'/(zh|en)/:path*' 匹配带有语言前缀的所有路径
  matcher: ["/", "/(zh|en)/:path*"],
};
