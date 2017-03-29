<template>
  <div class="l-page">
    <header class="mui-bar mui-bar-nav l-black" v-if="!$mui.os.wechat">
      <h1 class="mui-title">{{ $route.meta.title }}</h1>
      <a class="mui-icon mui-icon-arrowleft mui-pull-left _nav-back"></a>
      <a class="mui-icon mui-icon-bars mui-pull-right"></a>
    </header>
    <footer class="mui-bar mui-bar-footer l-flex-hc l-padding-lr">
      <div class="l-rest">
        <router-link class="l-shopcar-icon" to="/shop/car">
          <i class="l-icon">&#xe63f;</i>
          <span class="mui-badge mui-badge-danger">4</span>
        </router-link>
      </div>
      <div class="_btn">
        <button type="button" style="width: 6rem;" class="mui-btn l-btn-warn _inner">加入购物车</button>
        <button type="button" style="width: 6rem;" class="mui-btn l-btn-main _inner l-margin-l-m">立即购买</button>
      </div>
    </footer>
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
      <!-- info -->
      <div class="l-goods-item">
        <div class="_text l-border-t">
          <h3>喷喷喷喷喷喷喷喷喷喷</h3>
          <p class="l-fs-m">喷一喷，9秒亮瞎眼</p>
          <p class="l-text-warn l-fs-l"><b class="l-icon">&#xe6cb;</b>268.00</p>
        </div>
      </div>
      <div class="l-border-t l-padding-btn l-bg-white mui-navigate-right">
        <i class="l-icon l-text-ok l-fs-l l-margin-r-xs">&#xe626;</i>
        <span>正品保障</span>
        <span class="l-text-gray">/</span>
        <span>售后服务</span>
        <span class="l-text-gray">/</span>
        <span>无忧退货</span>
      </div>
      <!-- info end-->
      <!-- details -->
      <div class="l-padding-btn l-margin-t l-bg-white l-border-b">
        <span>商品详情</span>
        <span class="l-text-gray"> / Details</span>
      </div>
      <div class="l-goods-details l-padding-btn l-bg-white l-fs-m l-margin-b l-zoom">
        <p>喷喷系列喷喷系列喷喷系列喷喷系列喷喷系列喷喷系列喷喷系列</p>
        <p>喷喷系列喷喷系列喷喷系列喷喷系列喷喷系列喷喷系列喷喷系列</p>
        <p>喷喷系列喷喷系列喷喷系列喷喷系列喷喷系列喷喷系列喷喷系列</p>
        <p>喷喷系列喷喷系列喷喷系列喷喷系列喷喷系列喷喷系列喷喷系列</p>
        <img src="~assets/images/temp-001.jpg" />
        <img src="~assets/images/temp-002.jpg" />
      </div>
      <!-- details end-->
    </div>
  </div>
</template>
<script>
import navTab from 'components/nav-tab'
import previewImage from 'libs/mui/js/mui.preview-image'

export default {
  components: {
    navTab
  },
  data () {
    return {
      
    }
  },
  created() {
    this.$mui.use(previewImage)
  },
  mounted() {
    this.$nextTick(()=>{
      this.$mui('.mui-slider').slider({
        interval: 3000
      })

      Array.from(document.querySelectorAll('.l-goods-details img')).forEach(img=>{
        img.setAttribute('data-preview-src', '')
        img.setAttribute('data-preview-group', '1')
      })
      this.$mui.previewImage()
    })
  }
}
</script>
<style scoped lang="less">
@import '~libs/mui/css/mui.preview-image.css';
</style>