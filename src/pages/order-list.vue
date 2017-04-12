<template>
  <div class="l-page">
    <header class="mui-bar mui-bar-nav l-black" v-if="!$mui.os.wechat">
      <h1 class="mui-title">{{ $route.meta.title }}</h1>
      <a class="mui-icon mui-icon-arrowleft mui-pull-left _nav-back"></a>
      <!-- <a class="mui-icon mui-icon-refreshempty mui-pull-right _nav-reload"></a> -->
    </header>
    <!--下拉刷新容器-->
    <div class="mui-content l-flex-v">
      <div class="l-tab-imgtit l-border-b l-flex-hc">
        <a class="_item l-rest" :class="{'_active': tabIndex == 0}" @click="tabClick(0)">
          <p><img class="_icon" src="~assets/images/icon-011.png" alt=""></p>
          <p class="_txt">全部</p>
        </a>
        <a class="_item l-rest" :class="{'_active': tabIndex == 1}" @click="tabClick(1)">
          <p><img class="_icon" src="~assets/images/icon-008.png" alt=""></p>
          <p class="_txt">待付款</p>
        </a>
        <a class="_item l-rest" :class="{'_active': tabIndex == 2}" @click="tabClick(2)">
          <p><img class="_icon" src="~assets/images/icon-009.png" alt=""></p>
          <p class="_txt">待收货</p>
        </a>
        <!-- <a class="_item l-rest" :class="{'_active': tabIndex == 3}" @click="tabClick(3)">
          <p><img class="_icon" src="~assets/images/icon-010.png" alt=""></p>
          <p class="_txt">待评价</p>
        </a> -->
      </div>
      <div class="l-tab-group l-rest l-rel">
        <div class="l-tab-cont mui-scroll-wrapper" v-show="tabIndex == 0">
          <div class="mui-scroll" data-type="0">
            <order-list :list="orderList0"></order-list>
          </div>
        </div>
        <div class="l-tab-cont mui-scroll-wrapper" v-show="tabIndex == 1">
          <div class="mui-scroll" data-type="1">
            <order-list :list="orderList1"></order-list>
          </div>
        </div>
        <div class="l-tab-cont mui-scroll-wrapper" v-show="tabIndex == 2">
          <div class="mui-scroll" data-type="2">
            <order-list :list="orderList2"></order-list>
          </div>
        </div>
        <div class="l-tab-cont mui-scroll-wrapper" v-show="tabIndex == 3">
          <div class="mui-scroll" data-type="3">
            <order-list :list="orderList3"></order-list>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import orderList from 'components/order-list'
import pullToRefresh from 'libs/mui/js/mui.pullToRefresh'
import pullToRefreshMaterial from 'libs/mui/js/mui.pullToRefresh.material'

let preventDefault = function(e){
  e.preventDefault()
}
export default {
  components: {
    orderList
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
      this.tabIndex = index
      this.$router.replace('?tab=' + index)
    },
    scrollInit() {
      const self = this
      const mui = this.$mui

      //阻尼系数
      let deceleration = mui.os.ios ? 0.003 : 0.0009
      mui('.mui-scroll-wrapper').scroll({
        bounce: false,
        indicators: true, //是否显示滚动条
        deceleration: deceleration
      });

      // 循环初始化所有下拉刷新，上拉加载
      let scrollContainers = Array.from(document.querySelectorAll('.l-tab-cont .mui-scroll'))
      scrollContainers.forEach((container, index)=>{
        let orderType = container.dataset.type
        let status = '', pages = [1,1,1,1]
        switch(orderType){
          case '0': // 全部
            status = 'ALL'
            break
          case '1': // 未付款
            status = 'UNPAY'
            break
          case '2': // 待收货
            status = 'RECEIVE'
            break
          case '3': // 待评价
            status = 'EVALUATE'
            break
        }

        mui(container).pullToRefresh({
          up: {
            height: 50,                      //可选.默认50.触发上拉加载拖动距离
            auto: true,                      //可选,默认false.自动上拉加载一次
            contentrefresh: '正在加载...',   //可选，正在加载状态时，上拉加载控件上显示的标题内容
            contentnomore: '没有更多数据了', //可选，请求完毕若没有更多数据时显示的提醒内容；
            callback() {
              const scroll = this

              self.$server.order.getList(status, pages[orderType])
              .then(({data})=>{
                // self.orderList[orderType] = self.orderList[orderType] ?  self.orderList[orderType].concat(data) : data
                self['orderList' + orderType] = self['orderList' + orderType] ?  self['orderList' + orderType].concat(data) : data
                if(data.length === data.rows){
                  scroll.endPullUpToRefresh(false)
                  pages[self.tabIndex]++
                }else{
                  scroll.endPullUpToRefresh(true)  
                }
              }).catch(()=>{
                scroll.endPullUpToRefresh(true)
              })
              
            }
          }
        })
      })
      document.addEventListener('touchmove', preventDefault, false)
    }
  },
  created() {
    this.$mui.use(pullToRefresh)
    this.$mui.use(pullToRefreshMaterial)

    // 确定收货
    this.$eventHub.$on('APP-RECEIVE', (data)=>{
      this.orderList3.unshift(data)
    })

    this.tabClick(this.$route.query.tab)
    this.$nextTick(()=>{
      setTimeout(()=>{
        this.scrollInit()
      }, 600)
    })
  },
  beforeDestroy() {
    document.removeEventListener('touchmove', preventDefault, false)
  }
}
</script>
<style scoped lang="less">
/* @import '~libs/mui/css/mui.pullrefresh.css'; */
.l-tab-imgtit{
  background: #fff; font-size: 0.75rem; z-index: 10;
  ._item{
    width: 10%; text-align: center; color: inherit; padding: 0.5rem 0;
    ._icon{width: 1.6rem; height: 1.6rem;}
    ._txt{margin-top: 0.25rem;}
  }
  ._active{color: rgba(255, 120, 78, 1);}
}
</style>