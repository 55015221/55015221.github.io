export {};
/**
 * name:'router-name'          设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * meta : {
    isHidden: true              当设置 true 的时候该路由不会再侧边栏出现 如404，login等页面(默认 false)
    title: 'title'            设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'          设置该路由的图标
    cache: true             	如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    breadcrumb: false         如果设置为false，则不会在breadcrumb面包屑中显示(默认 true)
    isKeepAlive: true               如果设置为true，则会一直固定在tag项中(默认 false)
    isAffix: true               如果设置为true，则会一直固定在tag项中(默认 false)
    active: '/dashboard'  		显示高亮的路由路径
  }
 **/

// 扩展 RouteMeta 接口
import type {RouteRecordRaw, RouteMeta} from 'vue-router';
declare module 'vue-router' {
    interface RouteMeta extends Record<string | number | symbol, unknown> {
        title?: string;
        isHidden?: boolean;
        isKeepAlive?: boolean;
        isAffix?: boolean;
        icon?: string;
    }
    interface RouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {

    }
}