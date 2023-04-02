import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/login'
import register from '@/views/register'
import { getToken } from '@/utils/token'
import home from '@/views/home'
import homeContent from '@/views/homeContent'
import goodsList from '@/views/goods'
import goodsInfo from '@/views/goods/goodsInfo'
import cart from '@/views/cart/'
import myLayout from '@/views/my/myLayout'
import myinfo from '@/views/my/myinfo'
import address from '@/views/my/address'
import updatePassword from '@/views/my/updatePassword'
import order from '@/views/order'
import directBuy from '@/views/order/directBuy'
import orderList from '@/views/order/orderList'
import orderDetail from '@/views/order/orderDetail'
import commentGoods from '@/views/my/commentGoods'

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
        },
        {
          path: 'myLayout',
          component: myLayout,
          redirect: '/home/myLayout/myinfo',
          children: [
            {
              path: 'myinfo',
              component: myinfo
            },
            {
              path: 'address',
              component: address
            },
            {
              path: 'updatePassword',
              component: updatePassword
            },
            {
              path: 'orderlist',
              component: orderList
            },
            {
              path: 'orderdetail',
              component: orderDetail
            },
            {
              path: 'commentGoods',
              component: commentGoods
            }
          ]
        },
        {
          path: '/orderConfirm',
          component: order
        },
        {
          path: '/orderConfirmDirect',
          component: directBuy
        }
      ]
    },
    {
      path: '/cart',
      component: cart
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