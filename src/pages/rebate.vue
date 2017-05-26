<template>
  <div class="l-page">
    <header class="mui-bar mui-bar-nav l-black" v-if="!$device.isWechat">
      <h1 class="mui-title">{{ $route.meta.title }}</h1>
      <a class="mui-icon mui-icon-arrowleft mui-pull-left _nav-back"></a>
    </header>
    <div class="mui-content">
      <template v-if="userInfo.agentId == 1">
        <div class="l-card-count l-text-center">
          <p class="l-fs-s">&nbsp;累计返利(元)</p>  
          <p class="l-fs-xl">{{totalAmount | currency}}</p>
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
            <p>
              <span class="mui-pull-right" :class="item.rebateRecordState == 0 ? 'l-text-ok' : 'l-text-warn'">
                {{ item.amount > 0 ? rebateRecordState[item.rebateRecordState] : '退货扣除' }}
              </span> 
              订单编号：{{item.orderCode}}
            </p>
            <p>购买时间：{{item.startDate}}</p>
            <p>购买客户：{{item.userName || item.phoneNumber}}</p>
            <p>返利商品：{{item.goodsName}}</p>
            <p>返利金额：<span :class="item.amount > 0 ? 'l-text-ok' : 'l-text-error'">{{ item.amount | currency }}</span></p>
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
      rebateRecordState: ['返利中', '已返利'],
      startDate: new Date(now.setMonth(now.getMonth()-3)).format('yyyy-MM-dd'),
      endDate: new Date().format('yyyy-MM-dd'),
      page: 1,
      list: [],
      totalAmount: 0,
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
      this.$server.user.getRebateRecord(this.startDate, this.endDate, this.page)
      .then(({data})=>{
        let returnList = data.rebateRecords
        this.totalAmount = data.totalAmount || 0
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
    this.$server.user.getInfo().then(({data})=>{
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
    border-bottom: 1px solid #ff784e;
    input{
      display: inline-block; width: 100%;  margin: auto; padding: 1rem 0;
      border:none;  border-radius: 0; text-align: center; font-size: 0.7rem;
    }
  }
}
.l-rebate-item{margin:0 0.75rem; padding: 0.75rem 0; font-size: 0.7rem; color: #999;}

</style>