import type { RouteRecordRaw, RouterOptions, RouteLocationNormalized, RouteLocationNormalizedLoaded, NavigationGuardNext } from "vue-router";
import { createRouter, createWebHistory, createWebHashHistory, Router } from "vue-router";
import NProgress from "@/utils/nprogress";

// 路由相关数据
import { staticRoutes } from "./routes";
import { Session } from "@/utils/storage";
import { initFrontEndControlRoutes } from "@/router/frontEnd";
import { useRouteListStore } from "@/store/routeList";
import pinia from "@/store";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/store/user";
import { useTitle } from "@/hooks/useTitle";

/**
 * 创建路由实例
 * @method createRouter(options: RouterOptions): Router
 * @link 参考：https://next.router.vuejs.org/zh/api/#createrouter
 */
const router: Router = createRouter({
  history: createWebHistory(), // createWebHashHistory URL带#，createWebHistory URL不带#
  routes: staticRoutes as unknown as RouteRecordRaw[],
  strict: true, // 是否应该禁止尾部斜杠。默认为false
  // 当切换页面，滚动到最顶部
  scrollBehavior(to: RouteLocationNormalized, from: RouteLocationNormalizedLoaded, savedPosition) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ left: 0, top: 0 });
      }, 500);
    });
  },
} as RouterOptions);

// 全局解析守卫
router.beforeResolve(async (to: RouteLocationNormalized): Promise<void> => {});

// 路由加载前
router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): Promise<void> => {
  NProgress.start();
  const userStore = useUserStore();
  console.log("当前用户: ", userStore.userInfo);
  console.log("路由信息: ", from, to);
  console.log("登录状态: ", userStore.isAuthenticated);

  if (to.path === "/login" && !userStore.isAuthenticated) {
    next();
  } else {
    if (!userStore.isAuthenticated) {
      next(`/login?redirect=${to.path}&params=${JSON.stringify(to.query ? to.query : to.params)}`);
      Session.clear();
    } else if (userStore.isAuthenticated && to.path === "/login") {
      next("/");
    } else {
      const storesRoutesList = useRouteListStore(pinia);
      const { routeList } = storeToRefs(storesRoutesList);
      if (routeList.value.length === 0) {
        await initFrontEndControlRoutes();
        next({ path: to.path, query: to.query, replace: true });
      } else {
        next();
      }
    }
  }
});

// 路由加载后
router.afterEach((to: RouteLocationNormalized, from: RouteLocationNormalized): void => {
  useTitle(to?.meta?.title as string);
  NProgress.done();
});

export default router;
