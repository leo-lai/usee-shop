<template>
  <transition :name="direction">
    <router-view></router-view>
  </transition>
</template>

<script>
export default {
	data() {
		return {
      direction: 'page',
		}
	},
  methods: {
    preventScroll() {
      this.$nextTick(()=>{
        setTimeout(()=>{
          Array.from(document.querySelectorAll('.l-page')).forEach((elem)=>{
            let scrollElem = elem.querySelector('.mui-content')
            let data = {
              posY: 0,
              maxscroll: 0
            }

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

    this.$nextTick(()=>{
      let appLoader = document.getElementById('app-loader')
      setTimeout(()=> {
        appLoader && appLoader.classList.add('app-loaded')
      }, 1000)
      setTimeout(() => {
        let appLoaderCss = document.getElementById('app-loader-css')
        if(appLoaderCss){
          appLoader.parentNode.removeChild(appLoader)
          appLoaderCss.parentNode.removeChild(appLoaderCss)
          appLoader = null
          appLoaderCss = null  
        }
      }, 3000)
    })

    this.preventScroll()
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
</style>
