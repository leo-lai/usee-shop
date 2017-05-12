<template>
  <div class="l-page">
    <header class="mui-bar mui-bar-nav l-black" v-if="!$device.isWechat">
      <h1 class="mui-title">{{ $route.meta.title }}</h1>
      <a class="mui-icon mui-icon-arrowleft mui-pull-left _nav-back"></a>
    </header>
    <div class="mui-content l-bg-white">
      <div class="l-text-center">
        <img src="~assets/images/layout-002.jpg" alt="">
      </div>
      <div class="l-antifake-form">
        <input type="text" placeholder="在这里输入防伪码" maxlength="100">
        <button>查询真伪</button>
        <button>扫描二维码</button>
      </div>
      <br>
      <div class="l-antifake-desc">
        <h3>查询方式一：</h3>
        <ul>
          <li>请刮开商品上防伪标签的刮涂层，在查询框中输入防伪密码。</li>
          <li>点击<span class="l-text-hot">查询真伪</span>按钮，即可识别产品真伪。</li>
        </ul>
        <h3>查询方式二：</h3>
        <ul>
          <li>请刮开商品上防伪标签的刮涂层，直接点击<span class="l-text-hot">扫描二维码</span>按钮，扫描标签上的二维码。</li>
          <li>扫描完成，即可识别产品真伪。</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      
    }
  },
  created() {
  }
}
</script>
<style scoped lang="less">
.l-antifake-form{
  margin: 0.75rem;
  input{
    display: block; border:none; border-bottom: 0.05rem solid #ddd; text-align: center; padding: 1.5rem 0; border-radius: 0;
  }
  button{
    display: block; width: 8.0rem; margin: 0.75rem auto; border:0.05rem solid #00a0e8; border-radius: 0;
    background: #00a0e8; color: #fff; padding: 0.5rem; text-align: center;
  }
  button:active{background: #0382bb;}
}
.l-antifake-desc{
  margin: 0.75rem; font-size: 0.7rem; color: #999;
  h3{font-size: 0.7rem;}
  ul{list-style-type: decimal; padding-left: 1rem; margin:0.25rem 0 0.75rem;}
}
</style>