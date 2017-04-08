<template>
  <div class="l-page">
    <header class="mui-bar mui-bar-nav l-black" v-if="!$mui.os.wechat">
      <h1 class="mui-title">{{ $route.meta.title }}</h1>
      <a class="mui-icon mui-icon-arrowleft mui-pull-left _nav-back"></a>
      <!-- <a class="mui-icon mui-icon-bars mui-pull-right"></a> -->
    </header>
    <footer class="mui-bar mui-bar-footer l-flex-hc l-shop-bar" v-show="shopcarNumber > 0">
      <div class="mui-checkbox"><label>全选</label><input type="checkbox" @click="sltAll" :checked="checkAll"></div>
      <div class="l-rest l-text-center">
        合计：<span class="l-text-warn"><b class="l-icon">&#xe6cb;</b>{{payTotalMoney.toFixed(2)}}</span>
      </div>
      <div class="_btn">
        <button type="button" class="mui-btn l-btn-main _m" @click="submit">结算({{payTotalNum}})</button>
      </div>
    </footer>
    <div class="mui-content">
      <!-- 空数据 -->
      <div class="l-data-null" v-if="isNull">
        <div class="_icon"><i class="l-icon">&#xe63f;</i></div>
        <p class="_text">购物车空空如也</p>
        <div class="_btn">
          <router-link class="mui-btn l-btn-main _m" to="/shop">去购买</router-link>
        </div>
      </div>
      <!-- 空数据 end-->
      
      <div class="l-loading-inline" v-show="loading"><i class="mui-spinner"></i><span class="_txt">加载中...</span></div>

      <!-- 购物车列表 -->
      <div class="l-shopcar-list l-margin-b">
        <div class="l-padding-btn l-text-gray l-border-b l-bg-white l-sticky" v-show="shopcarNumber > 0">
          <span class="mui-pull-right" @click="del">删除</span>
          <span>共 {{shopcarNumber}} 件商品</span>
        </div>
        <div class="l-shopcar-item l-flex-hc l-border-t" v-for="item in goodsList">
          <div class="mui-checkbox"><label></label><input type="checkbox" @click="slt(item)" :checked="item.checked"></div>
          <div class="_thumb l-bg-contain" :style="{'background-image': 'url('+ item.image +')'}"></div>
          <div class="_main l-rest">
            <p class="_tit l-text-wrap1">{{item.goodsName}}</p>
            <p class="l-text-gray l-fs-xs" v-show="item.colorId">颜色：{{item.colorName}}</p>
            <div class="_price l-flex-hc">
              <p class="l-text-warn l-rest"><b class="l-icon">&#xe6cb;</b>{{item.price.toFixed(2)}}</p>
              <span class="l-numbox mui-pull-right">
                <i class="l-icon _minus" @click="numberMinus(item)">&#xe631;</i>
                <input class="_num" type="tel" value="1" @change="editNum(item)" v-model="item.number">
                <i class="l-icon _add" @click="numberAdd(item)">&#xe602;</i>
              </span>
            </div>
          </div>
        </div>
      </div>
      <!-- 购物车列表 end-->
    </div>
  </div>
</template>
<script>

