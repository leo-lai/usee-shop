<template>
  <div class="l-page">
    <header class="mui-bar mui-bar-nav l-black" v-if="!$mui.os.wechat">
      <h1 class="mui-title">{{ $route.meta.title }}</h1>
      <a class="mui-icon mui-icon-arrowleft mui-pull-left _nav-back"></a>
    </header>
    <div class="mui-content l-bg-white">
      <div class="l-text-center">
        <img src="~assets/images/img-001.jpg" alt="">  
      </div>
      <div class="l-text-center l-margin-b">
        <p class="l-text-gray l-fs-s">累计返利</p>
        <p class="l-text-warn l-fs-xl"><b class="l-icon">&#xe6cb;</b>95270.22</p>
        <router-link class="mui-btn l-btn-main _m" to="/withdrawal" style="width:4.5rem;">提现</router-link>
      </div>
      <div class="l-text-center l-rebate-time l-margin-lr">
        <p class="_tit">返利流水</p>
        <div class="l-flex-hc l-border-t _time">
          <div class="l-rest">
            <p>起始时间</p>
            <p class="_date"><input type="date" v-model="startDate"></p>
          </div>
          <img class="l-block" style="width: 1rem; margin: 0 0.75rem;" src="~assets/images/icon-012.png" alt="">
          <div class="l-rest">
            <p>结束时间</p>
            <p class="_date"><input type="date" v-model="endDate"></p>
          </div>
        </div>
      </div>
      <div class="l-rebate-list">
        <div class="l-rebate-item l-border-t" v-for="item in 5">
          <p>
            <span class="l-text-warn mui-pull-right">返利中</span>
            订单编号：26155454545555
          </p>
          <p>购买时间：2016-02-02 10：53</p>
          <p>返利金额：<span class="l-text-warn l-margin-r"><b class="l-icon">&#xe6cb;</b>95270.22</span>购买人：胡杨树</p>
          <p>返利商品：U视喷喷</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      startDate: '2012-12-12',
      endDate: '2012-12-12'
    }
  },
  created() {
    
  }
}
</script>
<style scoped lang="less">
.l-rebate-time{
  color:#999; font-size: 0.75rem;
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