import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login'// 引入路由组件——Login
import Layout from '@/views/Layout'// 引入路由组件——Layout
import Home from '@/views/Layout/Home'// 引入路由组件——Home
import User from '@/views/Layout/User'// 引入路由组件——User
Vue.use(VueRouter)

// 路由表
const routes = [
  {
    path: '/',
    redirect: '/layout/home'
    // component: Login
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/layout',
    component: Layout,
    children: [
      {
        path: 'home',
        component: Home
      },
      {
        path: 'user',
        component: User
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
