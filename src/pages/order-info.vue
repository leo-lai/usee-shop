<template>
  <div class="l-page">
    <header class="mui-bar mui-bar-nav l-black" v-if="!$mui.os.wechat">
      <h1 class="mui-title">{{ $route.meta.title }}</h1>
      <a class="mui-icon mui-icon-arrowleft mui-pull-left _nav-back"></a>
    </header>
    <footer class="mui-bar mui-bar-footer l-flex-hc l-padding-lr">
      <div class="l-rest"></div>
      <a class="mui-btn l-btn-white _s">取消订单</a>
      <a class="mui-btn l-btn-main _s l-margin-l-m">确认收货</a>
      <router-link class="mui-btn l-btn-main _s l-margin-l-m" to="/order/evaluate">去付款</router-link>
      <router-link class="mui-btn l-btn-main _s l-margin-l-m" to="/order/evaluate">去评价</router-link>
    </footer>
    <div class="mui-content l-fs-s">
      <!-- 收货地址 -->
      <div class="l-bg-white">
        <div class="l-order-state l-flex-hc">
          <span class="l-rest">代付款</span>
          <span><i class="l-icon">&#xe634;</i></span>
        </div>
        <div class="l-flex-hc l-padding-btn l-border-b">
          <div class="l-text-warn l-fs-l l-margin-r">
            <i class="l-icon">&#xe647;</i>
          </div>
          <div class="l-rest">
            物流单号：123132056512
          </div>
        </div>
        <div class="l-flex-hc l-padding-btn">
          <div class="l-text-warn l-fs-l l-margin-r">
            <i class="l-icon">&#xe60a;</i>
          </div>
          <div class="l-rest">
            <p class="l-margin-b-xs">
              <span class="mui-pull-right">18602029524</span>
              <span>收货人：赖国聪</span>
            </p>
            <p class="l-lh-s">收货地址：广东省广州市天河区5号空间广东省广州市天河区5号空间</p>
          </div>
        </div>
        <div class="l-line-color"></div>  
      </div>
      <!-- 购买商品信息 -->
      <div class="l-margin-t">
        <div class="l-padding-btn l-bg-white l-border-b">
          <span>购买的商品</span>
        </div>
        <div class="l-panel-group">
          <div class="_item l-flex-hc" v-for="item in 3">
            <div class="l-thumb l-bg-contain l-margin-r" style="background-image: url('http://placeholdit.imgix.net/~text?txtsize=33&bg=ff784e&txtclr=fff&txt=thumb&w=120&h=120')"></div>
            <div class="l-rest">
              <p class="l-text-wrap2">Lamp C091Lamp C091LampLamp C091Lamp C091LampLamp C091Lamp C091LampLamp C091Lamp C091Lamp </p>
              <div class="l-margin-m1">
                <p class="mui-pull-right">
                  <span><b class="l-icon">&#xe6cb;</b>268.00</span>
                  <span class="l-text-gray">x3</span>
                </p>
                <span class="l-text-gray">颜色：苹果红</span>
              </div>
            </div>
          </div>
        </div>
        <div class="l-padding-btn l-bg-white l-border-t">
          <p class="mui-pull-right">实付款：<span class="l-text-warn"><b class="l-icon">&#xe6cb;</b>268.00</span></p>
          <span>订单总价：<b class="l-icon">&#xe6cb;</b>268.00</span>
        </div>
      </div>
      <!-- 订单时间 -->
      <div class="l-margin-t l-bg-white l-padding-btn l-text-gray l-margin-b">
        <p>订单编号：6464123564654</p>
        <p>创建时间：2019-12-12 12:12:12</p>
        <p>付款时间：2019-12-12 12:12:12</p>
        <p>发货时间：2019-12-12 12:12:12</p>
        <p>收货时间：2019-12-12 12:12:12</p>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  components: {
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
<style scoped lang="less">
.l-order-state{
  padding: 0.5rem 2.4rem; color: #fff; font-size: 0.85rem;
  background: linear-gradient(105deg, #ff784e, #f4524e);
  .l-icon{ font-size:  1.6rem; }
}
</style>