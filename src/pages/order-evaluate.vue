<template>
  <div class="l-page">
    <header class="mui-bar mui-bar-nav l-black" v-if="!$mui.os.wechat">
      <h1 class="mui-title">{{ $route.meta.title }}</h1>
      <a class="mui-icon mui-icon-arrowleft mui-pull-left _nav-back"></a>
      <!-- <a class="mui-icon mui-icon-bars mui-pull-right"></a> -->
    </header>
    <footer class="mui-bar mui-bar-footer l-flex-hc l-transparent">
      <button type="button" class="mui-btn l-btn-main">提交</button>
    </footer>
    <div class="mui-content">
      <div class="l-bg-white l-margin-b" v-for="item in 2">
        <div class="l-flex-hc l-padding-btn l-border-b">
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
        <div class="l-padding-btn">
          <textarea class="l-textarea" rows="3" placeholder="亲~写点什么吧！"></textarea>
        </div>
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
<style scoped>

</style>