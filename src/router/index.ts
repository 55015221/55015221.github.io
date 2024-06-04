import type { RouteRecordRaw, RouterOptions } from "vue-router";
import { createRouter, createWebHistory, Router } from "vue-router";
import NProgress from "@/utils/nprogress";
import { staticRoutes } from "@/router/routes.ts";
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
	scrollBehavior() {
		return new Promise((resolve, _) => {
			setTimeout(() => {
				resolve({ left: 0, top: 0 });
			}, 500);
		});
	},
} as RouterOptions);

// 全局解析守卫
router.beforeResolve(async (): Promise<void> => {});

// 路由加载前
router.beforeEach(async (to, from, next): Promise<void> => {
	NProgress.start();
	console.log("路由信息: ", from, to);
	next();
});

// 路由加载后
router.afterEach((to): void => {
	useTitle(to?.meta?.title as string);
	NProgress.done();
});

export default router;
