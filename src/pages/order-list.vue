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
        <a class="_item l-rest" :class="{'_active': tabIndex == 3}" @click="tabClick(3)">
          <p><img class="_icon" src="~assets/images/icon-010.png" alt=""></p>
          <p class="_txt">待评价</p>
        </a>
      </div>
      <div class="l-tab-group l-rest l-rel">
        <div class="l-tab-cont mui-scroll-wrapper" v-show="tabIndex == 0">
          <div class="mui-scroll">
            <order-list></order-list>
          </div>
        </div>
        <div class="l-tab-cont mui-scroll-wrapper" v-show="tabIndex == 1">
          <div class="mui-scroll">
            <order-list></order-list>
          </div>
        </div>
        <div class="l-tab-cont mui-scroll-wrapper" v-show="tabIndex == 2">
          <div class="mui-scroll">
            <order-list></order-list>
          </div>
        </div>
        <div class="l-tab-cont mui-scroll-wrapper" v-show="tabIndex == 3">
          <div class="mui-scroll">
            <order-list></order-list>
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
      tabIndex: 0
    }
  },
  methods: {
    tabClick(index = 0) {
      this.tabIndex = index
    },
    scrollInit() {

      const mui = this.$mui
      mui.use(pullToRefresh)
      mui.use(pullToRefreshMaterial)

      //阻尼系数
      let deceleration = mui.os.ios ? 0.003 : 0.0009
      mui('.mui-scroll-wrapper').scroll({
        bounce: false,
        indicators: true, //是否显示滚动条
        deceleration: deceleration
      });

      //循环初始化所有下拉刷新，上拉加载。
      mui.each(document.querySelectorAll('.l-tab-cont .mui-scroll'), function(index, pullRefreshEl) {
        mui(pullRefreshEl).pullToRefresh({
          // down: {
          //   callback: function() {
          //     var self = this;
          //     setTimeout(function() {
          //       self.endPullDownToRefresh();
          //     }, 1000);
          //   }
          // },
          up: {
            callback: function() {
              var self = this
              setTimeout(function() {
                self.endPullUpToRefresh()
              }, 1000)
            }
          }
        })
      })

      document.addEventListener('touchmove', preventDefault, false)
    }
  },
  created() {
    this.$nextTick(()=>{
      this.scrollInit()
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