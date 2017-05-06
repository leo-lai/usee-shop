<template>
  <div class="l-order-list l-fs-s">
    <div class="l-order-item l-margin-t" v-for="item in list">
      <router-link :to="'/order/info/' + item.orderId" tag="div">
        <div class="_hd l-link-arrow">
          <span class="mui-pull-right" :class="ordersState[item.ordersState].cls">{{ordersState[item.ordersState].name}}</span>
          <span>订单号：{{item.orderCode}}</span>
        </div>
        <div class="_bd l-panel-group l-border-t">
          <div class="_item l-flex-hc" v-for="goods in item.ordersInfo">
            <div class="l-thumb l-bg-contain l-margin-r" :style="{'background-image': 'url('+ goods.image +')'}"></div>
            <div class="l-rest l-fs-s">
              <p class="l-text-wrap2">{{goods.goodsName}}</p>
              <div class="l-margin-m1">
                <p class="l-fr">
                  <span><b class="l-icon">&#xe6cb;</b>{{goods.amount | currency}}</span>
                  <span class="l-text-gray">x{{goods.goodsNumber}}</span>
                </p>
                <span v-show="goods.colorName" class="l-text-gray">款式：{{goods.colorName}}</span>
              </div>
            </div>
          </div>
        </div>
      </router-link>
      <div class="_ft l-border-t l-flex-hc">
        <span>共{{item.ordersInfo.length}}件 合计：<b class="l-icon">&#xe6cb;</b>{{item.amount | currency}}</span>
        <div class="l-rest l-text-right">
          <button class="mui-btn l-btn-white _s" v-if="item.ordersState == 1" @click="cancel(item.orderId)">取消订单</button>
          <button class="mui-btn l-btn-main _s" v-if="item.ordersState == 1" @click="pay(item)">去付款</button>
          <button class="mui-btn l-btn-white _s" v-if="item.ordersState > 3" @click="express(item.orderId)">查看物流</button>
          <button class="mui-btn l-btn-main _s" v-if="item.ordersState == 4" @click="receive(item.orderId)">确认收货</button>
          <button class="mui-btn l-btn-main _s" v-if="item.ordersState == 5" @click="evaluate(item)">去评价</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    list: {
      type: Array,
      default: []
    }
  },
  data() {
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
          cls: '',
          name: '交易完成'
        }
      }
    }
  },
  methods: {
    cancel(orderId) {
      this.$mui.confirm('确定取消订单？', (e)=>{
        if(e.index == 1){
          this.$mui.showWaiting()
          this.$server.order.changeStatus(orderId, 'CANCEL').then(()=>{
            this.$mui.toast('取消成功')
            this.$eventHub.$emit('APP-CANCEL', orderId)
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
            this.$eventHub.$emit('APP-RECEIVE', orderId)
          }).finally(()=>{
            this.$mui.hideWaiting()
          })
        }
      })
    },
    express(orderId) {
      this.$link('/order/express/' + orderId, 'page-in')
    },
    evaluate(item) {
      this.$storage.session.set('temp_evaluate_order', item)
      this.$link('/order/evaluate/' + item.orderId, 'page-in')
    },
    pay(item) {
      this.$storage.session.set('temp_pay_info', {
        orderId: item.orderId,
        orderCode: item.orderCode,
        amount: item.amount
      })
      window.location.replace(this.$server.getGrantUrl('/pay/?to=/order/list?tab=1'))
    }
  }
}
</script>
<style scoped lang="less">
.l-order-item{
  background: #fff;
  ._hd{padding: 0.5rem 0.75rem;}
  ._ft{
    padding: 0.5rem 0.75rem; 
    .mui-btn{margin-left: 0.25rem;}
  }
}
</style>