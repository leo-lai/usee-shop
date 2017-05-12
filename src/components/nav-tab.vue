<template>
  <nav class="mui-bar l-bar-tab">
    <router-link class="_item" replace active-class="mui-active" to="/home" :class="{'mui-active': ($route.path == '/' || $route.path == '/index')}">
      <span class="mui-icon l-icon-home"></span>
      <span class="mui-tab-label">首页</span>
    </router-link>
    <router-link class="_item" replace active-class="mui-active" to="/shop">
      <span class="mui-icon l-icon-shop"></span>
      <span class="mui-tab-label">商城</span>
    </router-link>
    <router-link class="_item" replace active-class="mui-active" to="/shopcar">
      <span class="mui-icon l-icon-shopcar"><span class="mui-badge mui-badge-danger">{{shopcarNumber > 99 ? '99+' : shopcarNumber}}</span></span>
      <span class="mui-tab-label">购物车</span>
    </router-link>
    <router-link class="_item" replace active-class="mui-active" to="/me">
      <span class="mui-icon l-icon-me"></span>
      <span class="mui-tab-label">我的</span>
    </router-link>
  </nav>
</template>
<script>
export default {
  data() {
    return {
      shopcarNumber: 0
    }
  },
  created() {
    this.$server.shopcar.getNum().then(({data})=>{
      this.shopcarNumber = data
    })
  }
}
</script>