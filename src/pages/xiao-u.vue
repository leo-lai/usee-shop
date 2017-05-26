<template>
  <div class="l-page">
    <header class="mui-bar mui-bar-nav l-black" v-if="!$device.isWechat">
      <h1 class="mui-title">{{ $route.meta.title }}</h1>
      <a class="mui-icon mui-icon-arrowleft mui-pull-left _nav-back"></a>
    </header>
    <div class="mui-content">
      <template v-if="userInfo.agentId == 1">
        <div class="l-card-count l-text-center">
          <p class="l-fs-s">&nbsp;累计返利(元)</p>  
          <p style="font-size:2rem; margin: 0.5rem 0;">{{totalAmount | currency}}</p>
          <p><button style="background: transparent; border-color: #fff;" class="mui-btn l-btn-main _m" @click="$link('/me/rebate', 'page-in')">查看返利流水</button></p>
        </div>
        <div class="l-flex-hc l-bg-white l-text-center" style="padding: 1rem 0;">
          <div class="l-rest" @click="$link('/me/customer', 'page-in')">
            <p class="l-fs-m">客户数量</p>
            <p class="l-fs-xl">{{userInfo.customerNum}}</p>
          </div>
          <!-- <div class="l-rest">
            <p>销售套数</p>
            <p>0</p>
          </div> -->
        </div>
        <ul class="mui-table-view mui-table-view-chevron l-margin-t">
          <li class="mui-table-view-cell" @click="notify">
            <span class="mui-navigate-right">微信消息推送</span>
            <div class="mui-switch" :class="{'mui-active': isNotice}">
              <div class="mui-switch-handle"></div>
            </div>
          </li>
        </ul>
        <div class="l-margin l-fs-s l-text-gray" style="margin-top:0.25rem;">开启消息推送您将收到客户关注及购买返利等微信消息推送</div>

      </template>
      <not-u v-else-if="userInfo.agentId != 1"></not-u>
      <div class="l-loading-inline" v-if="loading" style="padding: 1.8rem 0;"><i class="mui-spinner"></i></div>
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
      isNotice: false,
      loading: false,
      totalAmount: 0,
      userInfo: {
        account: 0,
        customerNum: 0,
      }
    }
  },
  methods: {
    notify() {
      this.isNotice = !this.isNotice
      this.$mui.showWaiting()
      this.$server.user.notify(Number(this.isNotice)).then(({data})=>{
        if(!data){
          this.$mui.confirm('接收消息通知需要绑定微信，请授权同步微信信息', '开启通知失败', ['取消', '绑定'], (e)=>{
            if(e.index == 1){
              this.refreshUserInfo()
            }
          })
          this.isNotice = !this.isNotice  
        }
      }).catch(()=>{
        this.isNotice = !this.isNotice
      }).finally(()=>{
        this.$mui.hideWaiting()
      })
    }
  },
  created() {
    this.loading = true
    this.$server.user.getInfo().then(({data})=>{
      this.userInfo = data
      this.isNotice = data.notify == 0 ? false : true
    }).finally(()=>{
      this.loading = false
    })
  }
}
</script>
<style scoped lang="less">
.l-card-count{
  padding: 1.5rem 0; color: #fff;
  background: url('~assets/images/xiao-u-bg.jpg') no-repeat 50% 50%;
  background-size: 110% 110%;
}

</style>