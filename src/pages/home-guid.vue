<template>
  <div class="l-page">
    <header class="mui-bar mui-bar-nav l-black" v-if="!$mui.os.wechat">
      <h1 class="mui-title">{{ $route.meta.title }}</h1>
    </header>
    <nav-tab></nav-tab>
    <div class="mui-content">
      <!-- <input type="file" accept="image/*" >  -->
      <router-link to="/shop/goods/info/1">
        <img height="100%" width="100%" src="~assets/images/index.hot2.jpg" alt="">
      </router-link>
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
  methods: {
    
  }
}
</script>
<style scoped>

</style>