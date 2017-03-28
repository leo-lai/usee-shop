<template>
  <div class="l-page">
    <header class="mui-bar mui-bar-nav l-black" v-if="!$mui.os.wechat">
      <h1 class="mui-title">{{ $route.meta.title }}</h1>
      <!-- <a class="mui-icon mui-icon-arrowleft mui-pull-left"></a> -->
      <!-- <a class="mui-icon mui-icon-bars mui-pull-right"></a> -->
    </header>
    <nav-tab></nav-tab>
    <div class="mui-content">
      <!-- 商品列表 -->
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
      <!-- 商品列表 end-->
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
  created() {
    
  }
}
</script>
<style scoped>

</style>