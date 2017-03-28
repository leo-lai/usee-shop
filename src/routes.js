import index from './pages/index'
import shop from './pages/shop'
import me from './pages/me'
import login from './pages/login'
const routes = [
  { 
    path: '/', 
    redirect: '/index'
  },
  {
    path: '/index',
    meta: { title: '首页', cache: true, mainPage: true },
    component: index
  },
  {
    path: '/shop',
    meta: { title: '商城', cache: true, mainPage: true },
    component: shop
  },
  {
    path: '/me',
    meta: { title: '我的', cache: true, mainPage: true },
    component: me
  },
  {
    path: '/login',
    meta: { title: '登录', cache: true, auth: false},
    component: login
  }
]

export default routes