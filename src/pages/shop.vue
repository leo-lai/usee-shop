<template>
  <div class="l-page">
    <header class="mui-bar mui-bar-nav l-black" v-if="!$device.isWechat">
      <h1 class="mui-title">{{ $route.meta.title }}</h1>
    </header>
    <page-top></page-top>
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
              <!-- <del class="l-text-gray l-fs-s" v-if="item.isBindingAgent == 1">原价：<b class="l-icon">&#xe6cb;</b>{{item.originalPrice | currency}}</del> -->
            </p>
          </div>
        </router-link>
        <div class="l-loading-inline" v-show="loading"><i class="mui-spinner"></i><span class="_txt">加载中...</span></div>
      </div>
      <!-- 商品列表 end-->
    </div>
    <div class="l-scaning l-flex-vhc" v-if="isFromScan">
      <div class="l-scaning-box">
        <div class="_t"></div>
        <div class="_b"></div>
        <div class="_line"></div>
        <div class="_txt">二维码识别中</div>
      </div>
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
      isFromScan: false,
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
    if(this.$storage.local.get('openId')){
      this.getList()  
    }else{
      this.isFromScan = true
      this.$server.user.bind().then((response)=>{
        if(!response.data.openId){
          this.$mui.confirm('本次扫码失败，请尝试重新扫码！', '系统提示', ['返回扫码', '刷新试试'], (e)=>{
            if(e.index == 1){
              window.location.replace(this.$server.getGrantUrl(window.location.href))
            }
          })
        }else{
          this.$eventHub.$emit('APP-FOLLOW', response.data.isFollow)  
        }
      }).catch((error)=>{
        error.tips && this.$mui.alert(error.message)
      }).finally(()=>{
        this.isFromScan = false
        this.getList()
      })
    }
  }
}
</script>
<style scoped lang="less">
.l-scaning{
  position: absolute; top: 0; left: 0; z-index: 10001;
  height: 100%; width: 100%; background: rgba(0, 0, 0, 0.8); color: rgba(255, 255, 255, 0.9);
}
.l-scaning-box{
  /* background:#fff url(~assets/favicon.png) no-repeat 50% 50%; background-size: 50%;  */
  background: rgba(255, 255, 255, 0); 
  width: 6rem; height: 6rem; position: relative; color: rgba(255, 255, 255, 0.8); border: 1px solid rgba(255, 255, 255, 0.2);
  ._t, ._b{
    position: absolute; left: 0; right: 0;
  }
  ._t{top:0;}
  ._b{bottom:0;}

  ._t:before{
    content: ''; height: 0.5rem; width: 0.5rem; 
    border-left: 0.15rem solid #01ca01; border-top: 0.15rem solid #01ca01; 
    position: absolute; top: -0.1rem; left: -0.1rem; 
  }
  ._t:after{
    content: ''; height: 0.5rem; width: 0.5rem; 
    border-right: 0.15rem solid #01ca01; border-top: 0.15rem solid #01ca01; 
    position: absolute; top:-0.1rem; right: -0.1rem; 
  }

  ._b:before{
    content: ''; height: 0.5rem; width: 0.5rem; 
    border-left: 0.15rem solid #01ca01; border-bottom: 0.15rem solid #01ca01; 
    position: absolute; bottom:-0.1rem; left: -0.1rem; 
  }
  ._b:after{
    content: ''; height: 0.5rem; width: 0.5rem; 
    border-right: 0.15rem solid #01ca01; border-bottom: 0.15rem solid #01ca01; 
    position: absolute; bottom:-0.1rem; right: -0.1rem; 
  }
  ._line{
    background: linear-gradient(90deg, rgba(12, 154, 12, 0.2), #01ca01, rgba(12, 154, 12, 0.2)); 
    height: 0.1rem; border-radius: 50%; position: absolute; left: 5%; right: 5%; top: 0; z-index: 1;
    animation: lineScan 1s infinite alternate;
  }
  ._txt{
    text-align: center; font-size: 0.6rem; line-height: 6rem;
  }

  @keyframes lineScan{
    from { transform: translate3d(0, 0, 0) }
    to { transform: translate3d(0, 5.8rem, 0) }
  }
}
</style>