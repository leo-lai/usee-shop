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
        <span :class="{'_active': type === 1}" @click="sltType(1)">密码登录</span>
        <span :class="{'_active': type === 2}" @click="sltType(2)">短信登录</span>
      </div>
      <!-- 密码登录 -->
      <div class="l-login-form" v-show="type === 1">
        <div class="_tr l-flex-hc l-border-b">
          <i class="l-icon">&#xe613;</i>
          <div class="l-rest mui-input-row">
            <input type="tel" class="mui-input-clear" maxlength="11"  placeholder="请输入手机号">
          </div>
        </div>
        <div class="_tr l-flex-hc l-border-b">
          <i class="l-icon">&#xe616;</i>
          <div class="l-rest mui-input-row">
            <input type="password" class="mui-input-password" maxlength="50" placeholder="请输入密码">
          </div>
        </div>
        <div class="_btn">
          <button type="button" class="mui-btn l-btn-main">登录</button>
        </div>
      </div>
      <!-- 短信登录 -->
      <div class="l-login-form" v-show="type === 2">
        <div class="_tr l-flex-hc l-border-b">
          <i class="l-icon">&#xe613;</i>
          <div class="l-rest mui-input-row">
            <input type="tel" class="mui-input-clear" maxlength="11"  placeholder="请输入手机号">
          </div>
        </div>
        <div class="_tr l-flex-hc l-border-b">
          <i class="l-icon">&#xe62f;</i>
          <div class="l-rest mui-input-row">
            <input type="tel" maxlength="5" placeholder="请输入短信验证码">
          </div>
          <button class="mui-btn mui-btn-link">获取验证码</button disabled>
        </div>
        <div class="_btn">
          <button type="button" class="mui-btn l-btn-main">登录</button>
        </div>
      </div>
      
      <!-- 注册、忘记密码 -->
      <div class="l-text-center l-fs-m l-text-gray">
        <router-link class="l-text-gray" to="/register">快速注册</router-link>
        <span class="l-fs-xs l-margin-s" style="vertical-align:2px;">|</span>
        <router-link class="l-text-gray" to="/forgot">忘记密码</router-link>
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
      type: 1
    }
  },
  methods: {
    sltType(type = 1) {
      this.type = type
    }
  },
  created() {
    
  },
  mounted() {
    this.$mui('.l-login-form input').input();
  }
}
</script>
<style scoped lang="less">
.l-login-tab{
  border-bottom:1px solid rgba(255, 120, 78, 1); overflow: hidden; margin:0 1.5rem;
  span{
    float: left; border-radius: 5px 5px 0 0;
    font-size: 0.75rem; padding: 0.25rem 1rem;
  }
  span._active{background-color: rgba(255, 120, 78, 1); color: #fff;}
}
</style>