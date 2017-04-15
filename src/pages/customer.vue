<template>
  <div class="l-page">
    <header class="mui-bar mui-bar-nav l-black" v-if="!$mui.os.wechat">
      <h1 class="mui-title">{{ $route.meta.title }}</h1>
      <a class="mui-icon mui-icon-arrowleft mui-pull-left _nav-back"></a>
    </header>
    <div class="mui-content">
      <template v-if="userInfo.agentId == 1">
        <div class="l-card-count l-text-center">
          <p class="l-fs-s">&nbsp;累计有效客户</p>  
          <p class="l-fs-xl">{{customerNum}}</p>
        </div>
        <div class="l-padding l-fs-s">
          说明：客户扫码登录后需要购买指定商品才能与您成功绑定关系，已经被绑定的客户无法再次被绑定。
        </div>
        <div class="l-tab-customer l-bg-white">
          <div class="_tit l-border-b l-flex-hvc l-sticky">
            <div class="_item" :class="{'_active': tabIndex == 1}" @click="tabClick(1)">
              <i class="l-icon l-text-ok">&#xe626; </i>成功绑定
            </div>
            <div class="_item" :class="{'_active': tabIndex == 0}" @click="tabClick(0)">
              <i class="l-icon l-text-error">&#xe605; </i>未成功绑定
            </div>
          </div>
          <div class="l-customer-list" v-show="tabIndex == 1">
            <div class="_item l-border-b" v-for="item in list1">
              <p>微信昵称：{{item.userName}}</p>
              <p>绑定时间：{{item.startDate}}</p>
              <p>客户来源：{{item.describe}}</p>
            </div>
          </div>
          <div class="l-customer-list" v-show="tabIndex == 0">
            <div class="_item l-border-b" v-for="item in list0">
              <p>微信昵称：{{item.userName}}</p>
              <p>绑定时间：{{item.startDate}}</p>
              <p>失败原因：{{item.describe}}</p>
            </div>
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

export default {
  components: {
    notU, infiniteLoading
  },
  data () {
    return {
      userInfo: {},
      list0: [],
      list1: [],
      pages: [1, 1],
      customerNum: 0,
      tabIndex: 1
    }
  },
  methods: {
    tabClick(index = 1) {
      this.tabIndex = index

      let list = this['list' + index]
      if(!list.complete){
        if(list.length > 0){
          this.$refs.infinite.$emit('$InfiniteLoading:reset', false)  
        }else{
          this.$refs.infinite.$emit('$InfiniteLoading:reset', true)
        }
      }else{
        this.$refs.infinite.$emit('$InfiniteLoading:complete')
      }
    },
    onInfinite() {
      this.$server.user.getCustomer(this.tabIndex, this.page)
      .then(({data})=>{
        let returnList = data.relationshi
        let list = this['list' + this.tabIndex]
    
        list = list.concat(returnList)
        
        if(returnList.length > 0){
          this.$nextTick(()=>{
            this.$refs.infinite.$emit('$InfiniteLoading:loaded')    
          })
          
          if(returnList.length >= returnList.rows){
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

        this.customerNum = data.customerNum
        this['list' + this.tabIndex] = list

      }).catch(()=>{
        this['list' + this.tabIndex].complete = true
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
.l-tab-customer{
  ._tit{
    text-align: center; background: #fff;
    .l-icon{font-size: 1rem;}
    ._item{
      padding: 0.3rem 1.4rem 0.3rem 1rem; 
      border-bottom: 2px solid transparent;
      position: relative; bottom: -1px; z-index: 10;
    }
    ._active{
      color: #ff784e; border-color: #ff784e;
    }
  }
}
.l-customer-list{
  ._item{
    padding: 0.75rem; font-size: 0.7rem;
  }
}
</style>