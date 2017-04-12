<template>
  <div class="l-page">
    <header class="mui-bar mui-bar-nav l-black" v-if="!$mui.os.wechat">
      <h1 class="mui-title">{{ $route.meta.title }}</h1>
      <a class="mui-icon mui-icon-arrowleft mui-pull-left _nav-back"></a>
    </header>
    <div class="mui-content l-bg-white">
      <div class="l-login-title">
        <span>欢迎登录U视一号</span>
        <i class="l-text-warn">™</i>
      </div>
      <div class="l-login-tab">
        <span :class="{'_active': loginType === 2}" @click="sltType(2)">短信登录</span>
        <span :class="{'_active': loginType === 1}" @click="sltType(1)">密码登录</span>
      </div>
      <!-- 密码登录 -->
      <div class="l-login-form" v-show="loginType === 1">
        <div class="_tr l-flex-hc l-border-b">
          <i class="l-icon">&#xe613;</i>
          <div class="l-rest mui-input-row">
            <input class="mui-input-clear" type="tel" pattern="[0-9]*" value="1" step="1" min="1" maxlength="11" v-model="formData.phoneNumber" placeholder="请输入手机号码">
          </div>
        </div>
        <div class="_tr l-flex-hc l-border-b">
          <i class="l-icon">&#xe616;</i>
          <div class="l-rest mui-input-row">
            <input type="password" v-model="formData.password" class="mui-input-password" maxlength="50" placeholder="请输入密码">
          </div>
        </div>
      </div>
      <!-- 短信登录 -->
      <div class="l-login-form" v-show="loginType === 2">
        <div class="_tr l-flex-hc l-border-b">
          <i class="l-icon">&#xe613;</i>
          <div class="l-rest mui-input-row">
            <input class="mui-input-clear" type="tel" pattern="[0-9]*" value="1" step="1" min="1" maxlength="11" v-model="formData.phoneNumber" placeholder="请输入手机号码">
          </div>
        </div>
        <div class="_tr l-flex-hc l-border-b">
          <i class="l-icon">&#xe62f;</i>
          <div class="l-rest mui-input-row">
            <input type="tel" pattern="[0-9]*" value="1" step="1" min="1" maxlength="5" v-model="formData.phoneCode" placeholder="请输入短信验证码">
          </div>
          <button ref="sendBtn" class="mui-btn mui-btn-link" @click="sendAuthCode">获取验证码</button>
        </div>
      </div>
      <div class="l-login-btn">
        <button type="button" class="mui-btn l-btn-main" :disabled="submiting" @click="submit">登录</button>
      </div>
      
      <!-- 注册、忘记密码 -->
      <div class="l-text-center l-fs-m l-text-gray">
        <span class="l-text-gray" @click="register">快速注册</span>
        <span class="l-fs-xs l-margin-s" style="vertical-align:2px;">|</span>
        <router-link class="l-text-gray" to="/forgot">忘记密码</router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      loginType: 2,    // 1密码登录 2短信登录
      submiting: false,
      formData: {
        phoneNumber: '',
        phoneCode: '',
        code: ''
      }
    }
  },
  methods: {
    sltType(type = 1) {
      this.loginType = type
      this.$storage.local.set('loginType', type)
    },
    sendAuthCode: function(){ 
      this.$server.sendMobiCode(this.formData.phoneNumber, this.$refs.sendBtn)
      .then((response)=>{
        if(response.data){
          // this.formData.phoneCode = response.data
        }
      })
    },
    register() {
      if(this.$device.isWechat){
        window.location.replace(this.$server.getGrantUrl('/register'))
      }else{
        this.$link('/register', 'page-in')
      }
    },
    submit() {
      if(!this.formData.phoneNumber){
        this.$mui.toptip('请输入手机号码')
        return
      }
      if(this.loginType == 1){
        if(!this.formData.password){
          this.$mui.toptip('请输入密码')
          return
        }
      }else{
        this.formData.code = this.$route.query.code || ''
        if(!this.formData.phoneCode){
          this.$mui.toptip('请输入手机验证码')
          return
        }
      }

      this.submiting = true
      this.$mui.showWaiting()
      this.$server.login(this.loginType, this.formData).then(({data})=>{
        this.$mui.toast('登录成功')
        this.$storage.local.set('sessionId', data.sessionId)
        this.$router.replace('/index' || this.$route.query.to)
      }).finally(()=>{
        this.submiting = false
        this.$mui.hideWaiting()
      })
    }
  },
  created() {
    this.$storage.local.remove('sessionId')
    if(this.$device.isWechat && !this.$route.query.code){
      this.$mui.toast('微信授权失败')
      // this.$server.getGrantUrl('/login', this.$route.query)
    }
  },
  mounted() {
    this.loginType = this.$storage.local.get('loginType') || 2
    this.$nextTick(()=>{
      this.$mui('.l-login-form input').input();  
    })
  }
}
</script>
<style scoped lang="less">
.l-login-btn{margin: 1.5rem;}
.l-login-tab{
  border-bottom:1px solid rgba(255, 120, 78, 1); overflow: hidden; margin:0 1.5rem;
  span{
    float: left; border-radius: 5px 5px 0 0;
    font-size: 0.75rem; padding: 0.25rem 1rem;
  }
  span._active{background-color: rgba(255, 120, 78, 1); color: #fff;}
}
</style>