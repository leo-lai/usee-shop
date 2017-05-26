<template>
  <div class="l-page">
    <header class="mui-bar mui-bar-nav l-black" v-if="!$device.isWechat">
      <h1 class="mui-title">{{ $route.meta.title }}</h1>
    </header>
    <nav-tab></nav-tab>
    <div class="mui-content">
      <div class="l-card-me">
        <template v-if="userInfo">
          <div class="_bg" :style="{'background-image': 'url('+ userInfo.avatar +')'}"></div>
          <div class="_inner l-flex-hc">
            <template v-if="userInfo.phoneNumber">
              <div class="l-avatar l-margin-r" @click="previewImage" :style="{'background-image': 'url('+ (userInfo.avatar || defaultAvatar) +')'}"></div>
              <div class="l-rest" v-if="userInfo.phoneNumber">
                <h3>{{userInfo.userName || '小U用户'}}<i class="l-icon l-text-warn" v-show="userInfo.agentId == 1">&#xe604;</i></h3>
                <p>{{userInfo.phoneNumber}}</p>
              </div>
              <div v-if="userInfo.agentId == 1" class="l-icon l-fs-xl l-text-warn" @click="$link('/me/qrcode', 'page-in')">&#xe650;</div>
            </template>
            <template v-else>
              <div class="l-avatar" :style="{'background-image': 'url('+ defaultAvatar +')'}"></div>
              <div class="l-rest l-link-arrow l-padding l-text-right" style="margin-right:-0.75rem;" @click="$server.logout(false)">
                <span class="l-text-gray">您还没登录</span>
              </div>
            </template>
          </div>
        </template>
        <div class="l-loading-inline" v-if="loading" style="padding: 1.8rem 0;"><i class="mui-spinner"></i></div>
      </div>

      <div class="l-tab-imgtit l-border-t l-flex-hc">
        <a class="_item l-rest" @click="$link('/order/list?tab=1', 'page-in')">
          <p><img class="_icon" src="~assets/images/icon-008.png"></p>
          <p class="_txt">待付款</p>
        </a>
        <a class="_item l-rest" @click="$link('/order/list?tab=2', 'page-in')">
          <p><img class="_icon" src="~assets/images/icon-009.png"></p>
          <p class="_txt">待收货</p>
        </a>
        <a class="_item l-rest" @click="$link('/order/list?tab=3', 'page-in')">
          <p><img class="_icon" src="~assets/images/icon-010.png"></p>
          <p class="_txt">待评价</p>
        </a>
        <a class="_item l-rest" @click="$link('/order/list?tab=0', 'page-in')">
          <p><img class="_icon" src="~assets/images/icon-011.png"></p>
          <p class="_txt">全部订单</p>
        </a>
      </div>

      <!-- <div class="mui-row l-text-center l-bg-white l-border-t">
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
      </div> -->
      <div class="l-margin-tb">
        <ul class="mui-table-view mui-table-view-chevron">
          <li class="mui-table-view-cell">
            <router-link class="mui-navigate-right" to="/me/account">
              <span v-if="userInfo" class="_right-txt">{{userInfo.account | currency}}</span>
              账户余额
            </router-link>
          </li>
          <li class="mui-table-view-cell">
            <router-link class="mui-navigate-right" to="/me/xiaou">
              <span class="_right-txt l-text-gray">查看返利、客户信息</span>
              小U店员
            </router-link>
          </li>
          <li class="mui-table-view-cell" v-if="userInfo && userInfo.phoneNumber" @click="refreshUserInfo">
            <span class="_right-txt l-text-gray">头像和昵称</span>
            <p class="mui-navigate-right">同步微信信息</p>
          </li>
        </ul>

        <ul class="mui-table-view mui-table-view-chevron l-margin-t">
          <li class="mui-table-view-cell">
            <a class="mui-navigate-right" @click="$link('http://wx.ty-2009.com/CX/FW17/Index')">防伪查询</a>
          </li>
          <li class="mui-table-view-cell">
            <a class="mui-navigate-right" @click="$link('http://p.qiao.baidu.com/cps/chat?siteId=10424067&userId=23235048', 'page-in')">在线客服</a>
          </li>
          <li class="mui-table-view-cell">
            <a class="mui-navigate-right" @click="$link('/about', 'page-in')">关于U视一号</a>
          </li>
        </ul>

        <div v-if="userInfo && userInfo.phoneNumber" class="l-margin-tb l-text-center l-padding-btn l-bg-white l-link" @click="logout">退出登录</div>
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
    previewImage() {
      if(this.userInfo && this.userInfo.image){
        this.$server.previewImage([this.userInfo.image], 0)
      }
    },
    logout() {
      this.$mui.confirm('是否退出登录？', null, null, (e)=>{
        if(e.index == 1){
          this.$server.logout(false)
        }
      })
    },
    refreshUserInfo() {
      if(this.$device.isWechat){
        window.location.replace(this.$server.getGrantUrl('/me', undefined, 'snsapi_userinfo'))
      }else{
        this.$mui.toast('请使用微信浏览器打开')
      }
    },
    getUserInfo() {
      this.loading = true
      this.$server.user.getInfo(true).then(({data})=>{
        this.userInfo = data
      }).finally(()=>{
        this.loading = false
      })
    }
  },
  created() {
    if(this.$route.query.code && this.$device.isWechat){
      this.$mui.showWaiting('刷新中...')
      this.$server.user.resetWxInfo(this.$route.query.code).then(({data})=>{
        this.$mui.toast('同步成功')
        this.$storage.local.remove('qrcode_img')
        this.$router.replace('/me')
      }).finally(()=>{
        this.$mui.hideWaiting()
      })
    }
    this.getUserInfo()
  }
}
</script>
<style scoped lang="less">
.l-card-me{
  position:relative; z-index:0; padding-top: 0.75rem;margin-top: -0.75rem; overflow: hidden; background: #fff;
  ._bg {
    background: no-repeat 50% 50%; background-size: cover;
    position: absolute; left:0; top:0; width:100%; height: 100%;
    z-index: -1; /* filter: blur(1px); */
  }
  ._inner{
    position: relative; padding: 0.75rem;
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