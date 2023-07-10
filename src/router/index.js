import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },

    { path: '/layout', component: () => import('@/views/layout') },
    { path: '/login', component: () => import('@/views/login/index') },
    { path: '/register', component: () => import('@/views/register/index') },
    
    { path: '/blacklist', component: () => import('@/views/admin/BlacklistView.vue') },
    { path: '/emp', component: () => import('@/views/admin/EmpView.vue') },

    //添加了用户信息、视频信息（简略&详细）的路径  ---sl
    {path:  '/usermanage', component: () => import('@/views/admin/userManage.vue')}, //用户信息路径
    {path:  '/vedioinfo', component: () =>import('@/views/admin/VedioInfoView.vue')} //简略视频信息路径
  ]
})

export default router
