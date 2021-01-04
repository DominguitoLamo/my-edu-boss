import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@/layout/index.vue';
import store from './store';

Vue.use(Router);

// 路由配置管理
/*
component的import可以實現動態加載，webpackChunkName可以設定打包後的模块名字
*/
const router =  new Router({
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
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: '',
          name: 'home',
          component: () => import(/* webpackChunkName: 'home' */ '@/views/home/index.vue'),
        },
        {
          path: '/role',
          name: 'role',
          component: () => import(/* webpackChunkName: 'home' */ '@/views/role/index.vue'),
        },
        {
          path: '/menu',
          name: 'menu',
          component: () => import(/* webpackChunkName: 'home' */ '@/views/menu/index.vue'),
        },
        {
          path: '/resource',
          name: 'resource',
          component: () => import(/* webpackChunkName: 'home' */ '@/views/resource/index.vue'),
        },
        {
          path: '/course',
          name: 'course',
          component: () => import(/* webpackChunkName: 'home' */ '@/views/course/index.vue'),
        },
        {
          path: '/user',
          name: 'user',
          component: () => import(/* webpackChunkName: 'home' */ '@/views/user/index.vue'),
        },
        {
          path: '/advert',
          name: 'advert',
          component: () => import(/* webpackChunkName: 'home' */ '@/views/advert/index.vue'),
        },
        {
          path: '/advert-space',
          name: 'advert-space',
          component: () => import(/* webpackChunkName: 'home' */ '@/views/advert-space/index.vue'),
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

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.state.user) {
      next({
        name: 'login',
        query: {
          redirect: to.fullPath,
        }
      })
    } else {
      next()
    }
  } else {
    next ()
  }
}) 
  

export default router