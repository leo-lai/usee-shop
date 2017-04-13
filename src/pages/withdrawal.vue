<template>
  <div class="l-page">
    <header class="mui-bar mui-bar-nav l-black" v-if="!$mui.os.wechat">
      <h1 class="mui-title">{{ $route.meta.title }}</h1>
      <a class="mui-icon mui-icon-arrowleft mui-pull-left _nav-back"></a>
    </header>
    <footer class="mui-bar mui-bar-footer l-flex-hc l-transparent">
      <button type="button" class="mui-btn l-btn-main">提交</button>
    </footer>
    <div class="mui-content">
      <div class="l-panel-group l-form l-margin-b">
        <div class="_item l-flex-hc">
          <label class="_tit">账户余额</label>
          <div class="_ipt l-rest">
            <input type="number" maxlength="5" value="2131.22" readonly>
          </div>
        </div>
        <div class="_item l-flex-hc">
          <label class="_tit">提现金额</label>
          <div class="_ipt l-rest">
            <input type="number" step="0.01" maxlength="5" placeholder="请输入提现金额">
          </div>
          <a class="l-fs-m l-margin-l-m">全部提现</a>
        </div>
      </div>
      <div class="l-panel-group l-form l-margin-b">
        <div class="_item l-flex-hc">
          <label class="_tit">收款人姓名</label>
          <div class="_ipt l-rest">
            <input type="text" placeholder="请输入收款人姓名" maxlength="50" >
          </div>
        </div>
        <div class="_item l-flex-hc">
          <label class="_tit">收款账户</label>
          <div class="_ipt l-rest">
            <input type="tel" placeholder="请输入收款账户" maxlength="20" >
          </div>
        </div>
        <div class="_item l-flex-hc">
          <label class="_tit">银行名称</label>
          <div class="_ipt l-rest">
            <input type="text" placeholder="请输入银行名称" maxlength="20" >
          </div>
        </div>
        <div class="_item l-flex-hc">
          <label class="_tit">银行支行</label>
          <div class="_ipt l-rest">
            <input type="text" placeholder="请输入银行支行" maxlength="20" >
          </div>
        </div>
      </div>
      <div class="l-bg-white l-zoom l-margin-b">
        <h3 class="l-margin l-text-center">提现说明</h3>
        <ul class="l-fs-s">
          <li>每次最低提现金额为100元，最高提现金额为3000元</li>
          <li>提现申请工作人员将于每周二9:00-17:00做统一打款处理</li>
          <li class="l-text-error">请仔细填写并核对提现资料的正确性，如果发现提交的资料有误请及时联系客服(400-180-6900)</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      formData: {

      }
    }
  },
  created() {
    
  }
}
</script>
<style scoped lang="less">
ul{padding: 0 0.75rem 0 1.75rem;list-style-type: decimal;}
</style>