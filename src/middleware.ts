// 导入 next-intl 的中间件创建函数
import createMiddleware from "next-intl/middleware";
// 导入国际化配置中的语言列表和默认语言
import { locales, defaultLocale } from "./i18n/config";
import { NextRequest, NextResponse } from "next/server";
import routes from "./routes/routes.json";

// 创建国际化中间件
const intlMiddleware = createMiddleware({
  locales, // 支持的语言列表
  defaultLocale, // 默认语言
  localePrefix: "never", // 不在URL中显示语言前缀
});

// 获取所有注册的路由路径（包括子路由）
const getAllPaths = (routes: any[]): string[] => {
  const paths: string[] = [];
  routes.forEach(route => {
    paths.push(route.path);
    if (route.children) {
      paths.push(...getAllPaths(route.children));
    }
  });
  return paths;
};

// 查找匹配路径的路由信息
const findRouteByPath = (routes: any[], pathname: string): any => {
  for (const route of routes) {
    if (route.path === pathname) {
      return route;
    }
    if (route.children) {
      const found = findRouteByPath(route.children, pathname);
      if (found) return found;
    }
  }
  return null;
};

const registeredPaths = new Set(getAllPaths(routes));

// 导出组合中间件
export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // 跳过静态资源和API路由
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/imgs/') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }
  
  // 检查路由是否已注册
  if (!registeredPaths.has(pathname)) {     
    // 返回 /404 页面
    return NextResponse.rewrite(new URL('/404', request.url));
  }
  
  // 检查路径对应的component是否包含"(auth)"
  const route = findRouteByPath(routes, pathname);
  if (route && route.component && route.component.includes('(auth)')) {
    return NextResponse.next();
  }
  
  // 如果路由已注册，继续执行国际化中间件
  return intlMiddleware(request);
}

// 中间件配置
export const config = {
  // 匹配器：定义哪些路径会被中间件处理
  // '/' 匹配根路径，'/((?!_next|api|favicon.ico).*)' 匹配除了静态资源外的所有路径
  matcher: ["/", "/((?!_next|api|favicon.ico).*)"],
};
