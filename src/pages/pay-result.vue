<template>
  <div class="l-page">
    <header class="mui-bar mui-bar-nav l-black" v-if="!$device.isWechat">
      <h1 class="mui-title">{{ $route.meta.title }}</h1>
      <a class="mui-icon mui-icon-arrowleft mui-pull-left _nav-back"></a>
    </header>
    <div class="mui-content l-bg-white">
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
          <p class="_desc masked">长按二维码关注公众号<br>及时查看订单状态，优惠活动等信息。</p>
        </div>
      </div>
      <br>
      <div class="l-margin">
        <button type="button" class="mui-btn l-btn-main" @click="$link('/shop', 'page-out', 'replace')">继续购买</button>
        <button type="button" class="mui-btn l-btn-white l-margin-t" @click="viewOrderList">查看订单</button>
      </div>
      <transition name="fade">
        <div class="l-layer l-flex-vhc" v-if="isAgent && success" @click="hideAgentTip">
          <div class="l-agent-tip">
            <p><i class="l-icon" style="color:#ffef16;">&#xe617;</i></p>
            <p>恭喜您获得小U店员资格<br>系统将在24小时内生效</p>
          </div>
          <p class="l-text-center l-margin-t"><i class="l-icon l-agent-close" >&#xe61a;</i></p>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      success: false,
      isAgent: false
    }
  },
  methods: {
    hideAgentTip() {
      this.isAgent = false
    },
    viewOrderList() {
      this.$link('/order/list?tab=' + (this.success ? 2 : 1), 'page-in', 'replace')
    }
  },
  created() {
    this.success = this.$storage.session.get('temp_pay_result') == 1 ? true : false
    setTimeout(()=>{
      this.isAgent = this.$storage.session.get('buy_become_agent') == 1 ? true : false
    }, 600)
  }
}
</script>
<style scoped lang="less">
.l-icon{font-size: 2.6rem;}
.l-agent-close{color:#fff; font-size:1.6rem; opacity: 0.8;}
.l-agent-tip{
  width: 12rem; padding: 1rem; border-radius: 5px; text-align: center; font-size: 0.8rem;
  background: linear-gradient(180deg, #ff784e, #f4524e); color: #fff;
}
.l-usee-qrcode{
  text-align: center; 
  img{
    width: 9rem; height: 9rem; display: block; margin:0 auto 1rem;
     box-shadow: 0 15px 10px -10px rgba(0, 0, 0, 0.5), 0 1px 10px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset; 
    /* box-shadow:5px 2px 6px #000; transform: rotate(-3deg) */
  }
  ._desc{margin: 0.5rem 0; font-size: 0.7rem; color: #ff2828;}
}

.masked{
  background-image: linear-gradient(left, #ff784e, #E6D205 25%, #f70000 50%, #E6D205 75%, #f4524e);
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  -webkit-background-size: 200% 100%;
  -webkit-animation: masked-animation 4s infinite linear;
}
@keyframes masked-animation {
  0%  { background-position: 0 0;}
  100% { background-position: -100% 0;}
}

</style>