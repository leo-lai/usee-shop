<template>
  <div class="l-page-group">
    <div class="l-page">
      <header class="mui-bar mui-bar-nav l-black" v-if="!$mui.os.wechat">
        <h1 class="mui-title">确认订单</h1>
        <a class="mui-icon mui-icon-arrowleft mui-pull-left _nav-back"></a>
      </header>
      <footer class="mui-bar mui-bar-footer l-flex-hc l-padding-lr">
        <div class="l-rest">
          需付款：<span class="l-text-warn" v-if="buyMoney"><b class="l-icon">&#xe6cb;</b>{{buyMoney.toFixed(2)}}</span>
        </div>
        <div class="_btn">
          <button type="button" style="width: 6rem;" class="mui-btn l-btn-main _m l-margin-l-m"  @click="orderSubmit">提交订单</button>
        </div>
      </footer>
      <div class="mui-content">
        <!-- 选择收货地址 -->
        <div class="l-bg-white">
          <div class="l-flex-hc l-padding l-link-arrow" v-if="addressLength > 0" @click="$pageTo('#page-address-list', '选择收货地址')">
            <img class="l-thumb-s l-margin-r-s" src="~assets/images/icon-006.png">
            <div class="l-rest l-fs-s" v-if="sltedAddress">
              <p class="l-margin-b-xs">
                <span class="mui-pull-right">{{sltedAddress.phoneNumber}}</span>
                <span>收货人：{{sltedAddress.name}}</span>
              </p>
              <p class="l-lh-s">收货地址：{{sltedAddress.province+sltedAddress.city+sltedAddress.area+sltedAddress.address}}</p>
            </div>
            <div class="l-rest l-fs-s" v-else>请选择收货地址</div>
          </div>
          <div class="l-flex-hc l-padding l-link-arrow" v-else @click="$link('/address/add?type=slt', 'page-in')">
            <img class="l-thumb-s l-margin-r-s" src="~assets/images/icon-006.png">
            <div class="l-rest l-fs-s">您还没添加地址，点击添加</div>
          </div>
          <div class="l-line-color"></div>  
        </div>
        <!-- 购买商品信息 -->
        <div class="l-padding-btn l-margin-t l-bg-white">
          <span>购买的商品</span>
        </div>
        <div class="l-panel-group l-border-tb l-margin-b">
          <div class="_item l-flex-hc" v-for="item in buyGoodsInfo">
            <div class="l-thumb l-bg-contain l-margin-r" :style="{'background-image': 'url('+ item.image +')'}"></div>
            <div class="l-rest l-fs-s">
              <p class="l-text-wrap2">{{item.goodsName}}</p>
              <div class="l-margin-m1">
                <p class="mui-pull-right">
                  <span><b class="l-icon">&#xe6cb;</b>{{item.price.toFixed(2)}}</span>
                  <span class="l-text-gray">x{{item.number}}</span>
                </p>
                <span v-show="item.colorName" class="l-text-gray">颜色：{{item.colorName}}</span>
              </div>
            </div>
          </div>
          <!-- <div class="_item l-fs-s l-text-gray">
            <span class="l-margin-r-xs"><i class="l-icon l-text-ok">&#xe626; </i>7天无理由退换</span>
            <span class="l-margin-r-xs"><i class="l-icon l-text-ok">&#xe626; </i>15天免费换货</span>
            <span class="l-margin-r-xs"><i class="l-icon l-text-ok">&#xe626; </i>1年免费维修</span>
          </div> -->
          <div class="_item l-flex-hc l-link-arrow" @click="$pageTo('#page-invoice', '发票信息')">
            <div class="l-rest">发票信息</div>
            <span>{{invoice[orderFormData.invoiceType]}}</span>
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
      <!-- <div class="l-popup-bottom">
        <div class="_inner" @click.stop>
          <div class="_hd l-border-b">
            <i class="_close l-icon">&#xe605;</i>
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
            <button type="button" class="mui-btn l-btn-main">确定付款</button>
          </div>
        </div>
      </div> -->
      <!-- 付款 end-->
    </div>
    <!-- 收货地址 -->
    <div class="l-page" id="page-address-list">
      <header class="mui-bar mui-bar-nav l-black" v-if="!$mui.os.wechat">
        <h1 class="mui-title">选择收货地址</h1>
        <a class="mui-icon mui-icon-arrowleft mui-pull-left _nav-back"></a>
      </header>
      <footer class="mui-bar mui-bar-footer l-flex-hc l-transparent">
        <router-link class="mui-btn l-btn-main" to="/address/add" tag="button">添加新地址</router-link>
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
              <li class="_item" v-for="(item, index) in invoice" :class="{'_active': orderFormData.invoiceType == index}" @click="sltInvoiceType(index)">{{item}}</li>
            </ul>
          </div>
        </div>
        <!-- 普通发票 -->
        <div v-show="orderFormData.invoiceType == 1">
          <div class="l-bg-white l-margin-b">
            <div class="l-padding-btn l-border-b">发票抬头</div>
            <div class="l-padding-btn">
              <textarea class="l-textarea" rows="3" placeholder="请输入发票抬头" v-model="orderFormData.paperCheckHear"></textarea>
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
        <div v-show="orderFormData.invoiceType == 2">
          <div class="l-bg-white l-margin-b">
            <div class="l-padding-btn l-border-b">发票内容</div>
            <div class="l-panel-group l-form">
              <div class="_item l-flex-hc">
                <label class="_tit">单位名称</label>
                <div class="_ipt l-rest">
                  <input type="text" placeholder="必填" maxlength="100" v-model="invoiceFormData.unitName">
                </div>
              </div>
              <div class="_item l-flex-hc">
                <label class="_tit">纳税人识别码</label>
                <div class="_ipt l-rest">
                  <input type="text" placeholder="必填" maxlength="100" v-model="invoiceFormData.taxpayeRCode">
                </div>
              </div>
              <div class="_item l-flex-hc">
                <label class="_tit">公司注册地址</label>
                <div class="_ipt l-rest">
                  <input type="text" placeholder="必填" maxlength="100" v-model="invoiceFormData.registeredAddress">
                </div>
              </div>
              <div class="_item l-flex-hc">
                <label class="_tit">公司注册电话</label>
                <div class="_ipt l-rest">
                  <input type="tel" placeholder="必填" maxlength="15" v-model="invoiceFormData.registeredPhone">
                </div>
              </div>
              <div class="_item l-flex-hc">
                <label class="_tit">开户银行</label>
                <div class="_ipt l-rest">
                  <input type="text" placeholder="必填" maxlength="100" v-model="invoiceFormData.openBankAccount">
                </div>
              </div>
              <div class="_item l-flex-hc">
                <label class="_tit">银行账户</label>
                <div class="_ipt l-rest">
                  <input type="text" placeholder="必填" maxlength="30" v-model="invoiceFormData.bankAccount">
                </div>
              </div>
              <div class="_item l-flex-hc">
                <label class="_tit">收票人姓名</label>
                <div class="_ipt l-rest">
                  <input type="text" placeholder="必填" maxlength="100" v-model="invoiceFormData.invoiceName">
                </div>
              </div>
              <div class="_item l-flex-hc">
                <label class="_tit">收票人手机</label>
                <div class="_ipt l-rest">
                  <input type="tel" placeholder="必填" maxlength="11" v-model="invoiceFormData.invoicePhone">
                </div>
              </div>
              <div class="_item l-flex-h">
                <label class="_tit">所在地区</label>
                <div class="_ipt l-rest" @click="pickerCity">
                  <span v-if="invoiceFormData.locationArea">{{invoiceFormData.locationArea}}</span>
                  <span class="l-text-gray" v-else>必填</span>
                </div>
              </div>
              <div class="_item l-flex-h">
                <label class="_tit">详细地址</label>
                <textarea class="l-textarea" rows="3" placeholder="请输入详细地址" maxlength="200" v-model="invoiceFormData.detailedAddress"></textarea>
              </div>
            </div>
          </div>
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
      submiting: false,
      invoice: ['不开发票', '普通发票', '增值税发票'],
      addressLength: 0,
      sltedAddress: null,
      buyGoodsInfo: null,
      buyMoneyStr: '0.00',
      orderFormData: {
        invoiceType: 0,                 // 发票类型 0 1 2
        paperCheckHear: '',             // 发票抬头
        paperCheckContent: '明细',      // 发票内容
        invoiceId: ''                   // 增值税发票Id
      },
      invoiceFormData: {
        unitName: '',
        taxpayeRCode: '',
        registeredAddress: '',
        registeredPhone: '',
        openBankAccount: '',
        bankAccount: '',
        invoiceName: '',
        invoicePhone: '',
        locationArea: '',
        detailedAddress: ''
      }
    }
  },
  computed: {
    buyMoney() {
      let money = 0
      if(this.buyGoodsInfo){
        this.buyGoodsInfo.forEach((item)=>{
          money += item.price * item.number
        })
      }
      this.buyMoneyStr = money.toFixed(2)
      return money
    }
  },
  methods: {
    sltInvoiceType(type = 0) {
      this.orderFormData.invoiceType = type
      if(type == 0){
        this.orderFormData.invoiceId = ''
        this.$router.back()
      }else if(type == 1){

      }else if(type == 2){
        if(!this.invoiceFormData.invoiceId){
          this.$mui.showWaiting()
          this.$server.order.getInvoice().then(({data})=>{
            Object.assign(this.invoiceFormData, data)
          }).finally(()=>{
            this.$mui.hideWaiting()
          })
        }
      }
    },
    sltInvoiceOk() {
      if(this.orderFormData.invoiceType == 2){ // 添加增值税发票
        if(!this.invoiceFormData.unitName){
          this.$mui.toptip('请输入单位名称')
          return
        }
        if(!this.invoiceFormData.taxpayeRCode){
          this.$mui.toptip('请输入纳税人识别号')
          return
        }
        if(!this.invoiceFormData.registeredAddress){
          this.$mui.toptip('请输入公司注册地址')
          return
        }
        if(!this.invoiceFormData.registeredPhone){
          this.$mui.toptip('请输入公司注册电话')
          return
        }
        if(!this.invoiceFormData.openBankAccount){
          this.$mui.toptip('请输入开户银行')
          return
        }
        if(!this.invoiceFormData.bankAccount){
          this.$mui.toptip('请输入银行账户')
          return
        }
        if(!this.invoiceFormData.invoiceName){
          this.$mui.toptip('请输入收票人姓名')
          return
        }
        if(!this.invoiceFormData.invoicePhone){
          this.$mui.toptip('请输入单位名称')
          return
        }
        if(!this.invoiceFormData.locationArea){
          this.$mui.toptip('请选择所在地区')
          return
        }
        if(!this.invoiceFormData.detailedAddress){
          this.$mui.toptip('请输入详细地址(发票寄往地址)')
          return
        }

        this.$mui.showWaiting()
        this.submiting = true
        this.$server.order.editInvoice(this.invoiceFormData).then(({data})=>{
          if(data){
            this.orderFormData.invoiceId = data.invoiceId
            this.invoiceFormData.invoiceId = data.invoiceId
          }
          this.$router.back()
        }).finally(()=>{
          this.submiting = false
          this.$mui.hideWaiting()
        })

        return
      }else if(this.orderFormData.invoiceType == 1){
        this.orderFormData.invoiceId = ''
        if(!this.orderFormData.paperCheckHear){
          this.$mui.alert('请输入发票抬头')
          return
        }
      }
      this.$router.back()
    },
    pickerCity() {
      // 选择地区
      if(!this.cityPicker){
        this.cityPicker = new this.$mui.PopPicker({
          layer: 3
        })
        this.cityPicker.setData(cityData)

        this.sltedAddress.provinceId && this.cityPicker.pickers[0].setSelectedValue(this.sltedAddress.provinceId)
        this.sltedAddress.cityId && this.cityPicker.pickers[1].setSelectedValue(this.sltedAddress.cityId)
        this.sltedAddress.areaId && this.cityPicker.pickers[2].setSelectedValue(this.sltedAddress.areaId)
      }

      this.cityPicker.show((items)=>{
        this.invoiceFormData.locationArea = items.map((item)=>{
          return item.text || ''
        }).join(' ')
      })
    },
    orderSubmit() {
      if(!this.sltedAddress || !this.sltedAddress.addressId){
        this.$mui.toptip('请选择收货地址')
        return
      }
      if(this.orderFormData.invoiceType == 1){
        if(!this.orderFormData.paperCheckHear){
          this.$mui.alert('请输入发票抬头')
          return
        }
      }
      if(this.orderFormData.invoiceType == 2){
        if(!this.orderFormData.invoiceId){
          this.$mui.alert('请填写增值税发票信息')
          return
        }
      }
      if(!this.buyGoodsInfo || this.buyGoodsInfo.length === 0){
        this.$mui.alert('没有获取到购买商品的信息')
        return
      }

      this.orderFormData.addressId = this.sltedAddress.addressId

      this.submiting = true
      this.$mui.showWaiting('订单提交中...')

      let promise = null
      if(this.buyType == 1){ // 1从订单详情下单
        this.orderFormData.goodsId = this.buyGoodsInfo[0].goodsId
        this.orderFormData.number = this.buyGoodsInfo[0].number
        this.orderFormData.goodTypeId = this.buyGoodsInfo[0].goodTypeId
        this.orderFormData.colorId = this.buyGoodsInfo[0].colorId
        promise = this.$server.order.addFromGoodsInfo(this.orderFormData)  
      }else{ // 2从购物车下单
        let shoppingCartIds = this.buyGoodsInfo.map((item)=>{
          return item.shoppingCartId
        })
        this.orderFormData.shoppingCartIds = shoppingCartIds.join(',')
        promise = this.$server.order.addFromShopcar(this.orderFormData)  
      }

      promise.then(({data})=>{
        if(data){
          // this.$mui.toast('提交订单成功')
          this.$storage.session.set('temp_pay_info', data)
          // this.$storage.local.remove('buy_slted_address')
          window.location.replace(this.$server.getGrantUrl('/pay/'))
        }else{
          this.$mui.alert('提交订单失败')
        }
      }).finally(()=>{
        setTimeout(()=>{
          this.submiting = false
          this.$mui.hideWaiting()  
        }, 50)
      })
    }
  },
  created() {
    this.$mui.use(picker)
    this.$mui.use(popPicker)

    this.buyType = this.$storage.session.get('temp_buy_type') // 1从订单详情下单 2从购物车下单
    this.buyGoodsInfo = this.$storage.session.get('temp_buy_info') || []

    // 选择收货地址
    this.$eventHub.$on('APP-SLTED-ADDRESS', (addressInfo, addressLength)=>{
      this.sltedAddress = addressInfo
      this.addressLength = addressLength
      if(addressInfo){
        !this.invoiceFormData.locationArea 
          && (this.invoiceFormData.locationArea = addressInfo.province + ' ' + addressInfo.city + ' ' + addressInfo.area)
        !this.invoiceFormData.detailedAddress 
          && (this.invoiceFormData.detailedAddress = addressInfo.address)
      }
    })
  }
  // ,
  // beforeRouteLeave() {
  //   this.$mui.closePopups()
  // }
}
</script>
<style scoped>
@import '~libs/mui/css/mui.picker.css';
@import '~libs/mui/css/mui.poppicker.css';
</style>