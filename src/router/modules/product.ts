import { RouteRecordRaw } from "vue-router";

const Layout = () => import("@/layout/index.vue");
const Parent = () => import("@/layout/routerView/parent.vue");

const routes: RouteRecordRaw = {
  path: "/product",
  name: "product",
  component: Parent,
  redirect: "/product/goods",
  meta: { title: "产品中心", icon: "fa fa-list-alt" },
  children: [
    {
      path: "/product/goods",
      name: "goods.index",
      component: () => import("@/views/post/index.vue"),
      meta: { title: "商品列表", icon: "goods", isKeepAlive: true },
      children: [
        {
          path: "/product/goods/add",
          name: "goods.add",
          component: () => import("@/views/post/form.vue"),
          meta: { title: "商品新增", icon: "fa fa-circle-o", isHidden: true, isKeepAlive: true },
        },
        {
          path: "/product/goods/edit/:id",
          name: "goods.edit",
          component: () => import("@/views/post/form.vue"),
          meta: { title: "商品编辑", icon: "fa fa-circle-o", isHidden: true, isKeepAlive: true },
        },
      ],
    },
    {
      path: "/product/classification",
      name: "product.classification.index",
      component: () => import("@/views/classification/index.vue"),
      meta: { title: "商品分类", icon: "ForkSpoon" },
      children: [
        {
          path: "/product/classification/edit/:id",
          name: "product.classification.edit",
          component: () => import("@/views/classification/form.vue"),
          meta: { title: "商品分类编辑", icon: "fa fa-circle-o", isHidden: true },
        },
        {
          path: "/product/classification/add",
          name: "product.classification.add",
          component: () => import("@/views/classification/form.vue"),
          meta: { title: "商品分类编辑", icon: "fa fa-circle-o", isHidden: true },
        },
      ],
    },

    {
      path: "/product/specification",
      name: "product.specification",
      component: () => import("@/views/specification/index.vue"),
      meta: { title: "规格管理", icon: "Calendar" },
    },
    {
      path: "/product/attribute",
      name: "product.attribute.index",
      component: () => import("@/views/attribute/index.vue"),
      meta: { title: "属性管理", icon: "Mic" },
    },
    {
      path: "/product/attribute/add",
      name: "product.attribute.add",
      component: () => import("@/views/attribute/form.vue"),
      meta: { title: "新增", icon: "fa fa-circle-o", isHidden: true },
    },
    {
      path: "/product/attribute/edit/:id",
      name: "product.attribute.edit",
      component: () => import("@/views/attribute/form.vue"),
      meta: { title: "编辑", icon: "fa fa-circle-o", isHidden: true },
    },
  ],
};

export default routes;
