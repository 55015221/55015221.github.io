const Layout = () => import("@/layout/index.vue");
const Parent = () => import("@/layout/routerView/parent.vue");
export default {
  path: "/dashboard",
  name: "dashboard",
  component: Parent,
  redirect: "/dashboard/index",
  meta: { title: "工作台", icon: "fa fa-home" },
  children: [
    {
      path: "/dashboard/index",
      name: "dashboard.index",
      component: () => import("@/views/index.vue"),
      meta: { title: "工作台1", icon: "fa fa-circle-o", isKeepAlive: true },
    },
  ],
};
