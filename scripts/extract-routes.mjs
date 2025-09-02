import fs from 'fs';
import path from 'path';
import JSON5 from 'json5';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * 递归扫描目录，查找所有的json5配置文件
 * @param {string} dir - 要扫描的目录
 * @param {string[]} extensions - 要查找的文件扩展名
 * @returns {string[]} - 找到的文件路径数组
 */
function findConfigFiles(dir, extensions = ['.json5']) {
  const files = [];
  
  function scanDirectory(currentDir) {
    const items = fs.readdirSync(currentDir);
    
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        // 递归扫描子目录
        scanDirectory(fullPath);
      } else if (stat.isFile()) {
        // 检查文件扩展名
        const ext = path.extname(item);
        if (extensions.includes(ext)) {
          files.push(fullPath);
        }
      }
    }
  }
  
  scanDirectory(dir);
  return files;
}

/**
 * 解析json5配置文件
 * @param {string} filePath - 文件路径
 * @returns {object|null} - 解析后的配置对象
 */
function parseConfigFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    // 移除注释行（以//开头的行）
    const cleanContent = content
      .split('\n')
      .filter(line => !line.trim().startsWith('//'))
      .join('\n');
    
    const config = JSON5.parse(cleanContent);
    
    // 添加文件路径信息
    config._filePath = filePath;
    config._relativePath = path.relative(process.cwd(), filePath);
    
    return config;
  } catch (error) {
    console.warn(`解析配置文件失败: ${filePath}`, error.message);
    return null;
  }
}

/**
 * 验证路由配置的必要字段
 * @param {object} config - 配置对象
 * @returns {boolean} - 是否为有效的路由配置
 */
function isValidRouteConfig(config) {
  return config && 
         typeof config.name === 'string' && 
         typeof config.path === 'string' && 
         typeof config.component === 'string';
}

/**
 * 扫描目录结构，构建路由树
 * @param {string} dir - 要扫描的目录
 * @param {string} basePath - 基础路径
 * @param {string} rootDir - 根目录路径
 * @returns {object[]} - 路由树数组
 */
function buildRouteTree(dir, basePath = '', rootDir = '') {
  const routes = [];
  
  if (!fs.existsSync(dir)) {
    return routes;
  }
  
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    // 跳过以()或[]包围的目录
    if (item.startsWith('(') && item.endsWith(')') || 
        item.startsWith('[') && item.endsWith(']')) {
      continue;
    }
    
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      // 构建当前目录的路径
      const currentPath = basePath ? `${basePath}/${item}` : `/${item}`;
      
      // 查找当前目录的配置文件
      const configPath = path.join(fullPath, 'page.json5');
      let routeConfig = null;
      
      if (fs.existsSync(configPath)) {
        routeConfig = parseConfigFile(configPath);
      }
      
      // 递归扫描子目录
      const children = buildRouteTree(fullPath, currentPath, rootDir);
      
      // 如果有配置文件或有子路由，则创建路由项
      if (routeConfig && isValidRouteConfig(routeConfig)) {
        const route = {
          name: routeConfig.name,
          path: routeConfig.path || currentPath,
          component: routeConfig.component,
          icon: routeConfig.icon || null,
          rank: routeConfig.rank,
          meta: {
            title: routeConfig.title || routeConfig.name,
            description: routeConfig.description || '',
            keywords: routeConfig.keywords || [],
            auth: routeConfig.auth !== false,
            cache: routeConfig.cache !== false,
            ...routeConfig.meta
          },
          _source: {
            filePath: routeConfig._filePath,
            relativePath: routeConfig._relativePath
          }
        };
        
        // 如果有子路由，添加children字段
        if (children.length > 0) {
          route.children = children;
        }
        
        routes.push(route);
      } else if (children.length > 0) {
        // 如果没有配置文件但有子路由，创建一个默认的父路由
        const route = {
          name: item,
          path: currentPath,
          component: `@/app/[root]${currentPath}/page`,
          icon: null,
          rank: undefined,
          meta: {
            title: item,
            description: `${item}页面`,
            keywords: [item],
            auth: true,
            cache: true
          },
          children: children,
          _source: {
            filePath: 'auto-generated',
            relativePath: 'auto-generated'
          }
        };
        
        routes.push(route);
      }
    }
  }
  
  // 根据rank字段进行排序：从小到大，未定义则排列至最后
  routes.sort((a, b) => {
    const rankA = a.rank;
    const rankB = b.rank;
    
    // 如果两个都未定义rank，保持原有顺序
    if (rankA === undefined && rankB === undefined) {
      return 0;
    }
    
    // 如果a未定义rank，b有定义，a排在后面
    if (rankA === undefined && rankB !== undefined) {
      return 1;
    }
    
    // 如果b未定义rank，a有定义，a排在前面
    if (rankA !== undefined && rankB === undefined) {
      return -1;
    }
    
    // 两个都有定义rank，按数值大小排序
    return rankA - rankB;
  });
  
  return routes;
}

