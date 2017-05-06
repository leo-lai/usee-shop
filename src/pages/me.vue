<template>
  <div class="l-page">
    <header class="mui-bar mui-bar-nav l-black" v-if="!$mui.os.wechat">
      <h1 class="mui-title">{{ $route.meta.title }}</h1>
    </header>
    <nav-tab></nav-tab>
    <div class="mui-content">
      <div class="l-card-me">
        <template v-if="userInfo">
          <div class="_bg" :style="{'background-image': 'url('+ userInfo.avatar +')'}"></div>
          <div class="_inner l-flex-hc">
            <div class="l-rest">
              <template v-if="userInfo.phoneNumber">
                <h3>{{userInfo.userName || '小U用户'}}<i class="l-icon l-text-warn" v-show="userInfo.agentId == 1">&#xe604;</i></h3>
                <p>{{userInfo.phoneNumber}}</p>
              </template>
              <span v-else class="l-link-arrow l-padding" @click="$server.logout(false)">您还没登录</span>
            </div>
            <div class="l-avatar" :style="{'background-image': 'url('+ (userInfo.avatar || defaultAvatar) +')'}"></div>
            <div class="_ft l-flex-hc">
              <router-link class="l-rest l-border-r" to="/me/account">账户余额：{{userInfo.account | currency}}</router-link>
              <router-link class="l-rest" to="/me/customer">累计客户：{{userInfo.customerNum || 0}}</router-link>
            </div>
          </div>
        </template>
        <div class="l-loading-inline" v-show="loading" style="padding: 1.8rem 0;"><i class="mui-spinner"></i></div>
      </div>
      <div class="mui-row l-text-center l-bg-white l-border-t">
        <!-- <router-link class="l-text-default mui-col-sm-4 mui-col-xs-4 l-padding l-link" to="/shop/car">
          <p>
            <span class="l-rel">
              <i class="mui-badge mui-badge-danger l-abs" style="left: 1.4rem;">{{shopcarNumber > 99 ? '99+' : shopcarNumber}}</i>
            </span>
            <img style="height: 2rem;" src="~assets/images/icon-004.png" alt="">
          </p>
          <p class="l-margin-t-xs l-fs-m">购物车</p>
        </router-link> -->
        <!-- <router-link class="l-text-default mui-col-sm-4 mui-col-xs-4 l-padding l-link" to="/order/list">
          <p>
            <img style="height: 2rem;" src="~assets/images/icon-005.png" alt="">
          </p>
          <p class="l-margin-t-xs l-fs-m">我的订单</p>
        </router-link> -->
        <router-link class="l-text-default mui-col-sm-4 mui-col-xs-4 l-padding l-link" to="/me/account">
          <p>
            <img style="height: 2rem;" src="~assets/images/icon-015.png" alt="">
          </p>
          <p class="l-margin-t-xs l-fs-m">我的账户</p>
        </router-link>
        <router-link class="l-text-default mui-col-sm-4 mui-col-xs-4 l-padding l-link" to="/me/rebate">
          <p>
            <img style="height: 2rem;" src="~assets/images/icon-014.png" alt="">
          </p>
          <p class="l-margin-t-xs l-fs-m">我的返利</p>
        </router-link>
        <router-link class="l-text-default mui-col-sm-4 mui-col-xs-4 l-padding l-link" to="/me/customer">
          <p>
            <img style="height: 2rem;" src="~assets/images/icon-013.png" alt="">
          </p>
          <p class="l-margin-t-xs l-fs-m">我的客户</p>
        </router-link>
      </div>
      <div class="l-margin-tb">
        <ul class="mui-table-view mui-table-view-chevron">
          <li class="mui-table-view-cell">
            <router-link class="mui-navigate-right" to="/order/list">我的订单</router-link>
          </li>
          <li class="mui-table-view-cell">
            <router-link class="mui-navigate-right" to="/me/qrcode">我的二维码</router-link>
          </li>
          <!-- <li class="mui-table-view-cell">
            <router-link class="mui-navigate-right" to="/antifake">防伪查询</router-link>
          </li> -->
          <li class="mui-table-view-cell">
            <div class="mui-navigate-right" @click="$link('http://wx.ty-2009.com/CX/FW17')">防伪查询</div>
          </li>
          <!-- <li class="mui-table-view-cell l-disabled">
            <a class="mui-navigate-right" @click="$mui.coding">我的预约</a>
          </li>
          <li class="mui-table-view-cell l-disabled">
            <a class="mui-navigate-right" @click="$mui.coding">我的疗程</a>
          </li>
          <li class="mui-table-view-cell l-disabled">
            <a class="mui-navigate-right" @click="$mui.coding">我的报告</a>
          </li>
          <li class="mui-table-view-cell l-disabled">
            <a class="mui-navigate-right" @click="$mui.coding">我的验光单</a>
          </li> -->
        </ul>

        <ul class="mui-table-view mui-table-view-chevron l-margin-t">
          <li class="mui-table-view-cell">
            <a class="mui-navigate-right" @click="$link('/me/setting', 'page-in')">系统设置</a>
          </li>
        </ul>

        <ul class="mui-table-view mui-table-view-chevron l-margin-t">
          <li class="mui-table-view-cell">
            <a class="mui-navigate-right" @click="$link('/about', 'page-in')">关于U视一号</a>
          </li>
        </ul>
      </div>
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
      defaultAvatar: require('assets/images/avatar.jpg'),
      shopcarNumber: 0,
      userInfo: null
    }
  },
  methods: {
    logout() {
      this.$mui.confirm('是否退出登录？', null, null, (e)=>{
        if(e.index == 1){
          this.$server.logout(false)
        }
      })
    }
  },
  created() {
    this.loading = true
    this.$server.user.getInfo(true).then(({data})=>{
      this.userInfo = data
    }).finally(()=>{
      this.loading = false
    })

    this.$server.shopcar.getNum().then(({data})=>{
      this.shopcarNumber = data
    })
  }
}
</script>
<style scoped lang="less">
.l-card-me{
  position:relative; z-index:0; padding-top: 0.75rem;margin-top: -0.75rem; overflow: hidden; min-height: 6.85rem; background: #fff;
  ._bg {
    background: no-repeat 50% 50%; background-size: cover;
    position: absolute; left:0; top:0; width:100%; height: 100%;
    z-index: -1; /* filter: blur(1px); */
  }
  ._inner{
    position: relative; padding: 0.75rem 1rem 2.35rem;
    .l-icon{ vertical-align: super;  font-size: 0.7rem; margin-left: 5px;}
  }
  ._ft{
    position: absolute; left: 0; right: 0; bottom: 0; background: linear-gradient(45deg, rgba(255, 120, 78, 0.8), rgba(244, 82, 78, 0.8));
    font-size: 0.7rem; color:#fff; text-align: center; padding: 0.25rem 0;
    a{color: #fff;}
  }
}
.l-card-me:before{
  content: ''; position: absolute; left:0; top:0; width:100%; height: 100%;
  background-color: rgba(255,255,255, 0.8);
}
</style>