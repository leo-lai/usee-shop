import index from './pages/index'
import shop from './pages/shop'
import shopCar from './pages/shop-car'
import goodsInfo from './pages/goods-info'
import orderCreate from './pages/order-create'
import me from './pages/me'
import login from './pages/login'
import register from './pages/register'
import pwd from './pages/pwd'

const routes = [
  { 
    path: '/', 
    redirect: '/index'
  },
  {
    path: '/index',
    meta: { title: '首页', mainPage: true },
    component: index
  },
  {
    path: '/shop',
    meta: { title: '商城', mainPage: true },
    component: shop
  },
  {
    path: '/me',
    meta: { title: '我的', mainPage: true },
    component: me
  },
  {
    path: '/login',
    meta: { title: '登录', auth: false},
    component: login
  },
  {
    path: '/register',
    meta: { title: '注册', auth: false},
    component: register
  },
  {
    path: '/forgot',
    meta: { title: '找回密码', auth: false},
    component: pwd
  },
  {
    path: '/shop/car',
    meta: { title: '购物车'},
    component: shopCar
  },
  {
    path: '/shop/goods/info',
    meta: { title: '商品详情'},
    component: goodsInfo
  },
  {
    path: '/shop/order/create',
    meta: { title: '确认订单'},
    component: orderCreate
  }
]

export default routes