<template>
  <div class="l-order-list l-fs-m">
    <div class="l-order-item l-margin-t">
      <div class="_hd l-border-b">
        <span class="l-fr l-text-gray">2017-12-12</span>
        <span>订单号：DD002017030912</span>
      </div>
      <div class="_bd l-panel-group">
        <div class="_item l-flex-hc" v-for="item in 3">
          <div class="l-thumb l-bg-contain l-margin-r" style="background-image: url('http://placeholdit.imgix.net/~text?txtsize=33&bg=ff784e&txtclr=fff&txt=thumb&w=120&h=120')"></div>
          <div class="l-rest l-fs-s">
            <p class="l-text-wrap2">Lamp C091Lamp C091LampLamp C091Lamp C091LampLamp C091Lamp C091LampLamp C091Lamp C091Lamp </p>
            <div class="l-margin-m1">
              <p class="l-fr">
                <span class="l-text-warn"><b class="l-icon">&#xe6cb;</b>268.00</span>
                <span>x3</span>
              </p>
              <span class="l-text-gray">颜色：苹果红</span>
            </div>
          </div>
        </div>
      </div>
      <div class="_ft l-border-t l-flex-hc">
        <span class="l-text-gray">已完成</span>
        <div class="l-rest l-text-right">
          <router-link class="mui-btn l-btn-main _s" to="/order/evaluate">去评价</router-link>
        </div>
      </div>
    </div>
    <div class="l-order-item l-margin-t" v-for="item in 5">
      <div class="_hd l-border-b">
        <span class="l-fr l-text-gray">2017-12-12</span>
        <span>订单号：DD002017030912</span>
      </div>
      <div class="_bd l-panel-group">
        <div class="_item l-flex-hc" v-for="item in 3">
          <div class="l-thumb l-bg-contain l-margin-r" style="background-image: url('http://placeholdit.imgix.net/~text?txtsize=33&bg=ff784e&txtclr=fff&txt=thumb&w=120&h=120')"></div>
          <div class="l-rest l-fs-s">
            <p class="l-text-wrap2">Lamp C091Lamp C091LampLamp C091Lamp C091LampLamp C091Lamp C091LampLamp C091Lamp C091Lamp </p>
            <div class="l-margin-m1">
              <p class="l-fr">
                <span class="l-text-warn"><b class="l-icon">&#xe6cb;</b>268.00</span>
                <span>x3</span>
              </p>
              <span class="l-text-gray">颜色：苹果红</span>
            </div>
          </div>
        </div>
      </div>
      <div class="_ft l-border-t l-flex-hc">
        <span class="l-text-warn">待支付</span>
        <div class="l-rest l-text-right">
          <button type="button" class="mui-btn l-btn-white _s">取消</button>
          <button type="button" class="mui-btn l-btn-main _s">付款</button>  
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    mode: {
      type: Number,
      default: 1
    }
  }
}
</script>
<style scoped lang="less">
.l-order-item{
  background: #fff;
  ._hd{padding: 0.5rem 0.75rem;}
  ._ft{
    padding: 0.5rem 0.75rem; 
    .mui-btn{margin-left: 0.25rem;}
  }

}
  
</style>