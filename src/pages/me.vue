<template>
  <div class="l-page">
    <header class="mui-bar mui-bar-nav l-black" v-if="!$mui.os.wechat">
      <h1 class="mui-title">{{ $route.meta.title }}</h1>
      <!-- <a class="mui-icon mui-icon-arrowleft mui-pull-left"></a> -->
      <!-- <a class="mui-icon mui-icon-bars mui-pull-right"></a> -->
    </header>
    <nav-tab></nav-tab>
    <div class="mui-content">
      <div class="l-card-me">
        <div class="_bg" :style="{'background-image': 'url('+ userInfo.avator +')'}"></div>
        <div class="_inner l-flex-hc">
          <div class="l-rest">
            <h3>用户昵称</h3>
            <p>13800138000</p>
          </div>
          <div class="l-avatar" :style="{'background-image': 'url('+ userInfo.avator +')'}"></div>
        </div>
      </div>
      <div class="mui-row l-text-center l-bg-white l-border-t">
        <router-link class="l-text-default mui-col-sm-6 mui-col-xs-6 l-padding l-link" to="/shop/car">
          <p><img style="height: 2rem;" src="~assets/images/icon-004.png" alt=""></p>
          <p class="l-margin-t-xs l-fs-m">购物车</p>
        </router-link>
        <a class="l-text-default mui-col-sm-6 mui-col-xs-6 l-padding l-link">
          <p><img style="height: 2rem;" src="~assets/images/icon-005.png" alt=""></p>
          <p class="l-margin-t-xs l-fs-m">我的报告</p>
        </a>
      </div>

      <div class="l-margin-tb">
        <ul class="mui-table-view mui-table-view-chevron">
          <li class="mui-table-view-cell">
            <router-link class="mui-navigate-right" to="/order/list">我的订单</router-link>
          </li>
          <li class="mui-table-view-cell">
            <a class="mui-navigate-right">我的预约</a>
          </li>
          <li class="mui-table-view-cell">
            <a class="mui-navigate-right">我的疗程</a>
          </li>
          <li class="mui-table-view-cell">
            <a class="mui-navigate-right">我的验光单</a>
          </li>
        </ul>
      </div>

      <div class="l-margin-tb l-text-center l-padding-tb-m l-bg-white l-text-gray l-link" @click="logout">退出登录</div>
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
      userInfo: {
        avator: require('assets/images/avatar.jpg')
      }
    }
  },
  methods: {
    logout() {
      this.$mui.confirm('是否退出登录？', null, null, (e)=>{
        if(e.index == 1){
          this.$router.push('/login')
        }
      })
    }
  },
  created() {

  }
}
</script>
<style scoped lang="less">
.l-card-me{
  position:relative; z-index:0; padding-top: 0.75rem;margin-top: -0.75rem; overflow: hidden;
  ._bg {
    background: no-repeat 50% 50%; background-size: cover;
    position: absolute; left:0; top:0; width:100%; height: 100%;
    z-index: -1; filter: blur(10px);
  }
  ._inner{
    position: relative; padding: 1.2rem 1rem;
  }
}
.l-card-me:before{
  content: ''; position: absolute; left:0; top:0; width:100%; height: 100%;
  background-color: rgba(255,255,255, 0.8);
}
</style>