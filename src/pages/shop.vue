<template>
  <div class="l-page">
    <page-top></page-top>
    <header class="mui-bar mui-bar-nav l-black" v-if="!$device.isWechat">
      <h1 class="mui-title">{{ $route.meta.title }}</h1>
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
            <p class="l-text-warn l-fs-l">
              <span><b class="l-icon">&#xe6cb;</b>{{item.price | currency}}</span>&nbsp;
              <del class="l-text-gray l-fs-s" v-if="item.isBindingAgent == 1">原价：<b class="l-icon">&#xe6cb;</b>{{item.originalPrice | currency}}</del>
            </p>
          </div>
        </router-link>
        <div class="l-loading-inline" v-show="loading"><i class="mui-spinner"></i><span class="_txt">加载中...</span></div>
      </div>
      <!-- 商品列表 end-->
    </div>
  </div>
</template>
<script>
import pageTop from 'components/page-top'
import navTab from 'components/nav-tab'

export default {
  components: {
    navTab, pageTop
  },
  data () {
    return {
      loading: false,
      goodsList: null
    }
  },
  methods: {
    getList() {
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
  },
  created() {
    if(this.$storage.session.get('openId')){
      this.getList()  
    }else{
      this.loading = true
      this.$server.user.bind().then((response)=>{
        if(!response.data){
          this.$mui.confirm(response.message, '系统提示', ['取消', '重试'], (e)=>{
            if(e.index == 1){
              window.location.replace(this.$server.getGrantUrl(window.location.href))
            }
          })
        }
      }).catch((error)=>{
        error.tips && this.$mui.alert(error.message)
      }).finally(()=>{
        this.getList()
      })
    }
  }
}
</script>