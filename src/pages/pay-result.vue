<template>
  <div class="l-page">
    <header class="mui-bar mui-bar-nav l-black" v-if="!$mui.os.wechat">
      <h1 class="mui-title">{{ $route.meta.title }}</h1>
      <a class="mui-icon mui-icon-arrowleft mui-pull-left _nav-back"></a>
    </header>
    <div class="mui-content">
      <div class="l-text-center">
        <div class="l-margin" v-if="success">
          <i class="l-icon l-text-ok">&#xe7f8;</i>
          <p>支付成功</p>
        </div>
        <div class="l-margin" v-else>
          <i class="l-icon l-text-error">&#xe694;</i>
          <p>支付失败</p>
        </div>
        <div class="l-usee-qrcode">
          <img :src="$server.getWxQrcode()" alt="">
          <p class="_desc">长按二维码关注公众号<br>及时查看订单状态，优惠活动等信息</p>
        </div>
      </div>
      <br>
      <div class="l-margin">
        <button type="button" class="mui-btn l-btn-main" @click="viewOrderList">查看订单</button>
        <button type="button" class="mui-btn l-btn-white l-margin-t" @click="$link('/shop', 'page-out', 'replace')">返回商城</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      success: true
    }
  },
  methods: {
    viewOrderList() {
      this.$link('/order/list?tab=' + (this.success ? 2 : 1), 'page-in', 'replace')
    }
  },
  created() {
    this.success = this.$storage.session.get('temp_pay_result') == 1 ? true : false
  }
}
</script>
<style scoped lang="less">
.l-icon{font-size: 3rem;}
.l-usee-qrcode{
  text-align: center; 
  img{
    width: 8.0rem; height: 8rem; display: block; margin:auto;
  }
  ._desc{color: #999; margin: 0.5rem 0; font-size: 0.7rem;}
}
</style>