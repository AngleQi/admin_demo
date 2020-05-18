import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login')
    },
    {
      path: '/index',
      name: 'index',
      component: () => import('@/views/Index'),
      children: [
        {
          path: '/dashboard',
          name: 'Dashboard',
          meta: { title: '首页' },
          component: () => import('@/views/Home')
        },
        {
          path: '/emojisList',
          name: 'emojisList',
          meta: { title: '表情列表' },
          component: () => import('@/views/emojisList')
        },
        {
          path: '/flexList',
          name: 'flexList',
          meta: { title: 'flex瀑布流' },
          component: () => import('@/views/flexList')
        },
        {
          path: '/vueCropperList',
          name: 'vueCropperList',
          meta: { title: 'vue图片裁剪' },
          component: () => import('@/views/vueCropperList')
        }
      ]
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
