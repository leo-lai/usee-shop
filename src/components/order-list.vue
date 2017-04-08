<template>
  <div class="l-order-list l-fs-s">
    <div class="l-order-item l-margin-t" v-for="item in 5">
      <router-link to="/order/info" tag="div">
        <div class="_hd l-link-arrow">
          <span class="l-text-warn mui-pull-right">已完成</span>
          <span>订单号：DD002017030912</span>
        </div>
        <div class="_bd l-panel-group l-border-t">
          <div class="_item l-flex-hc" v-for="item in 3">
            <div class="l-thumb l-bg-contain l-margin-r" style="background-image: url('http://placeholdit.imgix.net/~text?txtsize=33&bg=ff784e&txtclr=fff&txt=thumb&w=120&h=120')"></div>
            <div class="l-rest l-fs-s">
              <p class="l-text-wrap2">Lamp C091Lamp C091LampLamp C091Lamp C091LampLamp C091Lamp C091LampLamp C091Lamp C091Lamp </p>
              <div class="l-margin-m1">
                <p class="l-fr">
                  <span><b class="l-icon">&#xe6cb;</b>268.00</span>
                  <span class="l-text-gray">x3</span>
                </p>
                <span class="l-text-gray">颜色：苹果红</span>
              </div>
            </div>
          </div>
        </div>
      </router-link>
      <div class="_ft l-border-t l-flex-hc">
        <span>共3件商品 合计：<b class="l-icon">&#xe6cb;</b>268.00</span>
        <div class="l-rest l-text-right">
          <router-link class="mui-btn l-btn-main _s" to="/order/evaluate">去评价</router-link>
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