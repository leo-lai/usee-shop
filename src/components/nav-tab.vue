<template>
  <nav class="mui-bar l-bar-tab">
    <router-link class="_item" replace active-class="mui-active" to="/index">
      <span class="mui-icon l-icon-home"></span>
      <span class="mui-tab-label">首页</span>
    </router-link>
    <router-link class="_item" replace active-class="mui-active" to="/shop">
      <span class="mui-icon l-icon-shop"></span>
      <span class="mui-tab-label">商城</span>
    </router-link>
    <router-link class="_item" replace active-class="mui-active" to="/me">
      <span class="mui-icon l-icon-me"><!-- <i class="mui-badge">0</i> --></span>
      <span class="mui-tab-label">我的</span>
    </router-link>
  </nav>
</template>
<script>
export default {
  
}
</script>