<template>
  <div class="l-page-group">
    <div class="l-page">
      <header class="mui-bar mui-bar-nav l-black" v-if="!$device.isWechat">
        <h1 class="mui-title">{{ $route.meta.title }}</h1>
        <a class="mui-icon mui-icon-arrowleft mui-pull-left _nav-back"></a>
      </header>
      <div class="mui-content">
        <template v-if="userInfo.agentId == 1">
          <div class="l-bg-white l-text-center l-sticky">
            <div class="l-padding l-border-b">
              <p class="l-fs-s">可用余额(元)</p>
              <p class="l-fs-xl"><b>{{money.availableAmount | currency}}</b></p>
              <p class="l-text-warn" @click="showTip = true">提现说明</p>
            </div>
            <div class="l-padding l-border-b l-flex-hc">
              <div class="l-rest">
                <p class="l-fs-s">账户余额(元)</p>
                <p>{{money.amount | currency}}</p>
              </div>
              <div class="l-rest">
                <p class="l-fs-s">提现中金额(元)</p>
                <p class="l-text-hot">{{money.onTheWayAmount | currency}}</p>
              </div>
            </div>
            <div class="l-padding">
              <button class="mui-btn l-btn-main _m" style="width: 6rem;" @click="txPage">提现</button>
            </div>
          </div>
          <p class="l-margin l-fs-s l-text-gray l-text-center" v-show="list.length > 0" style="margin-bottom:0.25rem;">提现历史</p>
          <div class="l-bg-white l-margin-b">
            <div class="l-border-t l-padding" v-for="item in list" @click="viewInfo(item)">
              <p><span class="mui-pull-right l-fs-s">{{withdrawalsState[item.withdrawalsState]}}</span><span class="l-text-hot">{{item.amount | currency}}</span></p>
              <p class="l-fs-s l-text-gray">
                <span class="mui-pull-right">{{item.startDate}}</span>
                <span>{{item.withdrawalCode}}</span>
              </p>
            </div>
          </div>
          <infinite-loading :on-infinite="onInfinite" ref="infinite">
            <div class="l-loading-inline" slot="spinner"><i class="mui-spinner"></i><span class="_txt">正在加载...</span></div>
            <div class="l-text-gray l-fs-m" slot="no-results">还没有提现历史记录</div>
            <div class="l-text-gray l-fs-m" slot="no-more">全部数据加载完毕</div>
          </infinite-loading>
        </template>
        <not-u v-else></not-u>
      </div>
    </div>
    <!-- 提现 -->
    <div class="l-page" id="page-tx">
      <header class="mui-bar mui-bar-nav l-black" v-if="!$device.isWechat">
        <h1 class="mui-title">申请提现</h1>
        <a class="mui-icon mui-icon-arrowleft mui-pull-left _nav-back"></a>
      </header>
      <div class="mui-content">
        <div class="l-panel-group l-form l-margin-b">
          <div class="_item l-flex-hc">
            <label class="_tit">可用余额</label>
            <div class="_ipt l-rest">
              <span>{{money.availableAmount | currency}}</span>
            </div>
          </div>
          <div class="_item l-flex-hc">
            <label class="_tit">提现金额</label>
            <div class="_ipt l-rest">
              <input type="number" step="0.01" min="1" maxlength="5" placeholder="请输入提现金额" @change="checkNum" v-model="formData.amount">
            </div>
            <a class="l-fs-m l-margin-l-m " @click="getAll">全部提现</a>
          </div>
          <div class="_item l-flex-hc l-link"  @click="$pageTo('#page-tx2', '提现账户')">
            <label class="_tit">提现账户</label>
            <div class="_ipt l-rest">
              <span v-if="formData.bankAccountNumber">{{formData.bankAccountNumber}}</span>
              <span v-else class="l-text-gray">填写账户信息</span>
            </div>
            <div class="l-arrow"></div>
          </div>
        </div>
        <div class="l-margin">
          <button class="mui-btn l-btn-main" :disabled="submiting || money.availableAmount <= 0" @click="submit">提交申请</button>
        </div>
      </div>
    </div>

    <!-- 提现账户 -->
    <div class="l-page" id="page-tx2">
      <header class="mui-bar mui-bar-nav l-black" v-if="!$device.isWechat">
        <h1 class="mui-title">提现账户</h1>
        <a class="mui-icon mui-icon-arrowleft mui-pull-left _nav-back"></a>
      </header>
      <div class="mui-content">
        <div class="l-tx2-top">
          <i class="l-icon">&#xe692;</i>&nbsp;请确保提现账户信息填写正确
        </div>
        <div class="l-panel-group l-form l-margin-b">
          <div class="_item l-flex-hc">
            <label class="_tit">持卡人姓名</label>
            <div class="_ipt l-rest">
              <input type="text" placeholder="请输入持卡人姓名" maxlength="50" v-model="bankInfo.accountHolder">
            </div>
          </div>
          <div class="_item l-flex-hc">
            <label class="_tit">银行卡号</label>
            <div class="_ipt l-rest">
              <input type="tel" placeholder="请输入银行卡号" maxlength="20" v-model="bankInfo.bankAccountNumber">
            </div>
          </div>
          <div class="_item l-flex-hc">
            <label class="_tit">银行名称</label>
            <div class="_ipt l-rest">
              <input type="text" placeholder="请输入银行名称" maxlength="20" v-model="bankInfo.bankAccount">
            </div>
          </div>
          <div class="_item l-flex-hc">
            <label class="_tit">银行支行</label>
            <div class="_ipt l-rest">
              <input type="text" placeholder="请输入银行支行" maxlength="20" v-model="bankInfo.bankBranch">
            </div>
          </div>
        </div>
        <div class="l-margin">
          <button class="mui-btn l-btn-main" :disabled="submiting" @click="submitBank">保存账户信息</button>
        </div>
      </div>
    </div>

    <!-- 流水详情 -->
    <div class="l-page" id="page-txinfo">
      <header class="mui-bar mui-bar-nav l-black" v-if="!$device.isWechat">
        <h1 class="mui-title">提现详情</h1>
        <a class="mui-icon mui-icon-arrowleft mui-pull-left _nav-back"></a>
      </header>
      <div class="mui-content">
        <div class="l-bg-white l-margin-b">
          <div class="l-flex-hc" :class="stepCls">
            <div class="_step">
              <i class="_icon"></i>
              <p class="_txt">提现申请</p>
              <p class="_txt l-lh-s l-margin-t-s"><span>2016-12-12 12:12:12</span></p>
            </div>
            <div class="_line l-rest"></div>
            <div class="_step">
              <i class="_icon"></i>
              <p class="_txt">申请处理中</p>
              <p class="_txt l-lh-s l-margin-t-s"><span>2016-12-12 12:12:12</span></p>
            </div>
            <div class="_line l-rest"></div>
            <div class="_step">
              <i class="_icon"></i>
              <p class="_txt">处理结果</p>
              <p class="_txt l-lh-s l-margin-t-s"><span>2016-12-12 12:12:12</span></p>
            </div>
          </div>
          <div class="l-padding-btn l-border-t l-text-gray l-fs-xs">
            注：平台打款之后距离实际到账提现银行卡存在一定的延时
          </div>
        </div>
        <div class="l-bg-white l-margin-b">
          <div class="l-padding-btn l-border-b l-flex-hc">
            <span class="l-rest">提现金额</span>
            <span class="mui-pull-right l-fs-xl">125.00</span>
          </div>
          <div class="l-fs-s l-padding-btn l-zoom l-tx-info">
            <p class="l-margin-tb-m">
              <span class="mui-pull-right"></span>
              <span class="l-text-gray">申请状态</span>
            </p>
            <p class="l-margin-tb-m">
              <span class="mui-pull-right"></span>
              <span class="l-text-gray">提现单号</span>
            </p>
            <p class="l-margin-tb-m">
              <span class="mui-pull-right"></span>
              <span class="l-text-gray">银行流水</span>
            </p>
            <p class="l-margin-tb-m">
              <span class="mui-pull-right">持卡人姓名与银行卡不一致</span>
              <span class="l-text-gray">备注</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    
    <transition name="fade">
      <div class="l-layer l-flex-vhc" v-if="showTip">
        <div class="l-withdrawals-tip">
          <h3 class="l-margin">提现说明</h3>
          <p>1.每次最低提现金额为<span class="l-text-hot">50</span>元，最高提现金额为<span class="l-text-hot">20000</span>元。</p>
          <p>2.您的提现申请我们工作人员将于<span class="l-text-hot">每月的10号及25号</span>统一打款。审核需要一定时间，请您<span class="l-text-hot">提前3天以上</span>提出提现申请。</p>
          <p>3.请仔细填写并核对提现资料的正确性，如果发现提交资料有误请及时联系客服（400-180-6900）</p>
          <div class="l-margin"><button class="mui-btn l-btn-main _m" style="min-width: 10rem;" @click="showTip = false">我知道了</button></div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import notU from 'components/not-u'
