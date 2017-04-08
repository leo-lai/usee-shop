<template>
  <div class="l-page">
    <header class="mui-bar mui-bar-nav l-black" v-if="!$mui.os.wechat">
      <h1 class="mui-title">{{ $route.meta.title }}</h1>
      <a class="mui-icon mui-icon-arrowleft mui-pull-left _nav-back"></a>
    </header>
    <footer class="mui-bar mui-bar-footer l-flex-hc l-padding-lr">
      <div class="l-rest">
        <a class="l-shopcar-icon" @click="$link('/shop/car', 'page-in')">
          <i class="l-icon">&#xe63f;</i>
          <span class="mui-badge mui-badge-danger">{{shopcarNumber}}</span>
        </a>
      </div>
      <div class="_btn">
        <button type="button" style="width: 6rem;" class="mui-btn l-btn-warn _m" @click="addToCar">加入购物车</button>
        <button type="button" style="width: 6rem;" class="mui-btn l-btn-main _m l-margin-l-s" @click="buyNow">立即购买</button>
      </div>
    </footer>
    <div class="mui-content">
      <!-- banner -->
      <div class="mui-slider">
        <div class="mui-slider-group mui-slider-loop" v-if="goodsImages">
          <div class="mui-slider-item mui-slider-item-duplicate" v-if="goodsImages.length > 1"><a><img :src="goodsImages[0].imagePath" /></a></div>
          <div class="mui-slider-item" v-for="item in goodsImages"><a><img :src="item.imagePath" /></a></div>
          <div class="mui-slider-item mui-slider-item-duplicate" v-if="goodsImages.length > 1"><a><img :src="goodsImages[goodsImages.length-1].imagePath" /></a></div>
        </div>
        <div class="mui-slider-indicator">
          <div class="mui-indicator" :class="{'mui-active': index === 0}" v-for="(item,index) in goodsImages"></div>
        </div>
      </div>
      <!-- banner end-->
      <div class="l-loading-inline" v-show="loading"><i class="mui-spinner"></i><span class="_txt">加载中...</span></div>
      <!-- info -->
      <div class="l-goods-item l-border-tb" v-if="goodsInfo">
        <div class="_text">
          <h3>{{goodsInfo.goodsName}}</h3>
          <p class="l-fs-m">{{goodsInfo.goodsBrief}}</p>
          <p class="l-text-warn l-fs-l"><b class="l-icon">&#xe6cb;</b>{{goodsInfo.priceStr}}</p>
        </div>
      </div>
      <div class="l-padding-btn l-bg-white l-fs-m l-text-gray l-link-arrow" @click="showSupport" v-if="goodsService">
        <template v-for="item in goodsService">
          <i class="l-icon l-text-ok">&#xe626;</i>
          <span class="l-margin-r-s">{{item.name}}</span>  
        </template>
      </div>
      <!-- info end-->
      <!-- details -->
      <template v-if="goodsInfo">
        <div class="l-padding-btn l-margin-t l-bg-white l-border-b">
          <span>商品详情</span>
          <span class="l-text-gray"> / Details</span>
        </div>
        <div class="l-goods-details l-padding-btn l-bg-white l-fs-m l-margin-b l-zoom">
          {{goodsInfo.goodsIntroduce}}
        </div>
      </template>
      <!-- details end-->
    </div>
    <!-- 选择商品规格 -->
    <div class="l-popup-bottom" :class="{'_show': isShowSpec}"  @click="showSpec">
      <div class="_inner">
        <i class="_close l-icon">&#xe605;</i>
        <div class="_content l-padding-lr" @click.stop v-if="goodsInfo">
          <div class="l-flex-hc l-padding-tb l-padding-r-xl l-border-b">
            <div class="l-thumb l-bg-contain l-margin-r" :style="{'background-image': 'url('+ goodsInfo.image +')'}"></div>
            <div class="l-rest l-fs-s">
              <p class="l-text-wrap2">{{goodsInfo.goodsName}}</p>
              <div class="l-margin-m1">
                <span class="l-text-warn"><b class="l-icon">&#xe6cb;</b>{{goodsInfo.priceStr}}</span>
              </div>
            </div>
          </div>
          <div class="_scroll">
            <div class="l-padding-tb l-fs-s l-border-b l-text-gray">
              <template v-for="item in goodsService">
                <i class="l-icon l-text-ok">&#xe626;</i>
                <span class="l-margin-r-s">{{item.name}}</span>  
              </template>
            </div>
            <div class="l-padding-tb l-fs-s l-border-b" v-if="goodsColour">
              <p>颜色分类</p>
              <ul class="l-slt-list">
                <li class="_item" v-for="item in goodsColour" :class="{'_active': sltedGoodsColor.colorId  === item.colorId }" @click="sltGoodsColor(item)">{{item.colorName}}</li>
              </ul>
            </div>
            <div class="l-padding-tb l-fs-s l-flex-hc">
              <p class="l-rest">购买数量</p>
              <span class="l-numbox mui-pull-right">
                <i class="l-icon _minus" @click="numberMinus">&#xe631;</i>
                <input class="_num" type="tel" v-model="buyNumber">
                <i class="l-icon _add" @click="numberAdd">&#xe602;</i>
              </span>
            </div>
          </div>
          <div class="l-padding-tb l-border-t">
            <button type="button" class="mui-btn l-btn-main" @click="sltSpecOk">确定</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 选择商品规格 end-->

    <!-- 三包说明 -->
    <div class="l-popup-bottom" :class="{'_show': isShowSupport}" @click="showSupport">
      <div class="_inner">
        <div class="_content l-padding" @click.stop>
          <div class="_scroll">
            <div class="l-goods-service">
              <div class="_item" :class="{'l-border-t': index > 0}" v-for="(item,index) in goodsService">
                <h3><i class="l-icon l-text-ok">&#xe626; </i>{{item.name}}</h3>
                <p class="l-text-gray l-fs-m">{{item.content}}</p>
              </div>
            </div>
          </div>
          <div class="l-padding-t l-border-t">
            <button type="button" class="mui-btn l-btn-main" @click="showSupport">我知道了</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 三包说明 end-->
  </div>
