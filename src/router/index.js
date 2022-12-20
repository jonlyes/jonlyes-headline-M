import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '@/views/Login'// 引入路由组件——Login
// import Layout from '@/views/Layout'// 引入路由组件——Layout
// import Home from '@/views/Layout/Home'// 引入路由组件——Home
// import User from '@/views/Layout/User'// 引入路由组件——User
// import Search from '@/views/Search'// 引入路由组件——Search
// import SearchResult from '@/views/Search/SearchResult'// 引入路由组件——SearchResult
// // import ArticleDetail from '@/views/ArticleDetail'// 引入路由组件——ArticleDetail
// import UserEdit from '@/views/Layout/User/UserEdit'// 引入路由组件——UserEdit
// import Chat from '@/views/Chat'// 引入路由组件———Chat
Vue.use(VueRouter)

// 路由表
const routes = [
  {
    path: '/',
    redirect: '/layout/home'// 重定向到首页
  },
  {
    path: '/login',
    // 路由懒加载，将路由分为多个模块，减少app.js的体积，提高app.js的加载速度
    component: () => import(/* webpackChunkName: "Login" */ '@/views/Login')
  },
  {
    path: '/layout',
    component: () => import(/* webpackChunkName: "Layout" */ '@/views/Layout'),
    children: [
      {
        path: 'home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Layout/Home')
      },
      {
        path: 'user',
        component: () => import(/* webpackChunkName: "user" */ '@/views/Layout/User')
      }
    ]
  },
  {
    path: '/search',
    component: () => import(/* webpackChunkName: "Search" */ '@/views/Search')
  },
  {
    path: '/searchResult/:kw',
    component: () => import(/* webpackChunkName: "SearchResult" */ '@/views/Search/SearchResult')
  },
  {
    path: '/articleDetail/:id',
    component: () => import(/* webpackChunkName: "ArticleDetail" */ '@/views/ArticleDetail')
  },
  {
    path: '/userEdit',
    component: () => import(/* webpackChunkName: "UserEdit" */ '@/views/Layout/User/UserEdit')
  },
  {
    path: '/chat',
    component: () => import(/* webpackChunkName: "Chat" */ '@/views/Chat')
  }
]

const router = new VueRouter({
  routes
})

export default router
