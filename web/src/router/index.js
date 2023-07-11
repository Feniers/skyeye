
// import { reduce } from 'core-js/core/array'
import Vue from 'vue'
import VueRouter from 'vue-router'

// import Main from 'video-analysis-front\web\src\views\admin\main.vue' //主页面 头部标题+左侧菜单+content显示区
// import Login from 'video-analysis-front\web\src\views\login\index.vue' //登录
// import TList from 'video-analysis-front\web\src\views\admin\trustListView.vue' //content显示区--白名单
// import BList from 'video-analysis-front\web\src\views\admin\BlacklistView.vue' //content显示区--黑名单
// import UserManage from 'video-analysis-front\web\src\views\admin\UserManage.vue' //content显示区--用户管理


Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {  //登录界面
      path: '/login',
      component: () => import('@/views/login/index.vue')
    },
    // { path: '/', redirect: '/login' },
    { path: '/', redirect: '/usermag' },
    { path: '/register', component: () => import('@/views/register/index') },

    {
      //主界面
      path: '/main',
      component: () => import('@/views/layout/main.vue'),
      // redirect:'/usermag',
      children: [
        // { //管理员
        //   path: '/admin',
        //   redirect: '/usermag',
        //   // component: () => import('@/views/layout/main.vue'),
        //   children: [  //主界面content显示界面
            { //content页面--信任人员名单管理
              path: '/tlist',
              component: () => import('@/views/admin/trustListView.vue')
            },
            { //content页面--黑名单人员管理
              path: '/blist',
              component: () => import('@/views/admin/BlacklistView.vue')
            },
            { //content页面--用户信息管理
              path: '/usermag',
              component: () => import('@/views/admin/UserManage.vue')
            },
          // ]
        // },
        // { //监控
        //   path: 'oprate',
        //   redirect: 'moniter',
        //   children: [
            {
              path: 'miniter',
              component: () => import('@/views/layout/vedioView.vue')
            },
            {
              path: 'record',
              component: () => import('@/views/layout/VedioInfoView.vue')
            },
            {
              path: 'recordD',
              component: () => import('@/views/layout/VedioInfoViewD.vue')
            }
          // ]
        // }
      ]

    },



    // { path: '/layout', component: () => import('@/views/layout') },
    // { path: '/login', component: () => import('@/views/login/index') },
    // { path: '/register', component: () => import('@/views/register/index') },

    // { path: '/blacklist', component: () => import('@/views/admin/BlacklistView.vue') },
    // { path: '/emp', component: () => import('@/views/admin/EmpView.vue') },

    // //添加了用户信息、视频信息（简略&详细）的路径  ---sl
    // {path:  '/usermanage', component: () => import('@/views/admin/userManage.vue')}, //用户信息路径
    // {path:  '/vedioinfo', component: () =>import('@/views/admin/VedioInfoView.vue')}, //简略视频信息路径
    // {path:  '/dangerimg', component: () =>import('@/views/admin/dangerImgPush.vue')},  //上传黑名单人员照片
    // {path:  '/trustimg', component: () =>import('@/views/admin/trustImgPush.vue')}    //上传信任人员照片

  ]
})

export default router