/**
 * 提取路由数据
 * @param {string} pagesDir - 页面目录路径
 * @returns {object[]} - 提取的路由数据数组
 */
function extractRoutes(pagesDir = './src/app/[root]') {
  // 构建路由树
  const routes = buildRouteTree(pagesDir, '', pagesDir);
  return routes;
}

/**
 * 递归计算路由总数
 * @param {object[]} routes - 路由数组
 * @returns {number} - 路由总数
 */
function countTotalRoutes(routes) {
  let count = 0;
  for (const route of routes) {
    count++;
    if (route.children) {
      count += countTotalRoutes(route.children);
    }
  }
  return count;
}

/**
 * 递归计算需要认证的路由数
 * @param {object[]} routes - 路由数组
 * @returns {number} - 需要认证的路由数
 */
function countRoutesWithAuth(routes) {
  let count = 0;
  for (const route of routes) {
    if (route.meta && route.meta.auth) {
      count++;
    }
    if (route.children) {
      count += countRoutesWithAuth(route.children);
    }
  }
  return count;
}

/**
 * 递归计算有图标的路由数
 * @param {object[]} routes - 路由数组
 * @returns {number} - 有图标的路由数
 */
function countRoutesWithIcon(routes) {
  let count = 0;
  for (const route of routes) {
    if (route.icon) {
      count++;
    }
    if (route.children) {
      count += countRoutesWithIcon(route.children);
    }
  }
  return count;
}

/**
 * 生成路由文件
 * @param {object[]} routes - 路由数据数组
 * @param {string} outputPath - 输出文件路径
 * @param {string} format - 输出格式 ('json' | 'ts' | 'js')
 */
function generateRouteFile(routes, outputPath, format = 'json') {
  const dir = path.dirname(outputPath);
  
  // 确保输出目录存在
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  let content = '';
  
  switch (format) {
    case 'json':
      content = JSON.stringify(routes, null, 2);
      break;
      
    case 'ts':
      content = `// 自动生成的路由配置文件\n// 生成时间: ${new Date().toISOString()}\n\nexport interface RouteConfig {\n  name: string;\n  path: string;\n  component: string;\n  icon?: string | null;\n  meta: {\n    title: string;\n    description: string;\n    keywords: string[];\n    auth: boolean;\n    cache: boolean;\n    [key: string]: any;\n  };\n  children?: RouteConfig[];\n  _source: {\n    filePath: string;\n    relativePath: string;\n  };\n}\n\nexport const routes: RouteConfig[] = ${JSON.stringify(routes, null, 2)};\n\nexport default routes;\n`;
      break;
      
    case 'js':
      content = `// 自动生成的路由配置文件\n// 生成时间: ${new Date().toISOString()}\n\nconst routes = ${JSON.stringify(routes, null, 2)};\n\nmodule.exports = routes;\n`;
      break;
      
    default:
      throw new Error(`不支持的输出格式: ${format}`);
  }
  
  fs.writeFileSync(outputPath, content, 'utf-8');
}

// 主函数
function main() {
  try {
    // 提取路由数据
    const scanDirs = ['./src/app/[root]', './src/app/(auth)'];
    let allRoutes = [];
    
    for (const scanDir of scanDirs) {
      const routes = extractRoutes(scanDir);
      allRoutes = allRoutes.concat(routes);
    }
    
    const routes = allRoutes;
    
    // 固定添加根路径路由
    const rootRoute = {
      name: "首页",
      path: "/",
      component: "@/app/[root]/home/page",
      icon: "icon-home",
      rank: 0,
      meta: {
        title: "首页",
        description: "应用首页",
        keywords: ["首页", "主页"],
        auth: true,
        cache: true
      },
      _source: {
        filePath: "system-generated",
        relativePath: "system-generated"
      }
    };
    
    // 检查是否已存在根路径路由，如果不存在则添加
    const hasRootRoute = routes.some(route => route.path === '/');
    const hasHomeRoute = routes.some(route => route.path === '/home');
    
    if (!hasRootRoute && hasHomeRoute) {
      // 如果有/home路由但没有/路由，将/home路由的path改为/
      const homeRoute = routes.find(route => route.path === '/home');
      if (homeRoute) {
        homeRoute.path = '/';
      }
    } else if (!hasRootRoute && !hasHomeRoute) {
      routes.unshift(rootRoute); // 添加到数组开头
    }
    if (routes.length === 0) {
      return;
    }
    // 生成路由文件
    const outputDir = './src/config/routes';
    generateRouteFile(routes, path.join(outputDir, 'routes.json'), 'json');
    
  } catch (error) {
    console.error('路由提取失败:', error);
    process.exit(1);
  }
}

// 直接运行主函数
main();

export {
  extractRoutes,
  generateRouteFile,
  findConfigFiles,
  parseConfigFile,
  isValidRouteConfig
};