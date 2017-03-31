<template>
  <div :class="{'l-address-noslt': mode == 1}">
    <div class="l-address-item l-margin-b">
      <div class="_bd mui-radio mui-left">
        <label>
          <p><span class="mui-pull-right">18610888888</span><span>张铁锤</span></p>
          <p class="_address">北京 北京市 海淀区 </p>
        </label>
        <input name="address" type="radio">
      </div>
      <div class="_ft l-text-right l-border-t">
        <span class="mui-pull-left l-text-warn">默认地址</span>
        <router-link class="l-margin-l-s" to="/address/edit"><i class="l-icon">&#xe630; </i>编辑</router-link>
        <span class="l-margin-l-s"><i class="l-icon">&#xe600; </i>删除</span>
      </div>
    </div>
    <div class="l-address-item l-margin-b" v-for="item in 5">
      <div class="_bd mui-radio mui-left">
        <label>
          <p><span class="mui-pull-right">18610888888</span><span>张铁锤</span></p>
          <p class="_address">北京 北京市 海淀区 </p>
        </label>
        <input name="address" type="radio">
      </div>
      <div class="_ft l-text-right l-border-t">
        <span class="mui-pull-left">设为默认</span>
        <router-link class="l-margin-l-s" to="/address/edit"><i class="l-icon">&#xe630; </i>编辑</router-link>
        <span class="l-margin-l-s"><i class="l-icon">&#xe600; </i>删除</span>
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
/* 收货地址 */
.l-address-item{
  background: #fff; display: block; color: inherit;
  a{ color: inherit; }
  ._bd{ padding: 0.5rem  0.75rem; }
  ._ft{ padding: 0.5rem 0.75rem; color: #666; font-size: 0.75rem;}
  .mui-radio input{top: 1rem;}
  .mui-radio.mui-left label{padding: 0 0 0 1.75rem;}
  ._address{font-size: 0.75rem; line-height: 1.2; color: #999;word-break: break-all; margin-top: 0.125rem;}
}
.l-address-noslt{

  .mui-radio input{display: none;} 
  .mui-radio.mui-left label{padding-left: 0;}
}
</style>