import { useKeepAliveStore } from "@/store/keepAlive";
import pinia from "@/store";

interface TreeNode {
  id: number;
  children?: TreeNode[];
}

export function flattenTree(nodes: TreeNode[], parent_id: number | null = null): any[] {
  let result: any[] = [];

  nodes.forEach((node) => {
    // 将当前节点添加到结果数组
    result.push({ ...node, parent_id });

    // 如果当前节点有子节点，则递归扁平化
    if (node.children && node.children.length > 0) {
      result = result.concat(flattenTree(node.children, node.id));
    }
  });

  return result;
}

/**
 * 路由多级嵌套数组处理成一维数组
 * @param arr 传入路由菜单数据数组
 * @returns 返回处理后的一维路由菜单数组
 */
export function formatFlatteningRoutes(arr: any) {
  if (arr.length <= 0) return false;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].children) {
      arr = arr.slice(0, i + 1).concat(arr[i].children, arr.slice(i + 1));
    }
  }
  return arr;
}

/**
 * 一维数组处理成多级嵌套数组（只保留二级：也就是二级以上全部处理成只有二级，keep-alive 支持二级缓存）
 * @description isKeepAlive 处理 `name` 值，进行缓存。顶级关闭，全部不缓存
 * @link 参考：https://v3.cn.vuejs.org/api/built-in-components.html#keep-alive
 * @param arr 处理后的一维路由菜单数组
 * @returns 返回将一维数组重新处理成 `定义动态路由（dynamicRoutes）` 的格式
 */
export function formatTwoStageRoutes(arr: any) {
  if (arr.length <= 0) return false;
  const newArr: any = [];
  const cacheList: Array<string> = [];
  arr.forEach((v: any) => {
    if (v.path === "/") {
      newArr.push({
        component: v.component,
        name: v.name,
        path: v.path,
        redirect: v.redirect,
        meta: v.meta,
        children: [],
      });
    } else {
      // 判断是否是动态路由（xx/:id/:name），用于 tagsView 等中使用
      // 修复：https://gitee.com/lyt-top/vue-next-admin/issues/I3YX6G
      if (v.path.indexOf("/:") > -1) {
        v.meta["isDynamic"] = true;
        v.meta["isDynamicPath"] = v.path;
      }
      newArr[0].children.push({ ...v });
      // 存 name 值，keep-alive 中 include 使用，实现路由的缓存
      // 路径：/@/layout/routerView/parent.vue
      if (newArr[0].meta?.isKeepAlive && v.meta?.isKeepAlive) {
        cacheList.push(v.name);
        const stores = useKeepAliveStore(pinia);
        stores.setCacheKeepAlive(cacheList);
      }
    }
  });
  return newArr;
}

export function isExternalLink(path: string) {
  return /^(https?:|mailto:|tel:)/.test(path);
}

export const hasPermission = (permissions: any[], route: { meta: { permissions: string | any[] } }) => {
  if (route.meta && route.meta.permissions) {
    return permissions.some((role) => route.meta.permissions.includes(role));
  } else {
    return true;
  }
};

/**
 * 路由过滤（过滤出有权限的路由）
 * @param {(meta: object, route: routes[0]) => boolean} filterCallback
 * @returns {routes}
 */
export const filterAsyncRoutes = (routes: any[], filterCallback: any) => {
  const loop = (curRoutes: any[]) =>
    curRoutes
      .filter((route) => filterCallback(route.meta || {}, route))
      .map(({ children, ...newRoute }) => {
        if (children) {
          children.map((route: { path: string }) => {
            route.path = newRoute.path + "/" + route.path;
          });
          newRoute.children = loop(children);
        }
        return newRoute;
      });
  return loop(routes);
};
