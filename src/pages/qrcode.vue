<template>
  <div class="l-page">
    <header class="mui-bar mui-bar-nav l-black" v-if="!$mui.os.wechat">
      <h1 class="mui-title">{{ $route.meta.title }}</h1>
      <a class="mui-icon mui-icon-arrowleft mui-pull-left _nav-back"></a>
    </header>
    <div class="mui-content">
      <template v-if="userInfo.agentId == 1">
        <div class="l-bg-white l-qrcode-desc l-zoom">
          <h3 class="l-margin l-text-center">二维码说明</h3>
          <ul class="l-fs-s">
            <li>长按二维码可以保存二维码到手机</li>
            <li>您的朋友通过扫描您的二维码进入U视一号商城购买相应商品您将获得一定的返利</li>
            <li>越多人购买您获得的返利越多</li>
          </ul>
        </div>
        <div class="l-bg-white l-margin-tb l-padding">
          <div class="l-qrcode-img">
            <qrcanvas :options="qrcode"></qrcanvas>
          </div>
          <p class="l-text-center l-margin">U视一号<i class="l-text-warn">™</i></p>
        </div>
        <p class="l-text-gray l-fs-s l-text-center l-margin">长按保存或点击右上角分享</p>
      </template>
      <not-u v-else></not-u>
    </div>
  </div>
</template>
<script>
import notU from 'components/not-u'
import qrcanvas from 'qrcanvas-vue'
function convertImgToBase64(url, callback, outputFormat){
  var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    img = new Image
  img.crossOrigin = 'anonymous'
  img.onload = function(){
    canvas.height = img.height
    canvas.width = img.width
    ctx.drawImage(img,0,0)
    var dataURL = canvas.toDataURL(outputFormat || 'image/png')
    callback.call(this, dataURL)
    canvas = null;
  }
  img.src = url
}

export default {
  components: {
    qrcanvas, notU
  },
  data () {
    return {
      userInfo: {},
      qrcode: { }
    }
  },
  created() {
    this.$server.user.getInfo().then(({data})=>{
      this.userInfo = data
    })

    // const self = this
    // self.userInfo = self.$storage.local.get('userInfo')
    // let image = document.createElement('img')
    // image.src = self.userInfo.avatar
    // convertImgToBase64(self.userInfo.avatar, (base64)=>{
      
    // })
    // image.onload = function(){
    //   self.qrcode = Object.assign({}, this.qrcode, {
    //     data: 'http://www.baidu.com',
    //     cellSize: 6,
    //     // size: 160,
    //     logo: {
    //       image,
    //       // text: 'U视一号'
    //     }
    //   })
    // }
  }
}
</script>
<style scoped lang="less">
.l-qrcode-desc{
  ul{padding: 0 0.75rem 0 1.75rem;list-style-type: decimal;}
}
.l-qrcode-img{
  width: 12rem; height: 12rem; margin: 1.5rem auto 0; text-align: center;
   img,canvas{width: 100%; height: 100%;} 
}
</style>