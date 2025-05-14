const Layout = () => import("@/layout/index.vue");
const Parent = () => import("@/layout/routerView/parent.vue");

export default {
  path: "/system",
  name: "system",
  component: Parent,
  redirect: "/system/user",
  meta: { title: "系统管理", icon: "fa fa-cog" },
  children: [
    {
      path: "/system/user",
      name: "system.user",
      component: () => import("@/views/system/user/index.vue"),
      meta: { title: "用户管理", icon: "fa fa-user", isKeepAlive: true },
    },
    {
      path: "/system/role",
      name: "system.role",
      component: () => import("@/views/system/role/index.vue"),
      meta: { title: "角色管理", icon: "fa fa-list", isKeepAlive: true },
    },
    // {
    //     path: '/system/permission',
    //     name: 'system.permission',
    //     component: () => import('@/views/system/permission/index.vue'),
    //     meta: {title: '权限管理', icon: 'fa fa-table', isKeepAlive: true},
    // },
    {
      path: "/system/menu",
      name: "system.menu",
      component: () => import("@/views/system/menu/index.vue"),
      meta: { title: "菜单管理", icon: "fa fa-th", isKeepAlive: true },
    },
  ],
};
