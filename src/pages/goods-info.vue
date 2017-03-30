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
        <button type="button" style="width: 6rem;" class="mui-btn l-btn-warn _inner" @click="addToCar">加入购物车</button>
        <button type="button" style="width: 6rem;" class="mui-btn l-btn-main _inner l-margin-l-m" @click="buyNow">立即购买</button>
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
      <div class="l-goods-item l-border-tb">
        <div class="_text">
          <h3>喷喷喷喷喷喷喷喷喷喷</h3>
          <p class="l-fs-m">喷一喷，9秒亮瞎眼</p>
          <p class="l-text-warn l-fs-l"><b class="l-icon">&#xe6cb;</b>268.00</p>
        </div>
      </div>
      <div class="l-padding-btn l-bg-white l-fs-m l-text-gray l-link-arrow" @click="showSupport">
        <i class="l-icon l-text-ok">&#xe626;</i>
        <span class="l-margin-r-xs">正品保障</span>
        <i class="l-icon l-text-ok">&#xe626;</i>
        <span class="l-margin-r-xs">售后服务</span>
        <i class="l-icon l-text-ok">&#xe626;</i>
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
    <!-- 选择商品规格 -->
    <div class="l-popup-bottom" :class="{'_show': isShowSpec}"  @click="showSpec">
      <div class="_inner">
        <i class="_close l-icon">&#xe605;</i>
        <div class="_content l-padding-lr" @click.stop>
          <div class="l-flex-hc l-padding-tb l-padding-r-xl l-border-b">
            <div class="l-thumb l-bg-contain l-margin-r" style="background-image: url('http://placeholdit.imgix.net/~text?txtsize=33&bg=ff784e&txtclr=fff&txt=thumb&w=120&h=120')"></div>
            <div class="l-rest l-fs-s">
              <p class="l-text-wrap2">Lamp C091Lamp C091LampLamp C091Lamp C091LampLamp C091Lamp C091LampLamp C091Lamp C091Lamp </p>
              <div class="l-margin-m1">
                <span class="l-text-warn"><b class="l-icon">&#xe6cb;</b>268.00</span>
              </div>
            </div>
          </div>
          <div class="_scroll">
            <div class="l-padding-tb l-fs-s l-border-b l-text-gray">
              <span class="l-margin-r-xs"><i class="l-icon l-text-ok">&#xe626; </i>7天无理由退换</span>
              <span class="l-margin-r-xs"><i class="l-icon l-text-ok">&#xe626; </i>15天免费换货</span>
              <span class="l-margin-r-xs"><i class="l-icon l-text-ok">&#xe626; </i>1年免费维修</span>
            </div>
            <div class="l-padding-tb l-fs-s l-border-b">
              <p>颜色分类</p>
              <ul class="l-slt-list">
                <li class="_item _active">科技黑</li>
                <li class="_item">科技黑</li>
                <li class="_item">科技黑</li>
                <li class="_item">科技黑</li>
                <li class="_item">科技黑</li>
                <li class="_item">科技黑</li>
                <li class="_item">科技黑</li>
              </ul>
            </div>
            <div class="l-padding-tb l-fs-s l-flex-hc">
              <p class="l-rest">购买数量</p>
              <span class="l-numbox mui-pull-right">
                <i class="l-icon _minus">&#xe631;</i>
                <input class="_num" type="tel" value="1">
                <i class="l-icon _add">&#xe602;</i>
              </span>
            </div>
          </div>
          <div class="l-padding-tb l-border-t">
            <button type="button" class="mui-btn l-btn-main" @click="sltSpecOk">确定</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 选择商品规格 end-->

    <!-- 三包说明 -->
    <div class="l-popup-bottom" :class="{'_show': isShowSupport}" @click="showSupport">
      <div class="_inner">
        <div class="_content l-padding" @click.stop>
          <div class="_scroll">
            <div class="l-border-b l-padding-b">
              <h3><i class="l-icon l-text-ok">&#xe626; </i>正品保障</h3>
              <p class="l-text-gray">U视一号承诺商城购买所有商品均为官方正品</p>
            </div>
            <div class="l-border-b l-padding-tb">
              <h3><i class="l-icon l-text-ok">&#xe626; </i>售后服务</h3>
              <p class="l-text-gray">如果商品在保修期内或者存在下次的质量问题，可以第一时间联系客服解决</p>
            </div>
            <div class="l-padding-tb">
              <h3><i class="l-icon l-text-ok">&#xe626; </i>正品保障</h3>
              <p class="l-text-gray">商品收到7天内若因主观原因不愿完成交易，在不影响二次销售的前提下，可办理退货，邮费需自理（食品、保健品以及部分特殊声明的商品除外）</p>
            </div>
          </div>
          <div class="l-padding-t l-border-t">
            <button type="button" class="mui-btn l-btn-main" @click="showSupport">我知道了</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 三包说明 end-->
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
      isShowSupport: false,
      isShowSpec: false
    }
  },
  methods: {
    showSupport() {
      this.isShowSupport = !this.isShowSupport
    },
    showSpec() {
      this.isShowSpec = !this.isShowSpec
    },
    addToCar() {
      this.showSpec()
    },
    buyNow() {
      this.showSpec()
    },
    sltSpecOk() {
      this.$router.push('/shop/order/create')
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