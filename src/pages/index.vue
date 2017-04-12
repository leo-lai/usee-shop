<template>
  <div class="l-page">
    <header class="mui-bar mui-bar-nav l-black" v-if="!$mui.os.wechat">
      <h1 class="mui-title">{{ $route.meta.title }}</h1>
    </header>
    <nav-tab></nav-tab>
    <div class="mui-content mui-scroll">
      <!-- banner -->
      <div class="mui-slider">
        <div class="mui-slider-group mui-slider-loop" v-if="bannerList">
          <div class="mui-slider-item mui-slider-item-duplicate" v-if="bannerList.length > 1"><a><img :src="bannerList[bannerList.length-1].imagePath" /></a></div>
          <div class="mui-slider-item" v-for="item in bannerList"><a @click="$link(item.clickURL)"><img :src="item.imagePath" /></a></div>
          <div class="mui-slider-item mui-slider-item-duplicate" v-if="bannerList.length > 1"><a><img :src="bannerList[0].imagePath" /></a></div>
        </div>
        <div class="mui-slider-indicator">
          <div class="mui-indicator" :class="{'mui-active': index === 0}" v-for="(item,index) in bannerList"></div>
        </div>
      </div>
      <!-- banner end-->

      <!-- menu -->
      <div class="mui-row l-text-center l-bg-white l-border-t">
        <a class="l-text-default mui-col-sm-4 mui-col-xs-4 l-padding l-link l-disabled" @click="$mui.coding">
          <p><img style="height: 2rem;" src="~assets/images/icon-001.png" alt=""></p>
          <p class="l-margin-t-xs l-fs-m">服务预约</p>
        </a>
        <a class="l-text-default mui-col-sm-4 mui-col-xs-4 l-padding l-link l-disabled" @click="$mui.coding">
          <p><img style="height: 2rem;" src="~assets/images/icon-002.png" alt=""></p>
          <p class="l-margin-t-xs l-fs-m">护眼方案</p>
        </a>
        <a class="l-text-default mui-col-sm-4 mui-col-xs-4 l-padding l-link l-disabled" @click="$mui.coding">
          <p><img style="height: 2rem;" src="~assets/images/icon-003.png" alt=""></p>
          <p class="l-margin-t-xs l-fs-m">视保定制</p>
        </a>
      </div>
      <!-- menu end-->
      
      <!-- recommend -->
      <div class="l-text-center l-padding-btn l-margin-t l-bg-white l-border-b">
        <span>推荐商品</span>
        <span class="l-text-gray"> / Recommend</span>
      </div>
      <div class="l-goods-list">
        <router-link class="l-goods-item l-margin-b" tag="div" v-for="item in goodsList" :to="'/shop/goods/info/' + item.goodsId">
          <div class="_thumb">
            <img :src="item.image">
          </div>
          <div class="_text l-border-t">
            <h3>{{item.goodsName}}</h3>
            <p class="l-fs-m">{{item.goodsBrief}}</p>
            <p class="l-text-warn l-fs-l"><b class="l-icon">&#xe6cb;</b>{{item.price.toFixed(2)}}</p>
          </div>
        </router-link>
        <div class="l-loading-inline" v-show="loading"><i class="mui-spinner"></i><span class="_txt">加载中...</span></div>
      </div>
      <!-- recommend end-->
    </div>
  </div>
</template>
<script>
import navTab from 'components/nav-tab'

export default {
  components: {
    navTab
  },
  data () {
    return {
      loading: false,
      goodsList: null,
      bannerList: null
    }
  },
  created() {
    this.loading = true
    this.$server.shop.getGoodsList(1).then(({data})=>{
      setTimeout(()=>{
        this.goodsList = data
        this.loading = false
      }, 600)
    }).catch(()=>{
      this.loading = false
    })

    this.$server.getBanner().then(({data})=>{
      this.bannerList = data
      this.$nextTick(()=>{
        this.$mui('.mui-slider').slider({
          interval: 3000
        })
      })
    })
  }
}
</script>
<style scoped>

</style>