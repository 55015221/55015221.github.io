import { RouteRecordRaw } from "vue-router";

const Layout = () => import("@/layout/index.vue");

// 固定路由（默认路由）
const staticRoutes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: Layout,
    redirect: "/",
    children: [
      {
        path: "/",
        name: "home",
        component: () => import("@/views/home/index.vue"),
        meta: { title: "首页" },
      },
      {
        path: "product",
        name: "product",
        component: () => import("@/views/product/index.vue"),
        meta: { title: "关于" },
      },
      {
        path: "about",
        name: "about",
        component: () => import("@/views/about/index.vue"),
        meta: { title: "关于" },
      },
      {
        path: "/:all(.*)*", // 404路由
        name: "notFound",
        component: () => import("@/views/error/index.vue"),
        meta: { title: "找不到页面", hidden: true },
      },
    ],
  },
];

export { staticRoutes };
