<template>
  <div class="l-page">
    <header class="mui-bar mui-bar-nav l-black" v-if="!$mui.os.wechat">
      <h1 class="mui-title">{{ $route.meta.title }}</h1>
      <a class="mui-icon mui-icon-arrowleft mui-pull-left _nav-back"></a>
    </header>
    <div class="mui-content l-bg-white">
      <template v-if="userInfo.agentId == 1">
        <div class="l-card-count l-text-center">
          <p class="l-fs-s">&nbsp;累计返利</p>  
          <p class="l-fs-xl"><b class="l-icon">&#xe6cb;</b>86565.22</p>
        </div>
        <div class="l-text-center l-rebate-time l-border-b l-sticky l-bg-white">
          <div class="l-flex-hc _time">
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
            <p><span class="l-text-warn mui-pull-right">返利中</span>订单编号：26155454545555</p>
            <p>购买时间：2016-02-02 10：53</p>
            <p>购买客户：胡杨树</p>
            <p>返利商品：U视喷喷</p>
            <p>返利金额：<span class="l-text-warn l-margin-r"><b class="l-icon">&#xe6cb;</b>95270.22</span></p>
          </div>
        </div> 
      </template>
      <not-u v-else></not-u>
    </div>
  </div>
</template>
<script>
import notU from 'components/not-u'
let now = new Date()
export default {
  components: {
    notU
  },
  data () {
    return {
      startDate: new Date(now.setMonth(now.getMonth()-3)).format('yyyy-MM-dd'),
      endDate: new Date().format('yyyy-MM-dd'),
      userInfo: {}
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
    input{
      display: inline-block; width: auto;  margin: auto;
      border:none; border-bottom: 1px solid #ff784e; border-radius: 0; text-align: center; font-size: 0.7rem;
    }
  }
}
.l-rebate-item{margin:0 0.75rem; padding: 0.75rem 0; font-size: 0.7rem; color: #999;}

</style>