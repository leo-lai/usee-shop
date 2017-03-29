<template>
  <div class="l-page">
    <header class="mui-bar mui-bar-nav l-black" v-if="!$mui.os.wechat">
      <h1 class="mui-title">{{ $route.meta.title }}</h1>
      <a class="mui-icon mui-icon-arrowleft mui-pull-left _nav-back"></a>
    </header>
    <div class="mui-content l-bg-white">
      <div class="l-login-form">
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
          <button disabled class="mui-btn mui-btn-link">获取验证码</button disabled>
        </div>
        <div class="_tr l-flex-hc l-border-b">
          <i class="l-icon">&#xe616;</i>
          <div class="l-rest mui-input-row">
            <input type="password" class="mui-input-password" maxlength="50" placeholder="请输入新密码">
          </div>
        </div>
        <div class="_btn">
          <button type="button" class="mui-btn l-btn-main">提交</button>
        </div>
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
    }
  },
  methods: {
    
  },
  created() {
    
  },
  mounted() {
    this.$mui('.l-login-form input').input();
  }
}
</script>
<style scoped lang="less">

</style>