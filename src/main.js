// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import mui from 'libs/mui/js/mui'
import FastClick from 'fastclick'
import Vue from 'vue'
import VueRouter from 'vue-router'
import { storage, utils } from 'assets/js/utils'
import server from './server'
import routes from './routes'
import App from './App'
FastClick.attach(document.body)

// 添加插件
mui.use = function(plugName){
  mui.isFunction(plugName) && plugName(mui, window, document)
}

// 组件通信中心
const eventHub = new Vue()
Vue.mixin({
  created() {
    this.$eventHub = eventHub
    this.$mui = mui
  }
})

// 路由
Vue.use(VueRouter)
const router = new VueRouter({
  routes,
	mode: 'history',
	scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    // console.log(to, from, savedPosition)
  }
})

// 验证登陆
// if(window.location.hostname === '192.168.0.134'){ // 本地测试
//   storage.local.set('openid', 'odjF11oC5FsVYkaKgsyoE7fsmglQ')
//   storage.local.set('token', 'UfD0a7yJGtnINJR6q4wenQrJbd80HBr5OJ5S56x2FEuVwtK1J7fNt_b_bv0azgvqHs49bnNbkdTYQUJRLnwQi6PhvUzxIxw6QdUNnNL6COMKo_c')
// }

// router.beforeEach((to, from, next) => {
//   let isCheckLogin = to.meta.auth
  
//   if(isCheckLogin === undefined) {
//     isCheckLogin = true
//   }
//   if(isCheckLogin && !storage.local.get('token')){
//     server.logout()
//     next(false)
//   }
//   next()
// })

Vue.mixin({
  created() {
    // 可访问外部链接
    this.$link = function(url, direction){
      if(!url) return

      if(/^http(s?)/i.test(url)){
        window.location.assign(url)
      }else{
        if(_history && direction){
          _history.direction = direction
          storage.session.set('_history', _history)
        }
        this.$router.push(url)
      }
    }

    // 跳转内页
    this.$pageTo = function(toPageId, title){
      let fromPage = document.querySelector('#page-main')
      let toPage = document.querySelector(toPageId)
      fromPage && utils.addClass(fromPage, 'page-in-leave-active')
      if(toPage){
        utils.addClass(toPage, 'page-in-enter-active')
        if(title){
          router.currentRoute.meta._title = router.currentRoute.meta.title
          router.currentRoute.meta.title = title
        }
        router.push(toPageId)
      }
    }
  }
})

// 记录微信的Landing Page，用于当前目录地址授权验证
storage.session.set('wx_url', window.location.href)

// 记录页面浏览顺序及滚动条位置，用来判断动画方向
const initHistory = [{
  path: '/',
  fromPath: '/',
  index: 0,
  scrollX: 0,
  scrollY: 0
}]

initHistory.index = 0
let _history = storage.session.get('_history') || initHistory

// 控制内页跳转
router.beforeEach((to, from, next) => {
  let toPage = document.querySelector('#page-main')
  if(from.hash && /^#page-/.test(from.hash) && toPage){
    if(router.currentRoute.meta._title){
      router.currentRoute.meta.title = router.currentRoute.meta._title
    }
    
    let fromPage = document.querySelector(from.hash)
    utils.addClass(fromPage, 'page-out-leave-active')
    utils.removeClass(fromPage, 'page-in-enter-active')
    
    utils.addClass(toPage, 'page-out-enter-active')
    utils.removeClass(toPage, 'page-in-leave-active')
    setTimeout(()=>{
      utils.removeClass(fromPage, 'page-out-leave-active')
      utils.removeClass(toPage, 'page-out-enter-active')
    }, 500)  
  }
  next()
})

// 控制页面转场动画
router.beforeEach((to, from, next) => {

  // 服务端渲染进入页面
  if(from.path === '/'){ 
    eventHub.$emit('APP-DIRECTION', 'page')
    next()
    return
  }

  // 倒序查找
  _history.reverse()
  let fromHistory = _history.find((item)=>item.path === from.path)
  let toHistory = _history.find((item)=>item.path === to.path)
  _history.reverse()

  let direction = 'page-in'

  if(toHistory && fromHistory && _history.direction !== 'page-in'){
    // 比较路径在历史记录的位置
    if(toHistory.index < fromHistory.index){
      direction = 'page-out'
      _history.splice(fromHistory.index, 1)
      _history.index = toHistory.index
    }
  }


  // /user/info -> /user  返回父页面
  if(from.path.indexOf(to.path) === 0){
    direction = 'page-out'

  // /user -> /user/info  进入子页面
  }else if(to.path.indexOf(from.path) === 0){
    direction = 'page-in'
  }

  // 首页进入内页
  if(from.path === '/index'){
    direction = 'page-in'
  }

  // 从其他页面返回主页面
  if(!from.meta.mainPage && to.meta.mainPage){
    direction = 'page-out'
  }

  // 主页面之前切换
  if(from.meta.mainPage && to.meta.mainPage){
    direction = 'page' 
  }

  // 明确指定页面方向
  if(_history.direction){
    direction = _history.direction
  }

  // 如果历史没有记录或指定的方向是进入
  if(!toHistory || _history.direction === 'page-in'){
    let index = _history.length
    _history.push({
      path: to.path,
      fromPath: from.path,
      index: index,
      scrollX: 0,
      scrollY: 0
    })
    _history.index = index
  }

  // 触发页面切换事件
  eventHub.$emit('APP-DIRECTION', direction)

  // 如果页面组件是懒加载或第一次加载就显示loading
  if(to.meta.lazy && !toHistory){
    // $.showIndicator()
  }
  next()
})

router.afterEach((route) => {
  utils.setTitle(route.meta.title)
  _history.direction = ''
  storage.session.set('_history', _history)
  // $.hideIndicator()
})

router.onReady(()=>{
  setTimeout(()=>{
    // mui.init()
    mui(document).on('tap', '._nav-back', function(e){
      router.back()
    })
  }, 50) 
})


Vue._router = router
/* eslint-disable no-new */
const vm = new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

