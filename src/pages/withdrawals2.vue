<template>
  <div class="l-page">
    <header class="mui-bar mui-bar-nav l-black" v-if="!$device.isWechat">
      <h1 class="mui-title">{{ $route.meta.title }}</h1>
      <a class="mui-icon mui-icon-arrowleft mui-pull-left _nav-back"></a>
    </header>
    <footer class="mui-bar mui-bar-footer l-flex-hc l-transparent">
      <button type="button" class="mui-btn l-btn-main" :disabled="submiting" @click="submit">提交</button>
    </footer>
    <div class="mui-content">
      <div class="l-panel-group l-form l-margin-b">
        <div class="_item l-flex-hc">
          <label class="_tit">账户余额</label>
          <div class="_ipt l-rest">
            <input type="number" maxlength="5" :value="userInfo.account | currency" readonly>
          </div>
        </div>
        <div class="_item l-flex-hc">
          <label class="_tit">提现金额</label>
          <div class="_ipt l-rest">
            <input type="number" step="0.01" min="1" maxlength="5" placeholder="请输入提现金额" @change="checkNum" v-model="formData.amount">
          </div>
          <a class="l-fs-m l-margin-l-m " @click="getAll">全部提现</a>
        </div>
      </div>
      <div class="l-panel-group l-form l-margin-b">
        <div class="_item l-flex-hc">
          <label class="_tit">持卡人姓名</label>
          <div class="_ipt l-rest">
            <input type="text" placeholder="请输入持卡人姓名" maxlength="50" v-model="formData.accountHolder">
          </div>
        </div>
        <div class="_item l-flex-hc">
          <label class="_tit">银行卡号</label>
          <div class="_ipt l-rest">
            <input type="tel" placeholder="请输入银行卡号" maxlength="20" v-model="formData.bankAccountNumber">
          </div>
        </div>
        <div class="_item l-flex-hc">
          <label class="_tit">银行名称</label>
          <div class="_ipt l-rest">
            <input type="text" placeholder="请输入银行名称" maxlength="20" v-model="formData.bankAccount">
          </div>
        </div>
        <div class="_item l-flex-hc">
          <label class="_tit">银行支行</label>
          <div class="_ipt l-rest">
            <input type="text" placeholder="请输入银行支行" maxlength="20" v-model="formData.bankBranch">
          </div>
        </div>
      </div>
      <div class="l-bg-white l-zoom l-margin-b">
        <h3 class="l-margin l-text-center">提现说明</h3>
        <ul class="l-fs-s">
          <li>每次最低提现金额为50元，最高提现金额为20000元，每月提现次数不能超过2次。</li>
          <li>您的提现申请我们工作人员将于每月的10号及25号统一打款。审核需要一定时间，请您提前3天以上提出提现申请。:00-17:00做统一打款处理</li>
          <li class="l-text-error">请仔细填写并核对提现资料的正确性，如果发现提交资料有误请及时联系客服（400-180-6900）。</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      submiting: false,
      userInfo: {
        account: 0
      },
      formData: {
        bankId: '',
        accountHolder: '',
        bankAccountNumber: '',
        bankAccount: '',
        bankBranch: '',
        phoneNumber: '',
        amount: ''
      }
    }
  },
  methods: {
    getAll() {
      this.formData.amount = this.userInfo.account.toFixed(2)
    },
    checkNum() {
      if(!/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/.test(this.formData.amount)){
        this.$mui.toptip('请输入正确的金额')
        return false
      }
      return true
    },
    submit() {
      if(!this.formData.amount){
        this.$mui.toptip('请输入提现金额')
        return
      }

      if(!this.checkNum()){
        return false
      }

      if(this.formData.amount > this.userInfo.account){
        this.$mui.toptip('账户余额不足，请重新输入')
        return
      }

      if(!this.formData.accountHolder){
        this.$mui.toptip('请输入收款人姓名')
        return
      }
      if(!this.formData.bankAccountNumber){
        this.$mui.toptip('请输入银行卡号')
        return
      }
      if(!this.formData.bankAccount){
        this.$mui.toptip('请输入银行名称')
        return
      }
      if(!this.formData.bankAccount){
        this.$mui.toptip('请输入银行支行')
        return
      }

      this.submiting = true
      this.$mui.showWaiting()
      this.$server.user.withdrawals(this.formData).then(()=>{
        this.$mui.alert('提现申请提交成功，我们将尽快为您处理！', (e)=>{
          this.$router.back()
        })
      }).finally(()=>{
        this.submiting = false
        this.$mui.hideWaiting()
      })
    }
  },
  created() {
    let promise1 = this.$server.user.getInfo(true)
    promise1.then(({data})=>{
      data.account = data.account || 0
      this.userInfo = data
    })

    let promise2 = this.$server.user.getBankInfo()
    promise2.then(({data})=>{
      Object.assign(this.formData, data)
    })

    this.$mui.showWaiting()
    Promise.all([promise1, promise2]).finally(()=>{
      this.$mui.hideWaiting()
    })
  }
}
</script>
<style scoped lang="less">
ul{padding: 0 0.75rem 0 1.75rem;list-style-type: decimal;}
</style>