import index          from './pages/index'
import shop           from './pages/shop'
import shopCar        from './pages/shop-car'
import goodsInfo      from './pages/goods-info'
import orderCreate    from './pages/order-create'
import orderList      from './pages/order-list'
import orderInfo      from './pages/order-info'
import orderEvaluate  from './pages/order-evaluate'
import me             from './pages/me'
import login          from './pages/login'
import register       from './pages/register'
import pwd            from './pages/pwd'
import addressInfo    from './pages/address-info'
import pay            from './pages/pay'

const routes = [
  { 
    path: '/', 
    redirect: '/index'
  },
  { 
    path: '/index.html', 
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
    meta: { title: '个人中心', mainPage: true },
    component: me
  },
  {
    path: '/login',
    meta: { title: '登录'},
    component: login
  },
  {
    path: '/register',
    meta: { title: '注册'},
    component: register
  },
  {
    path: '/forgot',
    meta: { title: '找回密码'},
    component: pwd
  },
  {
    path: '/shop/car',
    meta: { title: '购物车', auth: true},
    component: shopCar
  },
  {
    path: '/shop/goods/info/:id',
    meta: { title: '商品详情'},
    component: goodsInfo
  },
  {
    path: '/shop/order/create',
    meta: { title: '确认订单', auth: true},
    component: orderCreate
  },
  {
    path: '/order/list',
    meta: { title: '我的订单', auth: true},
    component: orderList
  },
  {
    path: '/order/info',
    meta: { title: '订单详情', auth: true},
    component: orderInfo
  },
  {
    path: '/order/evaluate',
    meta: { title: '订单评价', auth: true},
    component: orderEvaluate
  },
  {
    path: '/address/add',
    meta: { title: '新增收货地址', auth: true},
    component: addressInfo
  },
  {
    path: '/address/edit/:id',
    meta: { title: '编辑收货地址', auth: true},
    component: addressInfo
  },
  {
    path: '/pay',
    meta: { title: '支付信息', auth: true},
    component: pay
  }
]

export default routes