
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



// const routers = [
//   {//主页面
//     path: '/',
//     name: 'Hello',
//     // redirect: '/login',
//     // hidden: true,
//     // component: () => import('@/views//Hello')//路由懒加载
//     component:()=>import('@/layout/menu.vue')
//   },

//   {  //登录界面
//     path: '/login',
//     name: 'Login',
//     // hidden: true,
//     component: () => import('@/views/login/index')
//   },
//   {//注册
//     path: '/register',
//     name: 'Register',
//     // hidden: true,
//     component: () => import('@/views/register/index')
//   },
//   {//操作界面
//     path: '/home',
//     name: 'Home',
//     // hidden: true,
//     menuType: '1',
//     component: () => import('@/views/layout/Home.vue'),
//     children: [
//       {
//         path: '/moniter',
//         name: 'Moniter',
//         menuType: '2',
//         component: () => import('@/views/layout/vedioView.vue')
//       },
//       {
//         path: '/record',
//         name: 'Record',
//         menuType: '2',
//         component: () => import('@/views/layout/record.vue')
//       },
//     ]
//   },

//   {//管理员界面
//     path: '/admin',
//     name: 'Admin',
//     menuType: '1',
//     component: () => import('@/views/admin/index'),
//     children: [
//       { //content页面--信任人员名单管理
//         path: '/tlist',
//         name: 'Tlist',
//         menuType: '2',
//         component: () => import('@/views/admin/trustListView.vue')
//       },
//       { //content页面--黑名单人员管理
//         path: '/blist',
//         name: 'Blist',
//         menuType: '2',
//         component: () => import('@/views/admin/dangerImgPush.vue')
//       },
//       { //content页面--用户信息管理
//         path: '/usermag',
//         name: 'Usermag',
//         menuType: '2',
//         component: () => import('@/views/admin/UserManage.vue')
//       },

//     ]
//   }
// ];

// const router = new VueRouter({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   routers
// });

// export default router;