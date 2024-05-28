import {RouteRecordRaw} from 'vue-router';

const Layout = () => import('@/layout/index.vue');

// 固定路由（默认路由）
const staticRoutes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: Layout,
        redirect: '/index',
        children: [
            {
                path: 'index',
                name: 'index',
                component: () => import('@/views/home/index.vue'),
                meta: {title: '登录'},
            },
            {
                path: 'about',
                name: 'about',
                component: () => import('@/views/about/index.vue'),
                meta: {title: '登录'},
            },
            {
                path: '/:all(.*)*', // 404路由
                name: 'notFound',
                component: () => import('@/views/error/index.vue'),
                meta: {title: '找不到页面', hidden: true},
            }
        ]
    }
];


export {staticRoutes};
