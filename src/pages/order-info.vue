<template>
  <div class="l-page">
    <header class="mui-bar mui-bar-nav l-black" v-if="!$mui.os.wechat">
      <h1 class="mui-title">{{ $route.meta.title }}</h1>
      <a class="mui-icon mui-icon-arrowleft mui-pull-left _nav-back"></a>
    </header>
    <footer class="mui-bar mui-bar-footer l-flex-hc l-padding-lr">
      <div class="l-rest"></div>
      <div v-if="orderInfo">
        <a class="mui-btn l-margin-l-s l-btn-white _m" v-if="orderInfo.ordersState == 1" @click="cancel(orderInfo.orderId)">取消订单</a>
        <a class="mui-btn l-margin-l-s l-btn-main _m" v-if="orderInfo.ordersState == 1" @click="pay()">去付款</a>
        <a class="mui-btn l-margin-l-s l-btn-main _m" v-if="orderInfo.ordersState == 4" @click="receive(orderInfo.orderId)">确认收货</a>
      </div>
    </footer>
    <div class="mui-content l-fs-s" v-if="orderInfo">
      <!-- 收货地址 -->
      <div class="l-bg-white">
        <div class="l-order-state l-flex-hc">
          <span class="l-rest">{{ordersState[orderInfo.ordersState]}}</span>
          <span><i class="l-icon">&#xe634;</i></span>
        </div>
        <div class="l-flex-hc l-padding-btn l-border-b">
          <div class="l-text-warn l-fs-l l-margin-r">
            <i class="l-icon">&#xe647;</i>
          </div>
          <div class="l-rest">
            <p>物流公司：{{orderInfo.expressName || '无'}}</p>
            <p>物流单号：{{orderInfo.expressCode || '无'}}</p>
          </div>
        </div>
        <div class="l-flex-hc l-padding-btn">
          <div class="l-text-warn l-fs-l l-margin-r">
            <i class="l-icon">&#xe60a;</i>
          </div>
          <div class="l-rest">
            <p class="l-margin-b-xs">
              <span class="mui-pull-right">{{address[1]}}</span>
              <span>收货人：{{address[0]}}</span>
            </p>
            <p class="l-lh-s">收货地址：{{address[2]}}</p>
          </div>
        </div>
        <div class="l-line-color"></div>  
      </div>
      <!-- 购买商品信息 -->
      <div class="l-margin-t">
        <div class="l-padding-btn l-bg-white l-border-b">
          <span>购买的商品</span>
        </div>
        <div class="l-panel-group">
          <div class="_item l-flex-hc" v-for="goods in orderInfo.ordersInfo">
            <div class="l-thumb l-bg-contain l-margin-r" :style="{'background-image': 'url('+ goods.image +')'}"></div>
            <div class="l-rest">
              <p class="l-text-wrap2">{{goods.goodsName}}</p>
              <div class="l-margin-m1">
                <p class="mui-pull-right">
                  <span><b class="l-icon">&#xe6cb;</b>{{goods.amount}}</span>
                  <span class="l-text-gray">x{{goods.goodsNumber}}</span>
                </p>
                <span class="l-text-gray" v-show="goods.colorId">颜色：{{goods.colorName}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="l-padding-btn l-bg-white l-border-t">
          <p class="mui-pull-right">实付款：<span class="l-text-warn"><b class="l-icon">&#xe6cb;</b>{{orderInfo.amount}}</span></p>
          <span>订单总价：<b class="l-icon">&#xe6cb;</b>{{orderInfo.amount}}</span>
        </div>
      </div>
      <!-- 订单时间 -->
      <div class="l-margin-t l-bg-white l-padding-btn l-text-gray l-margin-b">
        <p>订单编号：{{orderInfo.orderCode}}</p>
        <p>创建时间：{{orderInfo.startDate}}</p>
        <p>付款时间：{{orderInfo.payDate}}</p>
        <p>发货时间：{{orderInfo.deliverGoodsDate}}</p>
        <p>收货时间：{{orderInfo.goodsReceiptDate}}</p>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  components: {
  },
  data () {
    return {
      ordersState: ['', '未付款', '已付款', '已发货', '已收货'],
      orderInfo: null
    }
  },
  computed: {
    address() {
      return this.orderInfo && this.orderInfo.address ? this.orderInfo.address.split('|') : ['','','']
    }
  },
  methods: {
    cancel(orderId) {
      this.$mui.confirm('确定取消订单？', (e)=>{
        if(e.index == 1){
          this.$mui.showWaiting()
          this.$server.order.changeStatus(orderId, 'CANCEL').then(()=>{
            this.$mui.toast('取消成功')
            this.timeid = setTimeout(()=>{
              this.$router.back()  
            }, 2000)
          }).finally(()=>{
            this.$mui.hideWaiting()
          })
        }
      })
    },
    receive(orderId) {
      this.$mui.confirm('确定已收到商品？', (e)=>{
        if(e.index == 1){
          this.$mui.showWaiting()
          this.$server.order.changeStatus(orderId, 'RECEIVE').then(()=>{
            this.$mui.toast('收货成功')
            this.getInfo()
          }).finally(()=>{
            this.$mui.hideWaiting()
          })
        }
      })
    },
    pay() {
      this.$storage.session.set('temp_pay_info', {
        orderId: this.orderInfo.orderId,
        orderCode: this.orderInfo.orderCode,
        amount: this.orderInfo.amount
      })
      window.location.replace(this.$server.getGrantUrl('/pay/?to=/order/list?tab=1'))
    },
    getInfo() {
      this.$mui.showWaiting()
      this.$server.order.getInfo(this.$route.params.id).then(({data})=>{
        setTimeout(()=>{
          this.orderInfo = data[0] || data  
        }, 600)
      }).finally(()=>{
        this.$mui.hideWaiting()
      })
    }
  },
  created() {
    this.getInfo()
  },
  beforeDestroy() {
    clearTimeout(this.timeid)
  }
}
</script>
<style scoped lang="less">
.l-order-state{
  padding: 0.5rem 2.4rem; color: #fff; font-size: 0.85rem;
  background: linear-gradient(105deg, #ff784e, #f4524e);
  .l-icon{ font-size:  1.6rem; }
}
</style>