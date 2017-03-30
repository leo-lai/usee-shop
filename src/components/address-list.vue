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
        <span class="l-margin-l-s"><i class="l-icon">&#xe630; </i>编辑</span>
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
        <span class="l-margin-l-s"><i class="l-icon">&#xe630; </i>编辑</span>
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