<template>
  <div class="l-page">
    <header class="mui-bar mui-bar-nav l-black" v-if="!$device.isWechat">
      <h1 class="mui-title">{{ $route.meta.title }}</h1>
      <a class="mui-icon mui-icon-arrowleft mui-pull-left _nav-back"></a>
      <!-- <a class="mui-icon mui-icon-refreshempty mui-pull-right _nav-reload"></a> -->
    </header>
    <div class="mui-content">
      <div class="l-tab-imgtit l-border-b l-flex-hc l-sticky">
        <a class="_item l-rest" :class="{'_active': tabIndex == 0}" @click="tabClick(0)">
          <p><img class="_icon" src="~assets/images/icon-011.png"></p>
          <p class="_txt">全部</p>
        </a>
        <a class="_item l-rest" :class="{'_active': tabIndex == 1}" @click="tabClick(1)">
          <p><img class="_icon" src="~assets/images/icon-008.png"></p>
          <p class="_txt">待付款</p>
        </a>
        <a class="_item l-rest" :class="{'_active': tabIndex == 2}" @click="tabClick(2)">
          <p><img class="_icon" src="~assets/images/icon-009.png"></p>
          <p class="_txt">待收货</p>
        </a>
        <a class="_item l-rest" :class="{'_active': tabIndex == 3}" @click="tabClick(3)">
          <p><img class="_icon" src="~assets/images/icon-010.png"></p>
          <p class="_txt">待评价</p>
        </a>
      </div>
      <div class="l-tab-group l-rest l-rel">
        <div class="l-tab-cont" v-show="tabIndex == 0">
          <order-list :list="orderList0"></order-list>
        </div>
        <div class="l-tab-cont" v-show="tabIndex == 1">
          <order-list :list="orderList1"></order-list>
        </div>
        <div class="l-tab-cont" v-show="tabIndex == 2">
          <order-list :list="orderList2"></order-list>
        </div>
        <div class="l-tab-cont" v-show="tabIndex == 3">
          <order-list :list="orderList3"></order-list>
        </div>
      </div>
      <infinite-loading :on-infinite="onInfinite" ref="infinite">
        <div class="l-loading-inline" slot="spinner"><i class="mui-spinner"></i><span class="_txt">正在加载...</span></div>
        <div class="l-text-gray l-fs-m" slot="no-results">没有相关的数据</div>
        <div class="l-text-gray l-fs-m" slot="no-more">全部数据加载完毕</div>
      </infinite-loading>
    </div>
  </div>
</template>
<script>
import orderList from 'components/order-list'
import infiniteLoading from 'components/vue-infinite-loading'

export default {
  components: {
    orderList, infiniteLoading
  },
  data () {
    return {
      tabIndex: -1,
      orderList0: [],
      orderList1: [],
      orderList2: [],
      orderList3: []
    }
  },
  methods: {
    tabClick(index = 0) {
      let list = this['orderList' + index]
      this.tabIndex = index

      if(!list.complete){
        if(list.length === 0 || !list.loaded){
          this.$refs.infinite.$emit('$InfiniteLoading:reset', true)
        }else{
          this.$refs.infinite.$emit('$InfiniteLoading:reset', false) 
        }
      }else{
        this.$refs.infinite.$emit('$InfiniteLoading:complete')
      }

      this.$router.replace('?tab=' + index)
    },
    onInfinite() {
      let status = ''
      let index = this.tabIndex
      switch(index){
        case 1: // 未付款
          status = 'UNPAY'
          break
        case 2: // 待收货
          status = 'RECEIVE'
          break
        case 3: // 待评价
          status = 'EVALUATE'
          break
        default: // 全部
          status = 'ALL'
      }

      this.$server.order.getList(status, this.pages[index])
      .then(({data})=>{
        let list = this['orderList' + index]
        list = list.concat(data)
        if(data.length > 0){
          list.loaded = true
          this.$nextTick(()=>{
            this.$refs.infinite.$emit('$InfiniteLoading:loaded')    
          })
          
          if(data.length >= data.rows){
            this.pages[this.tabIndex]++
            list.complete = false
          }else{
            list.complete = true
            this.$refs.infinite.$emit('$InfiniteLoading:complete')
          }
        }else{
          if(list.length > 0){
            list.noMore = true
          }else{
            list.noResults = true
          }
          list.complete = true
          this.$refs.infinite.$emit('$InfiniteLoading:complete')
        }

        this['orderList' + index] = list
      }).catch(()=>{
        this['orderList' + index].complete = true
        this.$refs.infinite.$emit('$InfiniteLoading:complete')
      })
    }
  },
  created() {
    // 监听收货事件
    this.$eventHub.$on('APP-RECEIVE', (orderId)=>{
      this['orderList' + this.tabIndex].forEach((item, index)=>{
        if(item.orderId === orderId){
          item.ordersState = 5
          if(this.tabIndex == 2){
            this.orderList2.splice(index, 1)
            this.orderList3.unshift(item)
          }
          return true
        }
      })
    })

    // 监听取消事件
    this.$eventHub.$on('APP-CANCEL', (orderId)=>{
      this.orderList0.forEach((item, index)=>{
        if(item.orderId === orderId){
          this.orderList0.splice(index, 1)
          return true
        }
      })
      this.orderList1.forEach((item, index)=>{
        if(item.orderId === orderId){
          this.orderList1.splice(index, 1)
          return true
        }
      })
    })

    this.pages = [1, 1, 1, 1]
    this.$nextTick(()=>{
      this.tabClick(Number(this.$route.query.tab || 0))  
    })
  }
}
</script>
<style scoped lang="less">

</style>