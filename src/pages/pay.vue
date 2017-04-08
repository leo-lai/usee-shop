<template>
  <div class="l-page">
    <header class="mui-bar mui-bar-nav l-black" v-if="!$mui.os.wechat">
      <h1 class="mui-title">{{ $route.meta.title }}</h1>
      <a class="mui-icon mui-icon-arrowleft mui-pull-left _nav-back"></a>
    </header>
    <div class="mui-content">
      <div class="l-panel-group">
        <div class="_item l-flex-hc">
          <div class="l-rest">订单号</div>
          <span>{{payInfo.orderCode}}</span>
        </div>
        <div class="_item l-flex-hc">
          <div class="l-rest">订单金额</div>
          <span class="l-text-warn"><b class="l-icon">&#xe6cb;</b>{{(payInfo.amount || 0).toFixed(2)}}</span>
        </div>
        <div class="_item l-flex-hc">
          <div class="l-rest">付款方式</div>
          <span><i class="l-icon l-text-ok">&#xe62a; </i>微信支付</span>
        </div>
      </div>
      <div class="l-margin">
        <button type="button" class="mui-btn l-btn-main" :disabled="submiting" @click="pay">确定付款</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      submiting: false,
      payInfo: {},
      formData: {
        orderId: '',
        amount: 0.01,
        code: ''
      }
    }
  },
  methods: {
    pay() {
      this.submiting = true
      this.$mui.showWaiting('支付中...')
      this.$server.chooseWXPay2(this.formData).then(()=>{
        this.$mui.confirm('支付成功', '', ['返回', '查看订单'], (e)=>{
          if(e.index == 1){
            
          }else{
            this.$router.back()
          }
        })
      }).finally(()=>{
        this.submiting = false
        this.$mui.hideWaiting()
      })
    }
  },
  created() {
    if(this.$device.isWechat && !this.$route.query.code){
      this.$mui.alert('微信授权失败')
      window.location.replace(this.$server.getGrantUrl('/pay', this.$route.query))
    }

    this.payInfo = this.$storage.session.get('temp_pay_info')
    this.formData.code = this.$route.query.code
    this.formData.orderId = this.payInfo.orderId
    this.formData.amount = this.payInfo.amount

    this.$nextTick(()=>{
      this.pay()
    })
  }
}
</script>
<style scoped lang="less">

</style>