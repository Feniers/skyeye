
// import { reduce } from 'core-js/core/array'
import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {  //登录界面
      path: '/login',
      component: () => import('@/views/login/index.vue')
    },
    { path: '/', redirect: '/login' },
    // { path: '/', redirect: '/usermag' },
    { path: '/register', component: () => import('@/views/register/index') },

    {
      //主界面
      path: '/main',
      component: () => import('@/views/layout/main.vue'),
      redirect:'/moniter',
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
              component: () => import('@/views/admin/dangerImgPush.vue')
            },
            { //content页面--用户信息管理
              path: '/usermag',
              component: () => import('@/views/admin/UserManage.vue')
            },
            {
              path: '/moniter',
              component: () => import('@/views/layout/vedioView.vue')
            },
            {
              path: '/record',
              component: () => import('@/views/layout/record.vue')
            },
            {
              path: '/recordD',
              component: () => import('@/views/layout/VedioInfoViewD.vue')
            }
          // ]
        // }
      ]

    },

  ]
})

export default router
