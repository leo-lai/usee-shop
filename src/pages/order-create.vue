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
          <button type="button" style="width: 6rem;" class="mui-btn l-btn-main _m l-margin-l-m"  @click="orderSubmit">提交订单</button>
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
          <div class="_item l-flex-hc l-link-arrow" @click="$pageTo('#page-invoice', '发票信息')">
            <div class="l-rest">发票信息</div>
            <span>{{invoiceType[invoiceIndex]}}</span>
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
    <div class="l-page" id="page-address-list">
      <header class="mui-bar mui-bar-nav l-black" v-if="!$mui.os.wechat">
        <h1 class="mui-title">选择收货地址</h1>
        <a class="mui-icon mui-icon-arrowleft mui-pull-left _nav-back"></a>
      </header>
      <footer class="mui-bar mui-bar-footer l-flex-hc l-transparent">
        <router-link class="mui-btn l-btn-main" to="/address/add">添加新地址</router-link>
      </footer>
      <div class="mui-content">
        <address-list :mode="2"></address-list>
      </div>
    </div>
    <!-- 发票 -->
    <div class="l-page" id="page-invoice">
      <header class="mui-bar mui-bar-nav l-black" v-if="!$mui.os.wechat">
        <h1 class="mui-title">发票信息</h1>
        <a class="mui-icon mui-icon-arrowleft mui-pull-left _nav-back"></a>
      </header>
      <footer class="mui-bar mui-bar-footer l-flex-hc l-transparent">
        <button type="button" class="mui-btn l-btn-main" @click="sltInvoiceOk">确定</button>
      </footer>
      <div class="mui-content">
        <div class="l-bg-white l-margin-b">
          <div class="l-padding-btn l-border-b">发票类型</div>
          <div class="l-fs-m l-zoom" style="padding:0 0.75rem 0.5rem 0.75rem;">
            <ul class="l-slt-list">
              <li class="_item" v-for="(item, index) in invoiceType" :class="{'_active': invoiceIndex == index}" @click="sltInvoiceType(index)">{{item}}</li>
            </ul>
          </div>
        </div>
        <!-- 普通发票 -->
        <div v-show="invoiceIndex == 1">
          <div class="l-bg-white l-margin-b">
            <div class="l-padding-btn l-border-b">发票抬头</div>
            <div class="l-padding-btn">
              <textarea class="l-textarea" rows="3" placeholder="请输入发票抬头"></textarea>
            </div>
          </div>
          <div class="l-bg-white l-margin-b">
            <div class="l-padding-btn">发票内容</div>
            <ul class="mui-table-view mui-table-view-radio">
              <li class="mui-table-view-cell mui-selected">
                <a class="mui-navigate-right">明细</a>
              </li>
            </ul>
          </div>
        </div>
        <!-- 增值税发票 -->
        <div v-show="invoiceIndex == 2">
          <div class="l-bg-white l-margin-b">
            <div class="l-padding-btn l-border-b">发票内容</div>
            <div class="l-panel-group l-form">
              <div class="_item l-flex-hc">
                <label class="_tit">单位名称</label>
                <div class="_ipt l-rest">
                  <input type="text" placeholder="必填" maxlength="100">
                </div>
              </div>
              <div class="_item l-flex-hc">
                <label class="_tit">纳税人识别码</label>
                <div class="_ipt l-rest">
                  <input type="text" placeholder="必填" maxlength="100">
                </div>
              </div>
              <div class="_item l-flex-hc">
                <label class="_tit">注册地址</label>
                <div class="_ipt l-rest">
                  <input type="text" placeholder="必填" maxlength="100">
                </div>
              </div>
              <div class="_item l-flex-hc">
                <label class="_tit">注册电话</label>
                <div class="_ipt l-rest">
                  <input type="tel" placeholder="必填" maxlength="15">
                </div>
              </div>
              <div class="_item l-flex-hc">
                <label class="_tit">开户银行</label>
                <div class="_ipt l-rest">
                  <input type="text" placeholder="必填" maxlength="100">
                </div>
              </div>
              <div class="_item l-flex-hc">
                <label class="_tit">银行账户</label>
                <div class="_ipt l-rest">
                  <input type="text" placeholder="必填" maxlength="100">
                </div>
              </div>
              <div class="_item l-flex-hc">
                <label class="_tit">收票人姓名</label>
                <div class="_ipt l-rest">
                  <input type="text" placeholder="必填" maxlength="100">
                </div>
              </div>
              <div class="_item l-flex-hc">
                <label class="_tit">收票人手机</label>
                <div class="_ipt l-rest">
                  <input type="tel" placeholder="必填" maxlength="11">
                </div>
              </div>
              <div class="_item l-flex-h">
                <label class="_tit">所在地区</label>
                <div class="_ipt l-rest" @click="pickerCity">
                  <span v-if="sltedCityText">{{sltedCityText}}</span>
                  <span class="l-text-gray" v-else>必填</span>
                </div>
              </div>
              <div class="_item l-flex-h">
                <label class="_tit">详细地址</label>
                <textarea class="l-textarea" rows="3" placeholder="请输入详细地址"></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import navTab from 'components/nav-tab'
import addressList from 'components/address-list'
import picker from 'libs/mui/js/mui.picker'
import popPicker from 'libs/mui/js/mui.poppicker'
import cityData from 'libs/mui/js/city.data-3'

export default {
  components: {
    navTab, addressList
  },
  data () {
    return {
	  isShowPay: false,
      invoiceType: ['不开发票', '普通发票', '增值税发票'],
      invoiceIndex: 0,
      sltedCityText: ''
    }
  },
  methods: {
	showPay() {
      this.isShowPay = !this.isShowPay
    },
    pay() {
      this.showPay()
    },
    sltInvoiceType(type = 0) {
      this.invoiceIndex = type
      if(type == 0){
        this.$router.back()
      }
    },
    sltInvoiceOk() {
      this.$router.back()
    },
    pickerCity() {
      // 选择地区
      if(!this.cityPicker){
        this.cityPicker = new this.$mui.PopPicker({
          layer: 3
        })
        this.cityPicker.setData(cityData)
      }
      this.cityPicker.show((items)=>{
        this.sltedCityText = (items[0] || {}).text + ' ' + (items[1] || {}).text + ' ' + (items[2] || {}).text
      })
    },
    orderSubmit() {
      this.showPay()
    }
  },
  created() {
    this.$mui.use(picker)
    this.$mui.use(popPicker)
  },
  mounted() {
      
  }
}
</script>
<style scoped>
@import '~libs/mui/css/mui.picker.css';
@import '~libs/mui/css/mui.poppicker.css';
</style>