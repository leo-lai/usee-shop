<template>
  <div class="l-page">
    <header class="mui-bar mui-bar-nav l-black" v-if="!$mui.os.wechat">
      <h1 class="mui-title">{{ $route.meta.title }}</h1>
    </header>
    <nav-tab></nav-tab>
    <div class="mui-content">
      <!-- banner -->
      <div class="mui-slider">
        <div class="mui-slider-group mui-slider-loop">
          <div class="mui-slider-item mui-slider-item-duplicate"><a><img src="~assets/images/temp-001.jpg" /></a></div>
          <div class="mui-slider-item"><a><img src="~assets/images/temp-001.jpg" /></a></div>
          <div class="mui-slider-item"><a><img src="~assets/images/temp-001.jpg" /></a></div>
          <div class="mui-slider-item"><a><img src="~assets/images/temp-001.jpg" /></a></div>
          <div class="mui-slider-item mui-slider-item-duplicate"><a><img src="~assets/images/temp-001.jpg" /></a></div>
        </div>
        <div class="mui-slider-indicator">
          <div class="mui-indicator mui-active"></div>
          <div class="mui-indicator"></div>
          <div class="mui-indicator"></div>
        </div>
      </div>
      <!-- banner end-->

      <!-- menu -->
      <div class="mui-row l-text-center l-bg-white l-border-t">
        <a class="l-text-default mui-col-sm-4 mui-col-xs-4 l-padding l-link">
          <p><img style="height: 2rem;" src="~assets/images/icon-001.png" alt=""></p>
          <p class="l-margin-t-xs l-fs-m">服务预约</p>
        </a>
        <a class="l-text-default mui-col-sm-4 mui-col-xs-4 l-padding l-link">
          <p><img style="height: 2rem;" src="~assets/images/icon-002.png" alt=""></p>
          <p class="l-margin-t-xs l-fs-m">护眼方案</p>
        </a>
        <a class="l-text-default mui-col-sm-4 mui-col-xs-4 l-padding l-link">
          <p><img style="height: 2rem;" src="~assets/images/icon-003.png" alt=""></p>
          <p class="l-margin-t-xs l-fs-m">视保定制</p>
        </a>
      </div>
      <!-- menu end-->
      
      <!-- recommend -->
      <div class="l-text-center l-padding-btn l-margin-t l-bg-white l-border-b">
        <span>推荐商品</span>
        <span class="l-text-gray"> / Recommend</span>
      </div>
      <div class="l-goods-list">
        <div class="l-goods-item l-margin-b">
          <div class="_thumb">
            <img src="~assets/images/temp-002.jpg" alt="">
          </div>
          <div class="_text l-border-t">
            <h3>喷喷喷喷喷喷喷喷喷喷</h3>
            <p class="l-fs-m">喷一喷，9秒亮瞎眼</p>
            <p class="l-text-warn l-fs-l"><b class="l-icon">&#xe6cb;</b>268.00</p>
          </div>
        </div>
      </div>
      <!-- recommend end-->
    </div>
  </div>
</template>
<script>
import navTab from 'components/nav-tab'

export default {
  components: {
    navTab
  },
  data () {
    return {
      
    }
  },
  computed: {
   
  },
  mounted() {
    this.$nextTick(()=>{
      this.$mui('.mui-slider').slider({
        interval: 3000
      })
    })
  }
}
</script>
<style scoped>

</style>