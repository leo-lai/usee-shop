<template>
  <div class="l-page">
    <header class="mui-bar mui-bar-nav l-black" v-if="!$mui.os.wechat">
      <h1 class="mui-title">{{ $route.meta.title }}</h1>
      <a class="mui-icon mui-icon-arrowleft mui-pull-left _nav-back"></a>
    </header>
    <footer class="mui-bar mui-bar-footer l-flex-hc l-transparent">
      <button type="button" class="mui-btn l-btn-main" @click="sltInvoiceOk">提交</button>
    </footer>
    <div class="mui-content">
      <div class="l-panel-group l-form">
        <div class="_item l-flex-hc">
          <label class="_tit">收货人姓名</label>
          <div class="_ipt l-rest">
            <input type="text" placeholder="请输入姓名" maxlength="100">
          </div>
        </div>
        <div class="_item l-flex-hc">
          <label class="_tit">收货人手机</label>
          <div class="_ipt l-rest">
            <input type="tel" placeholder="请输入手机号码" maxlength="11">
          </div>
        </div>
        <div class="_item l-flex-h">
          <label class="_tit">所在地区</label>
          <div class="_ipt l-rest" @click="pickerCity">
            <span v-if="sltedCityText">{{sltedCityText}}</span>
            <span class="l-text-gray" v-else>请选择地区</span>
          </div>
        </div>
        <div class="_item l-flex-h">
          <label class="_tit">详细地址</label>
          <textarea class="l-textarea" rows="3" placeholder="请输入详细地址(街道、门牌)"></textarea>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import addressList from 'components/address-list'
import picker from 'libs/mui/js/mui.picker'
import popPicker from 'libs/mui/js/mui.poppicker'
import cityData from 'libs/mui/js/city.data-3'

export default {
  components: {
    addressList
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