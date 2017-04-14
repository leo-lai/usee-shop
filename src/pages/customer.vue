<template>
  <div class="l-page">
    <header class="mui-bar mui-bar-nav l-black" v-if="!$mui.os.wechat">
      <h1 class="mui-title">{{ $route.meta.title }}</h1>
      <a class="mui-icon mui-icon-arrowleft mui-pull-left _nav-back"></a>
    </header>
    <div class="mui-content l-bg-white">
      <template v-if="userInfo.agentId == 1">
        <div class="l-card-count l-text-center">
          <p class="l-fs-s">&nbsp;累计有效客户</p>  
          <p class="l-fs-xl">86565.22</p>
        </div>
        <div class="l-padding l-fs-s" style="background:#efeff4;">
          说明：客户扫码登录后需要购买指定商品才能与您成功绑定关系，已经被绑定的客户无法再次被绑定。
        </div>
        <div class="l-tab-customer">
          <div class="_tit l-border-b l-flex-hvc l-sticky">
            <div class="_item" :class="{'_active': tabIndex == 1}" @click="tabClick(1)">
              <i class="l-icon l-text-ok">&#xe626; </i>成功绑定
            </div>
            <div class="_item" :class="{'_active': tabIndex == 2}" @click="tabClick(2)">
              <i class="l-icon l-text-error">&#xe605; </i>未成功绑定
            </div>
          </div>
          <div class="l-customer-list" v-show="tabIndex == 1">
            <div class="_item l-border-b" v-for="item in 10">
              <p>微信昵称：无赖君子</p>
              <p>绑定时间：2012-12-12 12:12:12</p>
              <p>客户来源：用户扫码登录并成功购买商品</p>
            </div>
          </div>
          <div class="l-customer-list" v-show="tabIndex == 2">
            <div class="_item l-border-b" v-for="item in 5">
              <p>微信昵称：无赖君子</p>
              <p>绑定时间：2012-12-12 12:12:12</p>
              <p>失败原因：用户是其他小U店员客户</p>
            </div>
          </div>
        </div>
      </template>
      <not-u v-else></not-u>
    </div>
  </div>
</template>
<script>
import notU from 'components/not-u'

export default {
  components: {
    notU
  },
  data () {
    return {
      userInfo: {},
      tabIndex: 1
    }
  },
  methods: {
    tabClick(index = 1) {
      this.tabIndex = index
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
      padding: 0.5rem 1.4rem 0.5rem 1rem; 
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