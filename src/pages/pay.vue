<template>
  <div class="l-page">
    <header class="mui-bar mui-bar-nav l-black" v-if="!$device.isWechat">
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
          <span class="l-text-warn"><b class="l-icon">&#xe6cb;</b>{{payInfo.amount | currency}}</span>
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
      this.$server.chooseWXPay2(this.formData).then(()=>{
        
        // this.$mui.confirm('支付成功', '', ['返回', '查看订单'], (e)=>{
        //   this.isPay = true
        //   if(e.index == 1){
        //     this.$router.replace('/order/list?tab=2')
        //   }else{
        //     this.$router.replace(this.$route.query.to || '/home')
        //   }
        // })
        this.$storage.session.set('temp_pay_result', 1)
        this.$router.replace('/pay/result')
      }).catch(()=>{
        this.$storage.session.set('temp_pay_result', 0)
        this.$router.replace('/pay/result')
      }).finally(()=>{
        this.submiting = false
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
  },
  mounted() {
    setTimeout(()=>{
      this.pay()
    }, 100)
  }
  // ,
  // beforeRouteLeave(to, from, next) {
  //   if(!this.isPay){
  //     this.$mui.alert('可在【我的->我的订单】完成支付', '未支付成功', (e)=>{
  //       next()
  //     })
  //   }else{
  //     next()
  //   }
  // }
}
</script>
<style scoped lang="less">

</style>