</template>
<script>
import navTab from 'components/nav-tab'
import previewImage from 'libs/mui/js/mui.preview-image'

export default {
  components: {
    navTab
  },
  data () {
    return {
      isShowSupport: false,
      isShowSpec: false,
      loading: false,
      goodsImages: null,
      goodsColour: null,
      sltedGoodsColor: {},
      goodsService: null,
      goodsInfo: null,
      shopcarNumber: 0,
      buyNumber: 1
    }
  },
  methods: {
    numberMinus() {
      this.buyNumber = Math.max(this.buyNumber - 1, 1)
    },
    numberAdd() {
      ++this.buyNumber
    },
    showSupport() {
      this.isShowSupport = !this.isShowSupport
    },
    showSpec(btnType = 1) { // 1加入购物车 2立即购买
      this.btnType = btnType
      this.isShowSpec = !this.isShowSpec
    },
    addToCar() {
      if(!this.$server.checkLogin()){
        this.$server.logout()
      }else{
        this.showSpec(1)  
      }
    },
    buyNow() {
      if(!this.$server.checkLogin()){
        this.$server.logout()
      }else{
        this.showSpec(2)  
      }
    },
    sltGoodsColor(color) {
      this.sltedGoodsColor = color
    },
    sltSpecOk() {
      // this.$router.push('/shop/order/create')
      if(this.goodsColour && this.goodsColour.length > 0 && !this.sltedGoodsColor.colorId){
        this.$mui.toast('请选择颜色')
        return
      }

      let formData = {
        goodsId: this.goodsInfo.goodsId,
        goodTypeId: this.goodsInfo.goodTypeId,
        number: this.buyNumber,
        colorId: this.sltedGoodsColor.colorId,
        colorName: this.sltedGoodsColor.colorName
      }

      if(this.btnType === 1){ // 加入购物车
        this.$mui.showWaiting(false)
        formData.sessionId = this.$storage.local.get('sessionId')
        this.$server.shopcar.add(formData).then(({data})=>{
          this.$mui.toast('已加入购物车')
          this.isShowSpec = false
          this.shopcarNumber += this.buyNumber
        }).finally(()=>{
          this.$mui.hideWaiting()
        })
      }else{ // 立即购买
        formData.goodsName = this.goodsInfo.goodsName
        formData.price = this.goodsInfo.price
        formData.image = this.goodsInfo.image
        this.$storage.session.set('temp_buy_info', [formData])
        this.$storage.session.set('temp_buy_type', 1) // 从商品详情下单
        this.$link('/shop/order/create', 'page-in')
      }
    }
  },
  created() {
    this.loading = true
    this.$server.shop.getGoodsInfo(this.$route.params.id).then(({data})=>{
      setTimeout(()=>{
        this.goodsImages = data.images || []
        this.goodsColour = data.colour || []
        this.goodsService = data.tag || []
        this.goodsInfo = data.goodsInfo || {}
        this.goodsInfo.priceStr = (this.goodsInfo.price || 0).toFixed(2)
        this.loading = false

        this.$nextTick(()=>{
          this.$mui('.mui-slider').slider({
            interval: 3000
          })

          // let detailsImages = Array.from(document.querySelectorAll('.l-goods-details img'))
          // detailsImages.forEach(img=>{
          //   img.setAttribute('data-preview-src', '')
          //   img.setAttribute('data-preview-group', '1')
          // })

          // if(detailsImages.length > 0){
          //   this.$mui.use(previewImage)  
          //   this.$mui.previewImage()
          // }
        })
      }, 600)
    }).catch(()=>{
      this.loading = false
    })

    if(this.$server.checkLogin()){
      this.$server.shopcar.getList().then(({data})=>{
        let shopcarNumber = 0
        data.forEach((item)=>{
          shopcarNumber += item.number
        })
        this.shopcarNumber = shopcarNumber
      })
    }
  }
}
</script>
<style scoped lang="less">
@import '~libs/mui/css/mui.preview-image.css';
.l-goods-service{
  ._item{padding: 0.5rem 0;}
  ._item:first-child{padding-top: 0;}
}
</style>