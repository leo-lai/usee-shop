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
        <div class="l-bg-white l-margin-tb" style="padding:2rem 0;">
          <div class="l-qrcode-img">
            <div class="canvas" ref="qrcode">
              <qrcanvas :options="qrcodeObj"></qrcanvas>
            </div>
            <img :src="qrcodeImg" alt="">  
          </div>
          <!-- <p class="l-text-center l-margin-t">U视一号<i class="l-text-warn">™</i></p> -->
        </div>
        <p class="l-text-gray l-fs-s l-text-center l-margin">长按保存或点击右上角分享</p>
      </template>
      <not-u v-else></not-u>
    </div>
  </div>
</template>
<script>
import notU from 'components/not-u'
import Qrcanvas from 'qrcanvas-vue'

let qrLogo = require('assets/images/logo.jpg')
export default {
  components: {
    notU, Qrcanvas
  },
  methods: {
    convertToImage(){
      const qrcodeCanvas = this.$refs.qrcode.children[0]
      if(!qrcodeCanvas) return ''

      const type = 'image/png'
      let imageData = qrcodeCanvas.toDataURL(type).replace(type, 'image/octet-stream') || ''
      this.$storage.local.set('qrcode_img', imageData, 1000*60*30)
      return imageData
    },
    createQrcode(imageData) {
      const self = this
      let bgImg = new Image()
      bgImg.onload = function(){
        self.qrcodeObj = Object.assign({}, self.qrcodeObj, {
          data: self.$server.getHost() + '/shop?_qruc=' + self.userInfo.userCode,
          cellSize: 4,
          correctLevel: 'H',
          typeNumber: 2,
          foreground: [
            {style: '#ff7809'},
            // outer squares of the positioner
            {row: 0, rows: 7, col: 0, cols: 7, style: '#f35b54'},
            {row: -7, rows: 7, col: 0, cols: 7, style: '#f35b54'},
            {row: 0, rows: 7, col: -7, cols: 7, style: '#f35b54'},
            // inner squares of the positioner
            {row: 2, rows: 3, col: 2, cols: 3, style: '#0080ff'},
            {row: -5, rows: 3, col: 2, cols: 3, style: '#0080ff'},
            {row: 2, rows: 3, col: -5, cols: 3, style: '#0080ff'},
          ],
          background: '#ffffff',
          logo: {
            image: bgImg,
            size: 0.1,
            fontStyle: 'bold',
            color: '#f35b54',
            text: 'U视一号',
            margin: 4
          },
          effect: {
            key: 'round', // image liquid round
            value: 0.2  
          }
        })

        self.$nextTick(()=>{
          self.qrcodeImg = self.convertToImage()
        })
      }
      bgImg.src = imageData
    }
  },
  data () {
    return {
      userInfo: {},
      qrcodeObj: {},
      qrcodeImg: ''
    }
  },
  created() {
    this.$server.user.getInfo().then(({data})=>{
      this.userInfo = data
      if(data.agentId == 1){
        // 分享授权
        this.$server.wxShare({
          title: '我为U视喷喷代言',
          desc: '喷3次，停3秒，眨3下，U视喷喷9秒靓眼。',
          link: this.$server.getHost() + '/shop?_qruc=' + this.userInfo.userCode,
          imgUrl: this.userInfo.avatar
        }).catch((wx)=>{
          this.$mui.confirm('微信分享授权失败，请刷新重试', '', ['返回', '刷新'], (e)=>{
            if(e.index == 1){
              window.location.reload()
            }
          })
        })

        if(this.$storage.local.get('qrcode_img')){
          this.$nextTick(()=>{
            this.qrcodeImg = this.$storage.local.get('qrcode_img')
          })
        }else{
          this.$server.getImageBase64(data.avatar).then(({data})=>{
            qrLogo = data
          }).finally(()=>{
            setTimeout(()=>{
              this.createQrcode(qrLogo)  
            }, 600)
          })
        }
      }
    })
  }
}
</script>
<style scoped lang="less">
.l-qrcode-desc{
  ul{padding: 0 0.75rem 0 1.75rem;list-style-type: decimal;}
}
.l-qrcode-img{
  width: 10rem; height: 10rem; margin:0 auto; text-align: center;
  .canvas{display: none;}   
}
.l-qrcode-img img{width: 100%; height: 100%;}
</style>