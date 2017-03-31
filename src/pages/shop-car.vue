<template>
  <div class="l-page">
    <header class="mui-bar mui-bar-nav l-black" v-if="!$mui.os.wechat">
      <h1 class="mui-title">{{ $route.meta.title }}</h1>
      <a class="mui-icon mui-icon-arrowleft mui-pull-left _nav-back"></a>
      <!-- <a class="mui-icon mui-icon-bars mui-pull-right"></a> -->
    </header>
    <footer class="mui-bar mui-bar-footer l-flex-hc l-shop-bar">
      <div class="mui-checkbox"><label>全选</label><input type="checkbox"></div>
      <div class="l-rest l-text-center">
        合计：<span class="l-text-warn"><b class="l-icon">&#xe6cb;</b>268.00</span>
      </div>
      <div class="_btn">
        <button type="button" class="mui-btn l-btn-main _m">结算(5)</button>
      </div>
    </footer>
    <div class="mui-content">
      <!-- 购物车列表 -->
      <div class="l-shopcar-list l-margin-b" v-if="true">
        <div class="l-padding-btn l-text-gray l-border-b l-bg-white l-sticky">
          <span class="mui-pull-right">删除</span>
          <span>商品总数：5件</span>
        </div>
        <div class="l-shopcar-item l-flex-hc l-border-b _null">
          <div class="mui-checkbox"><label></label><input type="checkbox"></div>
          <div class="_thumb l-bg-contain" style="background-image: url('http://placeholdit.imgix.net/~text?txtsize=33&bg=ff784e&txtclr=fff&txt=thumb&w=120&h=120')"></div>
          <div class="_main l-rest">
            <p class="_tit l-text-wrap2">Lamp C091Lamp</p>
            <div class="_price l-flex-hc">
              <p class="l-text-warn l-rest"><b class="l-icon">&#xe6cb;</b>268.00</p>
              <span class="l-numbox mui-pull-right">
                <i class="l-icon _minus">&#xe631;</i>
                <input class="_num" type="tel" value="1">
                <i class="l-icon _add">&#xe602;</i>
              </span>
            </div>
          </div>
        </div>
        <div class="l-shopcar-item l-flex-hc l-border-t" v-for="item in 10">
          <div class="mui-checkbox"><label></label><input type="checkbox"></div>
          <div class="_thumb l-bg-contain" style="background-image: url('http://placeholdit.imgix.net/~text?txtsize=33&bg=ff784e&txtclr=fff&txt=thumb&w=120&h=120')"></div>
          <div class="_main l-rest">
            <p class="_tit l-text-wrap2">Lamp C091Lamp C091Lamp C091Lamp C091Lamp C091Lamp C091Lamp C091Lamp C091</p>
            <div class="_price l-flex-hc">
              <p class="l-text-warn l-rest"><b class="l-icon">&#xe6cb;</b>268.00</p>
              <span class="l-numbox mui-pull-right">
                <i class="l-icon _minus">&#xe631;</i>
                <input class="_num" type="tel" value="1">
                <i class="l-icon _add">&#xe602;</i>
              </span>
            </div>
          </div>
        </div>
      </div>
      <!-- 购物车列表 end-->
      
      <!-- 空数据 -->
      <div class="l-data-null" v-else>
        <div class="_icon"><i class="l-icon">&#xe63f;</i></div>
        <p class="_text">购物车空空如也</p>
        <div class="_btn">
          <button type="button" class="mui-btn l-btn-main _m">去购买</button>
        </div>
      </div>
      <!-- 空数据 end-->
    </div>
  </div>
</template>
<script>
import navTab from 'components/nav-tab'

export default {
  components: {
    navTab
  },
  data () {
    return {
      
    }
  },
  computed: {
   
  },
  created() {
    
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
  ._tit{font-size: 0.7rem; line-height: 1.2;}
  ._price{overflow: hidden; margin: 5px 0 -5px;}
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