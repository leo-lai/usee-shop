import home           from './pages/home'
import homeGuid       from './pages/home-guid'
import shop           from './pages/shop'
import shopCar        from './pages/shop-car'
import goodsInfo      from './pages/goods-info'
import me             from './pages/me'

const routes = [
  {
    path: '/',
    meta: { title: 'U视一号舒眼喷雾', mainPage: true, auth: false },
    component: homeGuid
  },
  {
    path: '/index',
    meta: { title: 'U视一号舒眼喷雾', mainPage: true, auth: false },
    component: homeGuid
  },
  {
    path: '/home',
    meta: { title: 'U视一号舒眼喷雾', mainPage: true, auth: false },
    component: homeGuid
  },
  {
    path: '/home/guid',
    meta: { title: 'U视一号舒眼喷雾', mainPage: true, auth: false },
    component: homeGuid
  },
  {
    path: '/shop',
    name: 'shop',
    meta: { title: '商城', mainPage: true, auth: false, wxScope: 'snsapi_base' },
    component: shop
  },
  {
    path: '/shop/goods/info/:id',
    meta: { title: '商品详情', auth: false },
    component: goodsInfo
  },
  {
    path: '/shopcar',
    meta: { title: '购物车', mainPage: true, auth: false },
    component: shopCar
  },
  {
    path: '/shop/car',
    meta: { title: '购物车', auth: false },
    component: shopCar
  },
  {
    path: '/me',
    meta: { title: '个人中心', mainPage: true, auth: false },
    component: me
  },
  {
    path: '/me/xiaou',
    meta: { title: '小U店员'},
    component: (resolve) => require(['./pages/xiao-u'], resolve)
  },
  {
    path: '/login',
    meta: { title: '登录', auth: false },
    component: (resolve) => require(['./pages/login'], resolve)
  },
  {
    path: '/register',
    meta: { title: '注册', auth: false },
    component: (resolve) => require(['./pages/register'], resolve)
  },
  {
    path: '/forgot',
    meta: { title: '找回密码', auth: false },
    component: (resolve) => require(['./pages/pwd'], resolve)
  },
  {
    path: '/antifake',
    meta: { title: '防伪查询', auth: false },
    component: (resolve) => require(['./pages/antifake'], resolve)
  },
  {
    path: '/about',
    meta: { title: '关于U视一号', auth: false },
    component: (resolve) => require(['./pages/about'], resolve)
  },
  {
    path: '/me/setting',
    meta: { title: '系统设置'},
    component: (resolve) => require(['./pages/me-setting'], resolve)
  },
  {
    path: '/order/goods/service/:orderId/:orderInfoId/:goodsId',
    meta: { title: '售后服务'},
    component: (resolve) => require(['./pages/goods-service'], resolve)
  },
  {
    path: '/shop/order/create',
    meta: { title: '确认订单'},
    component: (resolve) => require(['./pages/order-create'], resolve)
  },
  {
    path: '/order/list',
    meta: { title: '我的订单'},
    component: (resolve) => require(['./pages/order-list'], resolve)
  },
  {
    path: '/order/info/:id',
    meta: { title: '订单详情'},
    component: (resolve) => require(['./pages/order-info'], resolve)
  },
  {
    path: '/order/express/:id',
    meta: { title: '物流详情' },
    component: (resolve) => require(['./pages/order-express'], resolve)
  },
  {
    path: '/order/evaluate/:id',
    meta: { title: '商品评价'},
    component: (resolve) => require(['./pages/order-evaluate'], resolve)
  },
  {
    path: '/address/add',
    meta: { title: '新增收货地址'},
    component: (resolve) => require(['./pages/address-info'], resolve)
  },
  {
    path: '/address/edit/:id',
    meta: { title: '编辑收货地址'},
    component: (resolve) => require(['./pages/address-info'], resolve)
  },
  {
    path: '/pay',
    meta: { title: '支付信息'},
    component: (resolve) => require(['./pages/pay'], resolve)
  },
  {
    path: '/pay/result',
    meta: { title: '支付结果'},
    component: (resolve) => require(['./pages/pay-result'], resolve)
  },
  {
    path: '/me/account',
    meta: { title: '我的账户'},
    component: (resolve) => require(['./pages/withdrawals'], resolve)
  },
  {
    path: '/me/account/withdrawals',
    meta: { title: '提现'},
    component: (resolve) => require(['./pages/withdrawals'], resolve)
  },
  {
    path: '/me/rebate',
    meta: { title: '我的返利'},
    component: (resolve) => require(['./pages/rebate'], resolve)
  },
  {
    path: '/me/customer',
    meta: { title: '我的客户'},
    component: (resolve) => require(['./pages/customer'], resolve)
  },
  {
    path: '/me/qrcode',
    meta: { title: '我的二维码'},
    component: (resolve) => require(['./pages/qrcode'], resolve)
  },
  {
    path: '*',
    meta: { title: '找不到页面', auth: false },
    component: (resolve) => require(['./pages/404'], resolve)
  }
]

export default routes