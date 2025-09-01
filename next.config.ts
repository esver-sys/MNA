import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import routes from "./src/config/routes/routes.json";
import path from "path";

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

// 获取所有注册的组件路径
const registeredComponents = new Set(
  routes.map(route => {
    // 将 @/app 转换为实际的文件路径
    const componentPath = route.component.replace('@/', './src/');
    return path.resolve(componentPath);
  })
);

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.cloudfastin.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  webpack: (config, { dev, isServer }) => {
    // 只在生产构建时启用路由过滤
    if (!dev && !isServer) {
      // 添加插件来过滤未注册的页面组件
      config.plugins.push({
        apply: (compiler: any) => {
          compiler.hooks.normalModuleFactory.tap('RouteFilter', (factory: any) => {
            factory.hooks.beforeResolve.tap('RouteFilter', (resolveData: any) => {
              if (resolveData.request) {
                const requestPath = path.resolve(resolveData.context, resolveData.request);
                
                // 检查是否是页面组件
                if (
                  requestPath.includes('/app/') && 
                  (requestPath.endsWith('/page.tsx') || requestPath.endsWith('/page.js'))
                ) {
                  // 检查是否在注册的组件列表中
                  const isRegistered = Array.from(registeredComponents).some(regPath => 
                    requestPath.includes(regPath.replace('./src/', '/src/'))
                  );
                  
                  if (!isRegistered) {
                    // 如果未注册，阻止打包
                    return false;
                  }
                }
              }
              return resolveData;
            });
          });
        }
      });
    }
    
    return config;
  },
};

export default withNextIntl(nextConfig);
