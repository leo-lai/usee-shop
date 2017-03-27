import index from './pages/index'
const routes = [
  { 
    path: '/', 
    redirect: '/index'
  },
  {
    path: '/index',
    meta: { title: '首页', cache: true, mainPage: true },
    component: index
  }
]

export default routes