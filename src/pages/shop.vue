<template>
  <div class="l-page">
    <header class="mui-bar mui-bar-nav l-black" v-if="!$mui.os.wechat">
      <h1 class="mui-title">{{ $route.meta.title }}</h1>
      <!-- <a class="mui-icon mui-icon-arrowleft mui-pull-left"></a> -->
      <!-- <a class="mui-icon mui-icon-bars mui-pull-right"></a> -->
    </header>
    <nav-tab></nav-tab>
    <div class="mui-content">
      <!-- 商品列表 -->
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
      <!-- 商品列表 end-->
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
      goodsList: null
    }
  },
  created() {
    this.loading = true
    this.$server.shop.getGoodsList().then(({data})=>{
      setTimeout(()=>{
        this.goodsList = data
        this.loading = false
      }, 600)
    }).catch(()=>{
      this.loading = false
    })
  }
}
</script>