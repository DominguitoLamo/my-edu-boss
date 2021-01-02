import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@/layout/index.vue';

Vue.use(Router);

// 路由配置管理
/*
component的import可以實現動態加載，webpackChunkName可以設定打包後的模块名字
*/
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: 'login' */ '@/views/login/index.vue'),
    },
    {
      path: '/',
      component: Layout ,
      children: [
        {
          path: '',
          name: 'home',
          component: () => import(/* webpackChunkName: 'home' */ '@/views/home/index.vue'),
        },
      ],
    },
    {
      path: '*',
      name: '404',
      component: () => import(/* webpackChunkName: 'error-page' */ '@/views/error-page/404.vue'),
    },
  ],
});
