<template>
  <div class="l-page">
    <header class="mui-bar mui-bar-nav l-black" v-if="!$mui.os.wechat">
      <h1 class="mui-title">{{ $route.meta.title }}</h1>
      <a class="mui-icon mui-icon-arrowleft mui-pull-left _nav-back"></a>
    </header>
    <div class="mui-content">
      <template v-if="userInfo.agentId == 1">
        <div class="l-card-count l-flex-hc">
          <div class="l-rest">
            <p class="l-fs-s">&nbsp;账户余额</p>  
            <p class="l-fs-xl"><b class="l-icon">&#xe6cb;</b>{{userInfo.account.toFixed(2)}}</p>
          </div>
          <div>
            <router-link class="mui-btn l-btn-white _s" style="width:4.5rem;" tag="button" :disabled="userInfo.account <= 0" to="/me/account/withdrawals">提现</router-link>
          </div>
        </div>
        <div class="l-text-center l-rebate-time l-border-b l-sticky l-bg-white">
          <div class="l-flex-hc _time">
            <div class="l-rest">
              <p>起始时间</p>
              <p class="_date"><input type="date" min="2017-01-01" max="2020-01-01" v-model="startDate" @change="changeDate"></p>
            </div>
            <img class="l-block" style="width: 1rem; margin: 0 0.75rem;" src="~assets/images/icon-012.png" alt="">
            <div class="l-rest">
              <p>结束时间</p>
              <p class="_date"><input type="date" min="2017-01-01" max="2020-01-01" v-model="endDate" @change="changeDate"></p>
            </div>
          </div>
        </div>
        <div class="l-rebate-list l-bg-white">
          <div class="l-rebate-item l-border-b" v-for="item in list">
            <p><span class="mui-pull-right" :class="{'l-text-warn': item.withdrawalsState == 0, 'l-text-ok': item.withdrawalsState == 1}">{{withdrawalsState[item.withdrawalsState]}}</span>提现单号：{{item.withdrawalCode}}</p>
            <p>申请时间：{{item.startDate}}</p>
            <p>打款时间：{{item.finishDate}}</p>
            <p>银行流水：{{item.brankCode}}</p>
            <p>提现金额：<span class="l-text-warn l-margin-r"><b class="l-icon">&#xe6cb;</b>{{(item.amount || 0).toFixed(2)}}</span></p>
          </div>
        </div> 
        <infinite-loading :on-infinite="onInfinite" ref="infinite">
          <div class="l-loading-inline" slot="spinner"><i class="mui-spinner"></i><span class="_txt">正在加载...</span></div>
          <div class="l-text-gray l-fs-m" slot="no-results">没有相关的数据</div>
          <div class="l-text-gray l-fs-m" slot="no-more">全部数据加载完毕</div>
        </infinite-loading>
      </template>
      <not-u v-else></not-u>
    </div>
  </div>
</template>
<script>
import notU from 'components/not-u'
import infiniteLoading from 'components/vue-infinite-loading'

let now = new Date()
export default {
  components: {
    notU, infiniteLoading
  },
  data () {
    return {
      withdrawalsState: ['处理中', '已打款'],
      startDate: new Date(now.setMonth(now.getMonth()-3)).format('yyyy-MM-dd'),
      endDate: new Date().format('yyyy-MM-dd'),
      page: 1,
      list: [],
      userInfo: {
        account: 0
      }
    }
  },
  methods: {
    changeDate() {
      this.list = []
      this.$refs.infinite.$emit('$InfiniteLoading:reset')
    },
    onInfinite() {
      this.$server.user.getWithdrawalsRecord(this.startDate, this.endDate, this.page)
      .then(({data})=>{
        let returnList = data.withdrawalRecords

        this.userInfo.account = data.account || 0
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
    }
  },
  created() {
    this.$server.user.getInfo(true).then(({data})=>{
      this.userInfo = data
    })
  }
}
</script>
<style scoped lang="less">
.l-card-count{
  padding: 0.75rem; color: #fff;
  background: linear-gradient(105deg, #ff784e, #f4524e);
}
.l-rebate-time{
  color:#999; font-size: 0.75rem; padding: 0 0.75rem;
  .l-rest{overflow: hidden;}
  ._tit{padding: 0.75rem;}
  ._time{padding: 0.75rem 0;}
  ._date{
    input{
      display: inline-block; width: auto;  margin: auto;
      border:none; border-bottom: 1px solid #ff784e; border-radius: 0; text-align: center; font-size: 0.7rem;
    }
  }
}
.l-rebate-item{margin:0 0.75rem; padding: 0.75rem 0; font-size: 0.7rem; color: #999;}
</style>