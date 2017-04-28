<template>
  <div class="l-page-group">
    <div class="l-page">
      <header class="mui-bar mui-bar-nav l-black" v-if="!$mui.os.wechat">
        <h1 class="mui-title">{{ $route.meta.title }}</h1>
        <a class="mui-icon mui-icon-arrowleft mui-pull-left _nav-back"></a>
      </header>
      <div class="mui-content">
        <div class="l-margin-tb">
          <ul class="mui-table-view mui-table-view-chevron">
            <li class="mui-table-view-cell" @click="refreshUserInfo">
              <span class="mui-navigate-right">刷新个人信息</span>
            </li>
            <li class="mui-table-view-cell" @click="notify">
              <span class="mui-navigate-right">接收消息通知</span>
              <div class="mui-switch" :class="{'mui-active': isNotice}">
                <div class="mui-switch-handle"></div>
              </div>
            </li>
          </ul>

          <ul class="mui-table-view mui-table-view-chevron l-margin-t">
            <li class="mui-table-view-cell" @click.stop="$pageTo('#page-about', '关于U视一号')">
              <span class="mui-navigate-right">关于U视一号</span>
            </li>
          </ul>

          <div class="l-margin-tb l-text-center l-padding-btn l-bg-white l-link" @click="logout">退出登录</div>

        </div>
      </div>
    </div>
    <div class="l-page" id="page-about">
      <header class="mui-bar mui-bar-nav l-black" v-if="!$mui.os.wechat">
        <h1 class="mui-title">关于U视一号</h1>
        <a class="mui-icon mui-icon-arrowleft mui-pull-left _nav-back"></a>
      </header>
      <div class="mui-content">
        <div class="l-about-item">
          <h3 class="_tit">公司介绍</h3>
          <div class="_cont">
            <p>“U视一号”创办于2016年12月，是由贵州U视一号生物科技有限公司运营的高端视力健康管理品牌。</p>
            <p>U视一号”作为专业的视力健康管理及体验机构，拥有一个由国内各大中医药院校教授、博士组成的核心技术团队，他们以传统中医基础理论为指导，探寻中医明目古方古法，研究中医调理视力问题之机理，结合应用国际先进的视觉训练方式，融合视光学、经络腧穴学、心理学，项目经广东省中管局批准立项、历经3年临床双盲试验后成果成功推向市场。</p>
            <p>经过多年的蕴育与成长，U视一号视力健康体验、改善及训练服务得到越来越多家长和会员的实践认可与口碑传播。</p>
          </div>
        </div>
        <div class="l-about-item l-margin-t">
          <h3 class="_tit">公司产品</h3>
          <div class="_cont">
            <ul>
              <li>近视调理型产品：明目贴、体质贴</li>
              <li>智慧护眼仪</li>
              <li>眼贴系列</li>
              <li>喷喷系列</li>
            </ul>            
          </div>
        </div>
        <div class="l-about-item l-margin-t">
          <h3 class="_tit">公司地址</h3>
          <div class="_cont l-text-center">广州市天河区陶庄路五号空间3F009</div>
        </div>
        <div class="l-about-contact">
          <h3>联系方式</h3>
          <p>客服电话：020-85655842</p>
          <p>服务时间：9:00-18:00</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  data () {
    return {
      isNotice: true,
      userInfo: {}
    }
  },
  methods: {
    notify() {
      this.isNotice = !this.isNotice
      this.$mui.showWaiting()
      this.$server.user.notify(Number(this.isNotice)).then(({data})=>{
        if(!data){
          this.$mui.confirm('接收消息通知需要绑定微信，请刷新个人信息授权获取微信信息', '开启通知失败', ['取消', '绑定'], (e)=>{
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
    },
    refreshUserInfo() {
      if(this.$device.isWechat){
        window.location.replace(this.$server.getGrantUrl('/me/setting', '', 'snsapi_userinfo'))
      }else{
        this.$mui.toast('请使用微信浏览器打开')
      }
    },
    logout() {
      this.$mui.confirm('是否退出登录？', null, null, (e)=>{
        if(e.index == 1){
          this.$server.logout(false, '/me')
        }
      })
    }
  },
  created() {
    if(this.$route.query.code && this.$device.isWechat){
      this.$mui.showWaiting('刷新中...')
      this.$server.user.resetWxInfo(this.$route.query.code).then(({data})=>{
        this.$mui.toast('刷新个人信息成功')
        this.$link('/me', 'page-out', 'replace')
      }).finally(()=>{
        this.$mui.hideWaiting()
      })
    }

    this.loading = true
    this.$server.user.getInfo().then(({data})=>{
      this.isNotice = data.notify == 0 ? false : true
    }).finally(()=>{
      this.loading = false
    })
  }
}
</script>
<style scoped lang="less">
.l-about-contact{
  background: url(~assets/images/layout-003.jpg) no-repeat 50% 50%; background-size: 100% 100%;
  text-align: center; color: #fff; padding: 1rem 0;
  h3{margin-bottom: 0.375rem;}
  h3:after{
    content: ''; display: block; width: 1rem; margin:0.125rem auto 0; height: 0.1rem; background: #fff;
  }
  p{font-size: 0.75rem; text-align: left; width: 9rem; margin: auto;}
}
.l-about-item{
  overflow: hidden; background: #fff; padding: 0.5rem 0;
  ._tit{
    text-align: center; color: #ff784e; margin: 0.75rem 0;
  }
  ._tit:after{
    content: ''; display: block; width: 1rem; margin:0.125rem auto 0; height: 0.1rem; background: #ff784e;
  }
  ._cont{
    margin: 0.75rem; font-size: 0.75rem;
    p{text-indent: 2rem;}
    ul{ list-style-type: decimal; padding: 0 0 0 1rem; }
  }
}
</style>