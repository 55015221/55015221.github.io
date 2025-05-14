import { RouteRecordRaw } from "vue-router";

const Layout = () => import("@/layout/index.vue");
const Parent = () => import("@/layout/routerView/parent.vue");

// 固定路由（默认路由）
const staticRoutes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login.vue"),
    meta: { title: "登录", isHidden: true },
  },
  {
    path: "/:all(.*)*", // 404路由
    name: "notFound",
    component: () => import("@/views/[...all].vue"),
    meta: { title: "找不到页面", isHidden: true },
  },
];

import dashboard from "./modules/dashboard";
import content from "./modules/content";
import product from "./modules/product";
import system from "./modules/system";

// 动态路由（异步路由、导航栏路由）
// const dynamicRoutes: Array<RouteRecordRaw> = [dashboard, content, system];
const dynamicRoutes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: Layout,
    redirect: "/dashboard",
    meta: { isKeepAlive: true },
    children: [dashboard, system, content, product],
  },
];

export { staticRoutes, dynamicRoutes };
