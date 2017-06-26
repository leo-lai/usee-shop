<template>
  <div class="l-app">
    <transition :name="direction">
      <router-view></router-view>
    </transition>
    <div class="l-top-notice" :class="{'_show': showNotice}" @click="hideNotice">
      <i class="l-icon">&#xe692;</i>
      尊敬顾客您好！U视一号舒眼喷雾特价活动已结束，6月1日起正式恢复原价299元。
      <i class="l-icon _close">×</i>
    </div>
  </div>
</template>

<script>
export default {
	data() {
		return {
      showNotice: false,
      direction: 'page',
		}
	},
  methods: {
    hideNotice() {
      this.$storage.local.set('_noticed', 1, 1000*3600*12)
      this.showNotice = false
    },
    preventScroll() {
      this.$nextTick(()=>{
        setTimeout(()=>{
          Array.from(document.querySelectorAll('.l-page')).forEach((elem)=>{
            let scrollElem = elem.querySelector('.mui-content')
            let data = {
              posY: 0,
              maxscroll: 0
            }
            if(scrollElem){
              elem.addEventListener('touchstart', (e)=>{
                let events = e.touches[0] || e

                  // 垂直位置标记
                data.posY = events.pageY
                data.scrollY = scrollElem.scrollTop
                // 是否可以滚动
                data.maxscroll = scrollElem.scrollHeight - scrollElem.clientHeight
              }, false)
              elem.addEventListener('touchmove', (e)=>{
                let events = e.touches[0] || e

                // 如果不足于滚动，则禁止触发整个窗体元素的滚动
                if (data.maxscroll <= 0) {
                    // 禁止滚动
                    e.preventDefault()
                }
        
                // 现在移动的垂直位置，用来判断是往上移动还是往下
                // 移动距离
                let distanceY = events.pageY - data.posY


                // 上下边缘检测
                if (distanceY > 0 && scrollElem.scrollTop == 0) {
                    // 往上滑，并且到头
                    // 禁止滚动的默认行为
                    event.preventDefault()
                    return
                }
        
                // 下边缘检测
                if (distanceY < 0 && (scrollElem.scrollTop + 1 >= data.maxscroll)) {
                    // 往下滑，并且到头
                    // 禁止滚动的默认行为
                    event.preventDefault()
                    return
                }
              }, false)
              elem.addEventListener('touchend', (e)=>{
                data.maxscroll = 0
              }, false)  
            }
          })
        }, 600)
      })
    }
  },
	created() {
    // 监听页面切换
    this.$eventHub.$on('APP-DIRECTION', (data)=>{
      this.direction = data
    })

    this.preventScroll()

    this.$storage.session.set('_from', this.$url.getArgs()['_from'])
    this.$nextTick(()=>{
      let diffTime = Date.now() - (window.localStorage.getItem('_usee_client_loading_start') || 0)
      let delay = diffTime > 3000 ? 50 : 3000

      let appLoader = document.getElementById('app-loader')
      setTimeout(()=> {
        appLoader && appLoader.classList.add('app-loaded')
      }, delay)
      setTimeout(() => {
        if(this.$storage.local.get('_noticed') !== 1){
          this.showNotice = true
          setTimeout(()=>{
            this.showNotice = false
          }, 60000)
        }

        let appLoaderCss = document.getElementById('app-loader-css')
        if(appLoaderCss){
          appLoader.parentNode.removeChild(appLoader)
          appLoaderCss.parentNode.removeChild(appLoaderCss)
          appLoader = null
          appLoaderCss = null  
        }
      }, delay + 1500)
    })
	},
  updated() {
    this.preventScroll()
  }
}
</script>
<style lang="less">
@import '~libs/mui/css/mui.css';
@import '~assets/css/base.less';
@import '~assets/css/global.less';
@import '~assets/css/transition.less';
.l-top-notice{
  position: absolute; top: 0; left: 0; right: 0; z-index: 20000;
  background: rgba(245, 172, 0, 0.95); color: #fff;
  line-height: 1.4; padding:0.5rem 1.75rem 0.5rem 0.75rem; font-size: 0.75rem; 
  transition: all 0.3s ease; transform: translateY(-100%);
  ._close{
    position: absolute; top:0; right: 0; padding: 0.5rem;
  }
}
.l-top-notice._show{
  transform: translateY(0);
}
</style>
