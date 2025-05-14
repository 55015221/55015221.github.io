import { RouteRecordRaw } from "vue-router";

const Layout = () => import("@/layout/index.vue");
const Parent = () => import("@/layout/routerView/parent.vue");

const routes: RouteRecordRaw = {
  path: "/content",
  name: "content",
  component: Parent,
  redirect: "/content/article",
  meta: { title: "内容管理", icon: "fa fa-list-alt" },
  children: [
    {
      path: "/content/article",
      name: "content.article",
      meta: { title: "文章管理", icon: "fa fa-circle-o" },
      children: [
        {
          path: "/content/article/index",
          name: "content.article.index",
          component: () => import("@/views/article/index.vue"),
          meta: { title: "文章列表", icon: "fa fa-circle-o" },
          children: [
            {
              path: "/content/article/add",
              name: "content.article.add",
              component: () => import("@/views/article/form.vue"),
              meta: { title: "文章新增", isHidden: true },
            },
            {
              path: "/content/article/edit/:id",
              name: "content.article.edit",
              component: () => import("@/views/article/form.vue"),
              meta: { title: "文章编辑", isHidden: true },
            },
          ],
        },
      ],
    },
    {
      path: "/content/category",
      name: "content.category",
      component: () => import("@/views/category/index.vue"),
      meta: { title: "栏目管理", icon: "fa fa-circle-o" },
    },
    {
      path: "/content/config",
      name: "content.config",
      component: () => import("@/views/config/index.vue"),
      meta: { title: "配置列表", icon: "fa fa-circle-o" },
    },
    {
      path: "/content/tag/index",
      name: "content.tag.index",
      component: () => import("@/views/tag/index.vue"),
      meta: { title: "标签管理", icon: "fa fa-circle-o" },
    },
    {
      path: "/content/tag/add",
      name: "content.tag.add",
      component: () => import("@/views/tag/form.vue"),
      meta: { title: "新增标签", isHidden: true },
    },
    {
      path: "/content/tag/edit/:id",
      name: "content.tag.edit",
      component: () => import("@/views/tag/form.vue"),
      meta: { title: "修改标签", isHidden: true },
    },
    {
      path: "/content/media",
      name: "content.media",
      redirect: "/content/media/index",
      meta: { title: "媒体管理", icon: "fa fa-circle-o" },
      children: [
        {
          path: "/content/media/index",
          name: "content.media.index",
          component: () => import("@/views/media/index.vue"),
          meta: { title: "媒体列表", icon: "fa fa-circle-o" },
        },
        {
          path: "/content/media/add",
          name: "content.media.add",
          component: () => import("@/views/media/form.vue"),
          meta: { title: "新增媒体", icon: "fa fa-circle-o" },
        },
        {
          path: "/content/media/edit/:id",
          name: "content.media.edit",
          component: () => import("@/views/media/form.vue"),
          meta: { title: "新增媒体", isHidden: true },
        },
      ],
    },
  ],
};

export default routes;
