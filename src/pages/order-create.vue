<template>
  <div class="l-page-group">
    <div class="l-page" id="page-main">
      <header class="mui-bar mui-bar-nav l-black" v-if="!$mui.os.wechat">
        <h1 class="mui-title">{{ $route.meta.title }}</h1>
        <a class="mui-icon mui-icon-arrowleft mui-pull-left _nav-back"></a>
      </header>
      <footer class="mui-bar mui-bar-footer l-flex-hc l-padding-lr">
        <div class="l-rest">
          需付款：<span class="l-text-warn"><b class="l-icon">&#xe6cb;</b>268.00</span>
        </div>
        <div class="_btn">
          <button type="button" style="width: 6rem;" class="mui-btn l-btn-main _inner l-margin-l-m"  @click="orderSubmit">提交订单</button>
        </div>
      </footer>
      <div class="mui-content">
        <!-- 选择收货地址 -->
        <div class="l-bg-white" @click="$pageTo('#page-address-list', '选择收货地址')">
          <div class="l-flex-hc l-padding l-link-arrow">
            <img class="l-thumb-s l-margin-r-s" src="~assets/images/icon-006.png">
            <div class="l-rest l-fs-s">
              <p class="l-margin-b-xs">
                <span class="mui-pull-right">18602029524</span>
                <span>收货人：赖国聪</span>
              </p>
              <p class="l-lh-s">收货地址：广东省广州市天河区5号空间广东省广州市天河区5号空间</p>
            </div>
          </div>
          <div class="l-line-color"></div>  
        </div>
        <!-- 购买商品信息 -->
        <div class="l-padding-btn l-margin-t l-bg-white">
          <span>购买的商品</span>
        </div>
        <div class="l-panel-group l-border-tb l-margin-b">
          <div class="_item l-flex-hc">
            <div class="l-thumb l-bg-contain l-margin-r" style="background-image: url('http://placeholdit.imgix.net/~text?txtsize=33&bg=ff784e&txtclr=fff&txt=thumb&w=120&h=120')"></div>
            <div class="l-rest l-fs-s">
              <p class="l-text-wrap2">Lamp C091Lamp C091LampLamp C091Lamp C091LampLamp C091Lamp C091LampLamp C091Lamp C091Lamp </p>
              <div class="l-margin-m1">
                <span class="l-text-gray mui-pull-right">颜色：苹果红</span>
                <span class="l-text-warn"><b class="l-icon">&#xe6cb;</b>268.00</span>
                <span class="l-text-gray">x3</span>
              </div>
            </div>
          </div>
          <div class="_item l-flex-hc">
            <div class="l-thumb l-bg-contain l-margin-r" style="background-image: url('http://placeholdit.imgix.net/~text?txtsize=33&bg=ff784e&txtclr=fff&txt=thumb&w=120&h=120')"></div>
            <div class="l-rest l-fs-s">
              <p class="l-text-wrap2">Lamp C091Lamp C091LampLamp C091Lamp C091LampLamp C091Lamp C091LampLamp C091Lamp C091Lamp </p>
              <div class="l-margin-m1">
                <span class="l-text-gray mui-pull-right">颜色：苹果红</span>
                <span class="l-text-warn"><b class="l-icon">&#xe6cb;</b>268.00</span>
                <span class="l-text-gray">x3</span>
              </div>
            </div>
          </div>
          <div class="_item l-flex-hc">
            <div class="l-thumb l-bg-contain l-margin-r" style="background-image: url('http://placeholdit.imgix.net/~text?txtsize=33&bg=ff784e&txtclr=fff&txt=thumb&w=120&h=120')"></div>
            <div class="l-rest l-fs-s">
              <p class="l-text-wrap2">Lamp C091Lamp C091LampLamp C091Lamp C091LampLamp C091Lamp C091LampLamp C091Lamp C091Lamp </p>
              <div class="l-margin-m1">
                <span class="l-text-gray mui-pull-right">颜色：苹果红</span>
                <span class="l-text-warn"><b class="l-icon">&#xe6cb;</b>268.00</span>
                <span class="l-text-gray">x3</span>
              </div>
            </div>
          </div>
          <div class="_item l-fs-s l-text-gray">
            <span class="l-margin-r-xs"><i class="l-icon l-text-ok">&#xe626; </i>7天无理由退换</span>
            <span class="l-margin-r-xs"><i class="l-icon l-text-ok">&#xe626; </i>15天免费换货</span>
            <span class="l-margin-r-xs"><i class="l-icon l-text-ok">&#xe626; </i>1年免费维修</span>
          </div>
          <div class="_item l-flex-hc l-link-arrow">
            <div class="l-rest">发票信息</div>
            <span>不开发票</span>
          </div>
          <div class="_item">
            <div class="l-flex-hc">
              <div class="l-rest">配送信息</div>
              <span class="l-text-error">包邮，24小时内发货</span>
            </div>
            <p class="l-text-gray l-fs-xs">全国包邮（不含港澳台地区、西藏、新疆、内蒙古）</p>
          </div>
        </div>
      </div>
      <!-- 付款 -->
      <div class="l-popup-bottom" :class="{'_show': isShowPay}" @click="showPay">
        <div class="_inner" @click.stop>
          <div class="_hd l-border-b">
            <i class="_close l-icon" @click="showPay">&#xe605;</i>
            <h3>付款详情</h3>
          </div>
          <div class="_bd">
            <div class="l-panel-group">
              <div class="_item l-flex-hc">
                <div class="l-rest">付款方式</div>
                <span><i class="l-icon l-text-ok">&#xe62a; </i>微信支付</span>
              </div>
              <div class="_item l-flex-hc">
                <div class="l-rest">需付款</div>
                <span class="l-text-warn"><b class="l-icon">&#xe6cb;</b>268.00</span>
              </div>
            </div>
          </div>
          <div class="_ft l-border-t">
            <button type="button" class="mui-btn l-btn-main" @click="pay">确定付款</button>
          </div>
        </div>
      </div>
      <!-- 付款 end-->
    </div>
    <!-- 收货地址 -->
    <div class="l-inner-page" id="page-address-list">
      <header class="mui-bar mui-bar-nav l-black" v-if="!$mui.os.wechat">
        <h1 class="mui-title">选择收货地址</h1>
        <a class="mui-icon mui-icon-arrowleft mui-pull-left _nav-back"></a>
      </header>
      <footer class="mui-bar mui-bar-footer l-flex-hc l-transparent">
        <button type="button" class="mui-btn l-btn-main">添加新地址</button>
      </footer>
      <div class="mui-content">
        <address-list :mode="2"></address-list>
      </div>
    </div>
    <!-- 发票 -->
    <div class="l-inner-page" id="page-invoice">
      <header class="mui-bar mui-bar-nav l-black" v-if="!$mui.os.wechat">
        <h1 class="mui-title">发票信息</h1>
        <a class="mui-icon mui-icon-arrowleft mui-pull-left" @click="$pageBack('#main')"></a>
      </header>
      <footer class="mui-bar mui-bar-footer l-flex-hc l-transparent">
        <button type="button" class="mui-btn l-btn-main">确定</button>
      </footer>
    </div>
  </div>
</template>
<script>
import navTab from 'components/nav-tab'
import addressList from 'components/address-list'

export default {
  components: {
    navTab, addressList
  },
  data () {
    return {
      isShowPay: false
    }
  },
  methods: {
    showPay() {
      this.isShowPay = !this.isShowPay
    },
    pay() {
      this.showPay()
    },
    orderSubmit() {
      this.showPay()
    }
  },
  created() {
    
  }
}
</script>
<style scoped>

</style>