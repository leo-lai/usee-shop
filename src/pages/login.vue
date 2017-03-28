<template>
  <div class="l-page">
    <header class="mui-bar mui-bar-nav l-black" v-if="!$mui.os.wechat">
      <h1 class="mui-title">{{ $route.meta.title }}</h1>
      <!-- <a class="mui-icon mui-icon-arrowleft mui-pull-left"></a> -->
      <!-- <a class="mui-icon mui-icon-bars mui-pull-right"></a> -->
    </header>
    <div class="mui-content"></div>
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
  computed: {
   
  },
  created() {
    
  }
}
</script>
<style scoped>

</style>