export default {
  data () {
    return {
      checkAll: false,
      loading: false,
      payTotalNum: 0,
      payTotalMoney: 0,
      goodsList: null
    }
  },
  computed: {
    isNull() {
      return this.goodsList && this.goodsList.length === 0
    },
    shopcarNumber() {
      let number = 0
      if(this.goodsList){
        this.goodsList.forEach((item)=>{
          number += item.number
        })
      }
      return number
    }
  },
  methods: {
    numberMinus(goodsItem) {
      goodsItem.number = Math.max(goodsItem.number - 1, 1)
      this.editNum(goodsItem)
    },
    numberAdd(goodsItem) {
      ++goodsItem.number
      this.editNum(goodsItem)
    },
    sltAll() {
      this.checkAll = !this.checkAll
      this.goodsList = this.goodsList.map((item)=>{
        item.checked = this.checkAll
        return item
      })
    },
    slt(goodsItem) {
      goodsItem.checked = !goodsItem.checked
    },
    editNum(goodsItem) {
      clearTimeout(this.timeId)
      this.timeId = setTimeout(()=>{
        this.$server.shopcar.editNum(goodsItem.shoppingCartId, goodsItem.number)
      }, 1000)
    },
    del() {
      if(this.shoppingCartIds && this.shoppingCartIds.length > 0){
        this.$mui.confirm('确定删除所选商品？', (e)=>{
          if(e.index == 1){
            this.$mui.showWaiting()
            this.$server.shopcar.del(this.shoppingCartIds.join(',')).then(()=>{
              this.$mui.hideWaiting()
              this.$mui.toast('删除成功')
              this.goodsList = this.goodsList.filter((item)=>{
                if(!this.shoppingCartIds.includes(item.shoppingCartId)){
                  return item  
                }
              })
            })    
          }
        })
        
      }else{
        this.$mui.toast('您还没选择商品喔~')
      }
    },
    submit() {
      if(this.sltedGoods && this.sltedGoods.length > 0){
        this.$storage.session.set('temp_buy_info', this.sltedGoods)
        this.$storage.session.set('temp_buy_type', 2) // 从购物车下单
        this.$link('/shop/order/create', 'page-in')
      }else{
        this.$mui.toast('您还没选择商品喔~')
      }
    }
  },
  created() {
    this.loading = true
    this.$server.shopcar.getList().then(({data})=>{
      setTimeout(()=>{
        this.goodsList = data.map((item)=>{
          item.checked = false
          return item
        })
        this.loading = false
      }, 600)
    }).catch(()=>{
      this.loading = false
    })

    this.$watch('goodsList', (newValue, oldValue)=>{
      let payTotalNum = 0
      let payTotalMoney = 0
      let shoppingCartIds = []
      let sltedGoods = []
      newValue.forEach((item)=>{
        if(item.checked){
          sltedGoods.push(item)
          shoppingCartIds.push(item.shoppingCartId)
          payTotalNum += item.number
          payTotalMoney += item.price * item.number
        }
      })

      this.checkAll = newValue.length === sltedGoods.length

      this.sltedGoods = sltedGoods
      this.shoppingCartIds = shoppingCartIds
      this.payTotalNum = payTotalNum
      this.payTotalMoney = payTotalMoney
    }, { deep: true} )
  }
}
</script>
<style scoped lang="less">
.l-shopcar-list{background-color: #fff;}
.l-shopcar-item{
  padding: 0.75rem;
  .mui-checkbox{
    label{
      width: 40px;
      height: 1.8rem;
      display: block;
      padding: 0;
    }
    input{left: 0; }
  }
  ._thumb{
    width: 3rem; height: 3rem; overflow: hidden;
    margin-right: 0.75rem; border-radius: 2px;
  }
  ._tit{font-size: 0.7rem; line-height: 1.2; margin-bottom: 0.125rem;}
  ._price{overflow: hidden; margin: 0 0 -0.25rem;}
}
.l-shopcar-item._null{
  opacity: 0.3;
  ._thumb{ position: relative; }
  ._thumb:after{
    content: '已售罄';
    background-color: rgba(0, 0, 0, 0.6); color: #fff; font-size: 0.7rem;
    display: table-cell; text-align: center; vertical-align: middle; height: 3rem; width: 3rem;
  }
}
.l-shop-bar{
  padding: 0 0.75rem;
  .mui-checkbox{
    label{
      width: 80px;
      padding: 0 0 0 40px;
      height: 1.8rem;
      line-height: 1.8rem;
      font-size: 0.75rem;
      display: block;
      color: #999;
    }
    input{left: 0; }
  }
}
</style>