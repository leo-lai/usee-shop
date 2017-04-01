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
  mui.isFunction(plugName) && plugName(mui, window, document, undefined)
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


function _pageTo(toPageId, title){
  let fromPage = document.querySelector('.l-page._active')
  let toPage = document.querySelector(toPageId)
  if(toPage){
    utils.addClass(fromPage, 'page-in-leave-active')
    utils.addClass(toPage, 'page-in-enter-active')
    if(title){
      router.currentRoute.meta[toPageId + '_title'] = router.currentRoute.meta.title
      router.currentRoute.meta.title = title
    }
    router.currentRoute.meta.type = 'to'
    router.push(toPageId)
    
    setTimeout(()=>{
      router.currentRoute.meta.type = ''
      utils.removeClass(fromPage, 'page-in-leave-active')
      utils.removeClass(toPage, 'page-in-enter-active')
    }, 600)
  }
}

function _pageBack(toPageId, title){
  let fromPage = document.querySelector('.l-page._active')
  let toPage = toPageId ? document.querySelector(toPageId) : document.querySelector('.l-page')
  if(toPage){
    utils.addClass(fromPage, 'page-out-leave-active').removeClass(fromPage, '_active')
    utils.addClass(toPage, 'page-out-enter-active').addClass(toPage, '_active')
    if(title){
      router.currentRoute.meta.title = title
    }
    setTimeout(()=>{
      utils.removeClass(fromPage, 'page-out-leave-active')
      utils.removeClass(toPage, 'page-out-enter-active')
    }, 600)
  }
}

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
    this.$pageTo = _pageTo
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

// 控制内联页面跳转
router.beforeEach((to, from, next) => {
  // 从内页返回 e.g. page/path#page-inner -> page/path
  if(from.hash && /^#page-/.test(from.hash) && to.path.indexOf(from.path) === 0 && router.currentRoute.meta.type !== 'to'){
    _pageBack(to.hash, router.currentRoute.meta[from.hash + '_title'] || router.currentRoute.meta.title)
  }

  setTimeout(()=>{
    if(to.hash){
      if(/^#page-/.test(to.hash)){
        utils.removeClass(document.querySelector('.l-page._active'), '_active')
        utils.addClass(document.querySelector(to.hash), '_active') 
      }
    }else{
      // 默认第一个展示
      utils.addClass(document.querySelector('.l-page-group .l-page'), '_active')
    }
  }, 50)
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
    mui.init()
    mui(document).on('click', '._nav-back', function(e){
      router.back()
    })
    mui(document).on('click', '._nav-reload', function(e){
      window.location.reload()
    })
  }, 50) 
})


Vue._router = router
/* eslint-disable no-new */
const vm = new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

