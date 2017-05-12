<template>
  <div class="l-page">
    <header class="mui-bar mui-bar-nav l-black" v-if="!$device.isWechat">
      <h1 class="mui-title">{{ $route.meta.title }}</h1>
      <a class="mui-icon mui-icon-arrowleft mui-pull-left _nav-back"></a>
    </header>
    <footer class="mui-bar mui-bar-footer l-flex-hc l-transparent">
      <button type="button" class="mui-btn l-btn-main" :disabled="submiting" @click="submit">提交</button>
    </footer>
    <div class="mui-content">
      <div class="l-panel-group l-form">
        <div class="_item l-flex-hc">
          <label class="_tit">收货人姓名</label>
          <div class="_ipt l-rest">
            <input type="text" placeholder="请输入收货人姓名" maxlength="100" v-model="formData.name">
          </div>
        </div>
        <div class="_item l-flex-hc">
          <label class="_tit">收货人手机</label>
          <div class="_ipt l-rest">
            <input type="tel" placeholder="请输入手机号码" maxlength="11" v-model="formData.phoneNumber">
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
          <textarea class="l-textarea" rows="3" maxlength="200" placeholder="请输入详细地址(如街道、门牌号)" v-model="formData.address"></textarea>
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
      sltedCityText: '',
      formData: {
        name: '',           // 收货人姓名
        phoneNumber: '',    // 收货人电话
        address: ''         // 详细地址
      }
    }
  },
  methods: {
    pickerCity() {
      // 选择地区
      if(!this.cityPicker){
        this.cityPicker = new this.$mui.PopPicker({
          layer: 3
        })
        this.cityPicker.setData(cityData)
        this.formData.provinceId && this.cityPicker.pickers[0].setSelectedValue(this.formData.provinceId)
        this.formData.cityId && this.cityPicker.pickers[1].setSelectedValue(this.formData.cityId)
        this.formData.areaId && this.cityPicker.pickers[2].setSelectedValue(this.formData.areaId)
      }
      this.cityPicker.show((items)=>{
        this.sltedCityText = items.map((item)=>{
          return item.text || ''
        }).join(' ')

        this.formData.provinceId = items[0].value
        this.formData.province = items[0].text
        this.formData.cityId = items[1].value || ''
        this.formData.city = items[1].text || ''
        this.formData.areaId = items[2].value || ''
        this.formData.area = items[2].text || ''
      })
    },
    submit() {
      if(!this.formData.name){
        this.$mui.toptip('请输入收货人姓名')
        return
      }
      if(!this.formData.phoneNumber){
        this.$mui.toptip('请输入收货人手机')
        return
      }
      if(!this.formData.provinceId){
        this.$mui.toptip('请选择地区')
        return
      }
      if(!this.formData.address){
        this.$mui.toptip('请输入详细地址')
        return
      }

      this.$mui.showWaiting()
      this.submiting = true
      this.$server.address.eidtInfo(this.formData).then(({data})=>{
        this.$mui.toast(this.$route.params.id ? '修改收货地址成功' : '添加收货地址成功')
        if(this.$route.query.type === 'slt'){
          this.$storage.local.set('buy_slted_address', data)
          this.$eventHub.$emit('APP-SLTED-ADDRESS', data, 1)
        }
        this.$router.back()
      }).finally(()=>{
        this.submiting = false
        this.$mui.hideWaiting()
      })
    }
  },
  created() {
    this.$mui.use(picker)
    this.$mui.use(popPicker)

    if(this.$route.params.id){
      this.formData.addressId = this.$route.params.id
      let addressInfo = this.$storage.session.get('temp_address_info')
      if(addressInfo){
        this.formData.name = addressInfo.name
        this.formData.phoneNumber = addressInfo.phoneNumber
        this.formData.province = addressInfo.province
        this.formData.provinceId = addressInfo.provinceId
        this.formData.city = addressInfo.city
        this.formData.cityId = addressInfo.cityId
        this.formData.area = addressInfo.area
        this.formData.areaId = addressInfo.areaId
        this.formData.address = addressInfo.address
        this.sltedCityText = this.formData.province + ' ' + this.formData.city + ' ' + this.formData.area
      }
    }
  },
  beforeDestroy() {
    if(this.cityPicker){
      // this.cityPicker.hide()
      this.cityPicker.dispose()
    } 
  }
}
</script>
<style scoped>
@import '~libs/mui/css/mui.picker.css';
@import '~libs/mui/css/mui.poppicker.css';
</style>