import infiniteLoading from 'components/vue-infinite-loading'

export default {
  components: {
    notU, infiniteLoading
  },
  data () {
    return {
      status: '',
      showTip: false,
      submiting: false,
      withdrawalsState: ['申请处理中', '提现成功', '提现失败'],
      page: 1,
      list: [],
      bankInfo: {
        bankId: '',
        accountHolder: '',
        bankAccountNumber: '',
        bankAccount: '',
        bankBranch: '',
        phoneNumber: ''
      },
      formData: {
        bankId: '',
        accountHolder: '',
        bankAccountNumber: '',
        bankAccount: '',
        bankBranch: '',
        phoneNumber: '',
        amount: ''
      },
      money: {
        amount: 0,
        availableAmount: 0,
        onTheWayAmount: 0,
        account: 0
      },
      userInfo: {}
    }
  },
  computed: {
    stepCls() {
      let cls = ''
      switch(this.status){
        case '1':
          cls = 'l-service-step2'
          break
        case '2':
        case '3':
        case '6':
          cls = 'l-service-step3'
          break
        default:
          cls = 'l-service-step1'
      }
      return cls
    }
  },
  methods: {
    getAll() {
      this.formData.amount = this.money.availableAmount.toFixed(2)
    },
    onInfinite() {
      this.$server.user.getWithdrawalsRecord(this.startDate, this.endDate, this.page)
      .then(({data})=>{
        let returnList = data.withdrawalRecords

        this.money.amount = data.amount || 0
        this.money.availableAmount = data.availableAmount || 0
        this.money.onTheWayAmount = data.onTheWayAmount || 0
        this.list = this.list.concat(returnList)
        
        if(returnList.length > 0){
          this.$nextTick(()=>{
            this.$refs.infinite.$emit('$InfiniteLoading:loaded')
          })
          
          if(returnList.length >= data.rows){
            this.page++
          }else{
            this.$refs.infinite.$emit('$InfiniteLoading:complete')
          }
        }else{
          this.$refs.infinite.$emit('$InfiniteLoading:complete')
        }
      }).catch(()=>{
        this.$refs.infinite.$emit('$InfiniteLoading:complete')
      })
    },
    reset() {
      this.page = 1
      this.list = []
      this.$refs.infinite.$emit('$InfiniteLoading:reset', true)
    },
    checkNum() {
      if(!/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/.test(this.formData.amount)){
        this.$mui.toptip('请输入正确的金额')
        return false
      }
      return true
    },
    txPage() {
      if(!this.bankInfo.bankId){
        this.$mui.showWaiting()
        this.$server.user.getBankInfo().then(({data})=>{
          this.bankInfo = data
          Object.assign(this.formData, data)
          this.$mui.hideWaiting()
          this.$pageTo('#page-tx', '提现申请')
        })
      }else{
        this.$pageTo('#page-tx', '提现申请')
      }
    },
    viewInfo(item) {
      $pageTo('#page-txinfo', '提现详情')
    },
    submitBank() {
      if(!this.bankInfo.accountHolder){
        this.$mui.toptip('请输入收款人姓名')
        return
      }
      if(!this.bankInfo.bankAccountNumber){
        this.$mui.toptip('请输入银行卡号')
        return
      }
      if(!this.bankInfo.bankAccount){
        this.$mui.toptip('请输入银行名称')
        return
      }
      if(!this.bankInfo.bankAccount){
        this.$mui.toptip('请输入银行支行')
        return
      }

      this.submiting = true
      this.$mui.showWaiting()
      this.$server.user.addOrEditBankInfo(this.bankInfo).then(({data})=>{
        Object.assign(this.formData, this.bankInfo, data)
        this.$mui.toast('保存账户信息成功')
        this.$router.back()
      }).finally(()=>{
        this.submiting = false
        this.$mui.hideWaiting()
      })
    },
    submit() {
      if(!this.formData.amount){
        this.$mui.toptip('请输入提现金额')
        return
      }

      if(!this.checkNum()){
        return false
      }

      if(this.formData.amount > this.money.availableAmount){
        this.$mui.toptip('账户余额不足，请重新输入')
        return
      }

      if(!this.formData.bankId){
        this.$mui.toptip('请填写提现账户信息')
        return
      }

      this.submiting = true
      this.$mui.showWaiting()
      this.$server.user.withdrawals(this.formData).then(()=>{
        this.$mui.alert('提现申请提交成功，我们将尽快为您处理！', (e)=>{
          this.$router.back()
          this.reset()
        })
      }).finally(()=>{
        this.submiting = false
        this.$mui.hideWaiting()
      })
    }
  },
  created() {
    this.$server.user.getInfo().then(({data})=>{
      this.userInfo = data
    })
  }
}
</script>
<style scoped lang="less">
.l-withdrawals-tip{
  background: #fff; border-radius: 0.25rem; padding: 0.75rem; text-align: center; margin: 0 1rem;
  p{text-align: left;margin:0.5rem 0; font-size: 0.75rem;}
}
.l-form{
  ._tit{min-width: 30%;}
  .l-arrow{margin-right: -0.25rem;}
}
.l-tx2-top{
  padding: 1rem; color: #fff; text-align: center;
  background: linear-gradient(90deg, #ff784e, #f4524e);
}
.l-tx-info{
  .mui-pull-right{width: 60%; line-height: 1.4; text-align: right; padding: 0.1rem 0;}
}
</style>