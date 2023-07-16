
// import { reduce } from 'core-js/core/array'
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// import Layout from '@/moniter'
import Layout from '@/layout/menu.vue'

const routes = [
  {//主页面
    path: '/',
    name: 'Hello',
    redirect: '/login',
    hidden: true,
    // component: () => import('@/views//Hello')//路由懒加载
    // component:()=>import('@/moniter/menu.vue')
  },

  {  //登录界面
    path: '/login',
    name: 'Login',
    hidden: true,
    // component: () => import('@/views/login/index')
    component: () => import('@/views/login/web-login.vue')
  },
  {//注册
    path: '/register',
    name: 'Register',
    hidden: true,
    component: () => import('@/views/register/index')
  },
  {
    path:'/person',
    name:'PersonInfo',
    hidden:true,
    component: () => import('@/views/PersonView.vue')
  },
  
  {//操作界面
    path: '/home',
    name: '监控',
    // hidden: true,
    menuType: '1',
    component:Layout,
    redirect:'moniter',
    children: [
      {
        path: '/moniter',
        name: '主监控',
        menuType: '2',
        // component: () => import('@/views/moniter/vedioView.vue')
        component: () => import('@/views/moniter/video.vue')
      },
      {
        path: '/reID',
        name: 'ATM监控',
        menuType: '2',
        component: () => import('@/views/moniter/video2.vue')
      },
      {
        path: '/record',
        name: '监控记录',
        menuType: '2',
        component: () => import('@/views/moniter/record.vue')
      },
      {
        path: '/intrusion',
        name: '入侵记录',
        menuType: '2',
        component: () => import('@/views/moniter/IntrusionRecords.vue')
      },
    ]
  },

  {//管理员界面
    path: '/admin',
    name: '管理员',
    menuType: '1',
    component:Layout,
    // component: () => import('@/views/admin/index'),
    children: [
      { //content页面--用户信息管理
        path: '/usermag',
        name: '用户信息管理',
        menuType: '2',
        component: () => import('@/views/admin/UserManage.vue')
      },
      { 
        path: '/wamag',
        name: '警戒区管理',
        menuType: '2',
        component: () => import('@/views/admin/waringAreaMag.vue')
      },
      // { //content页面--信任人员名单管理
      //   path: '/tlist',
      //   name: '信任人员名单管理',
      //   menuType: '2',
      //   component: () => import('@/views/admin/trustListView.vue')
      // },
      { //content页面--黑名单人员管理
        path: '/blist',
        name: '照片上传',
        menuType: '2',
        component: () => import('@/views/admin/ImgPush.vue')
        // component: () => import('@/views/admin/ImgPushToQINIU.vue')
      },
      

    ]
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  // logRoutes,
  routes
});

export default router;