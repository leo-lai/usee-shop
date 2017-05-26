import home           from './pages/home'
import homeGuid       from './pages/home-guid'
import shop           from './pages/shop'
import shopCar        from './pages/shop-car'
import goodsInfo      from './pages/goods-info'
import goodsService   from './pages/goods-service'
import orderCreate    from './pages/order-create'
import orderList      from './pages/order-list'
import orderInfo      from './pages/order-info'
import orderExpress   from './pages/order-express'
import orderEvaluate  from './pages/order-evaluate'
import me             from './pages/me'
import meSetting      from './pages/me-setting'
import login          from './pages/login'
import register       from './pages/register'
import pwd            from './pages/pwd'
import addressInfo    from './pages/address-info'
import pay            from './pages/pay'
import rebate         from './pages/rebate'
import account        from './pages/account'
import customer       from './pages/customer'
import qrcode         from './pages/qrcode'
import withdrawals    from './pages/withdrawals'
import payResult      from './pages/pay-result'
import antifake       from './pages/antifake'
import about          from './pages/about'
import pageNotFound   from './pages/404'

const routes = [
  {
    path: '/',
    meta: { title: '明目舒眼水', mainPage: true, auth: false },
    component: homeGuid
  },
  {
    path: '/index',
    meta: { title: '明目舒眼水', mainPage: true, auth: false },
    component: homeGuid
  },
  {
    path: '/home',
    meta: { title: '明目舒眼水', mainPage: true, auth: false },
    component: homeGuid
  },
  {
    path: '/home/guid',
    meta: { title: '明目舒眼水', mainPage: true, auth: false },
    component: homeGuid
  },
  {
    path: '/shop',
    name: 'shop',
    meta: { title: '商城', mainPage: true, auth: false, wxScope: 'snsapi_base' },
    component: shop
  },
  {
    path: '/shopcar',
    meta: { title: '购物车', mainPage: true, auth: false },
    component: shopCar
  },
  {
    path: '/me',
    meta: { title: '个人中心', mainPage: true, auth: false },
    component: me
  },
  {
    path: '/login',
    meta: { title: '登录', auth: false },
    component: login
  },
  {
    path: '/register',
    meta: { title: '注册', auth: false },
    component: register
  },
  {
    path: '/forgot',
    meta: { title: '找回密码', auth: false },
    component: pwd
  },
  {
    path: '/shop/car',
    meta: { title: '购物车', auth: false },
    component: shopCar
  },
  {
    path: '/shop/goods/info/:id',
    meta: { title: '商品详情', auth: false },
    component: goodsInfo
  },
  {
    path: '/antifake',
    meta: { title: '防伪查询', auth: false },
    component: antifake
  },
  {
    path: '/about',
    meta: { title: '关于U视一号', auth: false },
    component: about
  },
  {
    path: '/me/setting',
    meta: { title: '系统设置'},
    component: meSetting
  },
  {
    path: '/order/goods/service/:orderId/:orderInfoId/:goodsId',
    meta: { title: '售后服务'},
    component: goodsService
  },
  {
    path: '/shop/order/create',
    meta: { title: '确认订单'},
    component: orderCreate
  },
  {
    path: '/order/list',
    meta: { title: '我的订单'},
    component: orderList
  },
  {
    path: '/order/info/:id',
    meta: { title: '订单详情'},
    component: orderInfo
  },
  {
    path: '/order/express/:id',
    meta: { title: '物流详情' },
    component: orderExpress
  },
  {
    path: '/order/evaluate/:id',
    meta: { title: '商品评价'},
    component: orderEvaluate
  },
  {
    path: '/address/add',
    meta: { title: '新增收货地址'},
    component: addressInfo
  },
  {
    path: '/address/edit/:id',
    meta: { title: '编辑收货地址'},
    component: addressInfo
  },
  {
    path: '/pay',
    meta: { title: '支付信息'},
    component: pay
  },
  {
    path: '/pay/result',
    meta: { title: '支付结果'},
    component: payResult
  },
  {
    path: '/me/account',
    meta: { title: '我的账户'},
    component: withdrawals
  },
  {
    path: '/me/account/withdrawals',
    meta: { title: '提现'},
    component: withdrawals
  },
  {
    path: '/me/rebate',
    meta: { title: '我的返利'},
    component: rebate
  },
  {
    path: '/me/customer',
    meta: { title: '我的客户'},
    component: customer
  },
  {
    path: '/me/qrcode',
    meta: { title: '我的二维码'},
    component: qrcode
  },
  {
    path: '*',
    meta: { title: '找不到页面', auth: false },
    component: pageNotFound
  }
]

export default routes