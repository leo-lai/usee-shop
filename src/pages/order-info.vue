<template>
  <div class="l-page">
    <header class="mui-bar mui-bar-nav l-black" v-if="!$device.isWechat">
      <h1 class="mui-title">{{ $route.meta.title }}</h1>
      <a class="mui-icon mui-icon-arrowleft mui-pull-left _nav-back"></a>
    </header>
    <footer class="mui-bar mui-bar-footer l-flex-hc l-padding-lr" v-if="showToolbar">
      <div class="l-rest"></div>
      <button class="mui-btn l-margin-l-m l-btn-white _s" v-if="orderInfo.ordersState == 1" @click="cancel(orderInfo.orderId)">取消订单</button>
      <button class="mui-btn l-margin-l-m l-btn-main _s" v-if="orderInfo.ordersState == 1" @click="pay(orderInfo)">去付款</button>
      <button class="mui-btn l-margin-l-m l-btn-white _s" v-if="orderInfo.ordersState > 3 && orderInfo.ordersState < 5" @click="express(orderInfo.orderId)">查看物流</button>
      <button class="mui-btn l-margin-l-m l-btn-main _s" v-if="orderInfo.ordersState == 4" @click="receive(orderInfo.orderId)">确认收货</button>
      <button class="mui-btn l-margin-l-m l-btn-main _s" v-if="orderInfo.ordersState == 5" @click="evaluate(orderInfo)">去评价</button>
    </footer>
    <div class="mui-content l-fs-s" v-if="orderInfo">
      <!-- 收货地址 -->
      <div class="l-bg-white">
        <div class="l-order-state l-flex-hc">
          <span class="l-rest">{{ordersState[orderInfo.ordersState].name}}</span>
          <span><i class="l-icon">&#xe634;</i></span>
        </div>
        <div v-if="orderInfo.expressCode" class="l-flex-hc l-padding l-link-arrow" @click="express">
          <div class="l-text-warn l-fs-l l-margin-r">
            <i class="l-icon">&#xe647;</i>
          </div>
          <div class="l-rest">
            <p>物流公司：{{orderInfo.expressName}}</p>
            <p>物流单号：{{orderInfo.expressCode}}</p>
          </div>
        </div>
        <div class="l-flex-hc l-padding l-border-t">
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
          <div class="_item l-flex-h" v-for="goods in orderInfo.ordersInfo">
            <div class="l-thumb l-bg-contain l-margin-r" :style="{'background-image': 'url('+ goods.image +')'}"></div>
            <div class="l-rest">
              <p class="l-text-wrap2">{{goods.goodsName}}</p>
              <p class="l-margin-m1"><span class="l-text-gray" v-show="goods.colorName">款式：{{goods.colorName}}</span></p>
            </div>
            <div class="l-text-right l-margin-l-m">
              <p>
                <span><b class="l-icon">&#xe6cb;</b>{{goods.amount | currency}}</span>
                <span class="l-text-gray">x{{goods.goodsNumber}}</span>
              </p>
              <p class="l-margin-m1" v-if="orderInfo.ordersState > 4">
                <button class="mui-btn l-margin-l-m l-btn-white _xs" @click="afterSales(goods.orderInfoId, goods.goodsId)">申请售后</button>  
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- 订单时间 -->
      <div class="l-margin-tb">
        <div class="l-bg-white l-padding-btn l-border-b">
          <p class="mui-pull-right">实付款：<span class="l-text-warn"><b class="l-icon">&#xe6cb;</b>{{orderInfo.amount | currency}}</span></p>
          <span>订单总价：<b class="l-icon">&#xe6cb;</b>{{orderInfo.amount | currency}}</span>
        </div>
        <div class="l-bg-white l-padding-btn l-text-gray">
          <p>订单编号：{{orderInfo.orderCode}}</p>
          <p>创建时间：{{orderInfo.startDate}}</p>
          <p>付款时间：{{orderInfo.payDate}}</p>
          <p>发货时间：{{orderInfo.deliverGoodsDate}}</p>
          <p>收货时间：{{orderInfo.goodsReceiptDate}}</p>
        </div>
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
      ordersState: {
        '-1': {
          cls: 'l-text-gray',
          name: '已取消'
        },
        '0': {
          cls: '',
          name: '全部'
        },
        '1': {
          cls: 'l-text-warn',
          name: '未付款'
        },
        '2': {
          cls: 'l-text-ok',
          name: '已付款'
        },
        '3': {
          cls: 'l-text-warn',
          name: '待发货'
        },
        '4': {
          cls: 'l-text-warn',
          name: '已发货'
        },
        '5': {
          cls: 'l-text-ok',
          name: '已收货'
        },
        '6': {
          cls: 'l-text-ok',
          name: '交易完成'
        },
      },
      orderInfo: null
    }
  },
  computed: {
    address() {
      return this.orderInfo && this.orderInfo.address ? this.orderInfo.address.split('|') : ['','','']
    },
    showToolbar() {
      return this.orderInfo && this.orderInfo.ordersState != 2 && this.orderInfo.ordersState > 0 && this.orderInfo.ordersState < 6
    }
  },
  methods: {
    cancel(orderId) {
      this.$mui.confirm('确定取消订单？', (e)=>{
        if(e.index == 1){
          this.$mui.showWaiting()
          this.$server.order.changeStatus(this.orderInfo.orderId, 'CANCEL').then(()=>{
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
          this.$server.order.changeStatus(this.orderInfo.orderId, 'RECEIVE').then(()=>{
            this.$mui.toast('收货成功')
            this.getInfo()
          }).finally(()=>{
            this.$mui.hideWaiting()
          })
        }
      })
    },
    express(orderId) {
      this.$link('/order/express/' + this.orderInfo.orderId, 'page-in')
    },
    evaluate(item) {
      this.$storage.session.set('temp_evaluate_order', this.orderInfo)
      this.$link('/order/evaluate/' + this.orderInfo.orderId, 'page-in')
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
    },
    afterSales(orderInfoId, goodsId) {
      this.$link(`/order/goods/service/${this.orderInfo.orderId}/${orderInfoId}/${goodsId}`, 'page-in')
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