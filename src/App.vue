<template>
  <transition :name="direction">
    <router-view></router-view>
  </transition>
</template>

<script>
const scrollCallback = function(e){
  console.log(e)
}
export default {
	data() {
		return {
      direction: 'page',
		}
	},
  methods: {
    scroll() {
      this.$nextTick(()=>{
        var scrollContent = document.querySelector('.mui-scroll')
        scrollContent.removeEventListener('scroll', scrollCallback, false)  
        scrollContent.addEventListener('scroll', scrollCallback, false)  
      })
    }
  },
	created() {
    // 监听页面切换
    this.$eventHub.$on('APP-DIRECTION', (data)=>{
      this.direction = data
    })
	},
  mounted() {
    // console.log('app mounted')
    // this.scroll()
    
  },
  updated() {
    // console.log('app updated')
    // this.scroll()
  }
}
</script>
<style lang="less">
@import '~libs/mui/css/mui.css';
@import '~assets/css/base.less';
@import '~assets/css/global.less';
@import '~assets/css/transition.less';
</style>
