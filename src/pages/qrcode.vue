<template>
  <div class="l-page">
    <header class="mui-bar mui-bar-nav l-black" v-if="!$mui.os.wechat">
      <h1 class="mui-title">{{ $route.meta.title }}</h1>
      <a class="mui-icon mui-icon-arrowleft mui-pull-left _nav-back"></a>
    </header>
    <div class="mui-content">
      <div class="l-bg-white l-qrcode-desc l-zoom">
        <h3 class="l-margin l-text-center">二维码说明</h3>
        <ul class="l-fs-s">
          <li>长按二维码可以保存二维码到手机</li>
          <li>您的朋友通过扫描您的二维码进入U视一号商城购买相应商品您将获得一定的返利</li>
          <li>越多人购买您获得的返利越多</li>
        </ul>
      </div>
      <div class="l-bg-white l-margin-tb l-padding">
        <div class="l-qrcode-img">
          <img src="" alt="">
        </div>
        <p class="l-text-center l-margin">U视一号<i class="l-text-warn">™</i></p><br>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      
    }
  },
  created() {
    
  }
}
</script>
<style scoped lang="less">
.l-qrcode-desc{
  ul{padding: 0 0.75rem 0 1.75rem;}
}
.l-qrcode-img{
  width: 8.0rem; height: 8.0rem; margin: 2.5rem auto 0;
  img{width: 100%; height: 100%;}
}
</style>