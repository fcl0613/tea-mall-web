import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/login'
import register from '@/views/register'
import { getToken } from '@/utils/token'
import home from '@/views/home'
import homeContent from '@/views/homeContent'
import goodsList from '@/views/goods'
import goodsInfo from '@/views/goods/goodsInfo'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: login
    },
    {
      path: '/register',
      component: register
    },
    {
      path: '/home',
      component: home,
      redirect: '/homeContent',
      children: [
        {
          path: '/homeContent',
          component: homeContent
        },
        {
          path: '/goodsList',
          component: goodsList
        },
        {
          path: '/goodsInfo',
          component: goodsInfo
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login' || to.path === '/redister') return next()
  const token = getToken
  if (!token) {
    return next('/login')
  }
  next()
})

export default router