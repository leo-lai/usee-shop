<template>
  <div class="l-page">
    <header class="mui-bar mui-bar-nav l-black" v-if="!$mui.os.wechat">
      <h1 class="mui-title">{{ $route.meta.title }}</h1>
      <a class="mui-icon mui-icon-arrowleft mui-pull-left _nav-back"></a>
      <!-- <a class="mui-icon mui-icon-bars mui-pull-right"></a> -->
    </header>
    <footer class="mui-bar mui-bar-footer l-flex-hc l-transparent">
      <button type="button" class="mui-btn l-btn-main" :disabled="submiting" @click="submit">提交评价</button>
    </footer>
    <div class="mui-content">
      <div class="l-bg-white l-margin-b" v-for="item in orderInfo.ordersInfo" >
        <div class="l-flex-hc l-padding l-border-b">
          <div class="l-thumb l-bg-contain l-margin-r" :style="{'background-image': 'url('+ item.image +')'}"></div>
          <div class="l-rest l-fs-s">
            <p class="l-text-wrap2">{{item.goodsName}}</p>
          </div>
        </div>
        <div class="l-padding-btn">
          <textarea class="l-textarea l-fs-m" rows="3" v-model="item._content" placeholder="说说您的使用心得，分享给想买的他们吧~"></textarea>
          <div class="l-upload-images l-clearfix">
            <ul class="_list">
              <li class="_item" v-for="(image, index) in item._images">
                <img :src="$utils.image.thumb(image.image, 60, 60) || image.localId" alt="" @click="previewImage(item._images_src, index)">
                <i @click="delImage(item, image)"></i>
              </li>
            </ul>
            <div class="_btn" @click="addImages(item)" v-if="item._images.length < 6">
              <i class="l-icon">&#xe632;</i>
              <p v-show="item._images.length === 0">添加图片</p>
              <p v-show="item._images.length > 0">{{item._images.length}}/{{imageCount}}</p>
            </div>
          </div>
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
      submiting: false,
      imageCount: 6,
      orderInfo: {}
    }
  },
  methods: {
    addImages(item) {
      this.$server.chooseImage(this.imageCount - item._images.length)
      .then((localIds)=>{
        // localIds.forEach((localId)=>{
        //   item._images.push({
        //     localId
        //   })
        // })
        this.$server.uploadImage(localIds).then(({ serverIds, images, localIds })=>{
          console.log(serverIds, images, localIds)
          item._images_src = images
          serverIds.forEach((serverId, index)=>{
            item._images.push({
              serverId,
              localId: localIds[index],
              image: images[index]
            })
          })
        })
      }).catch((errMsg)=>{
        this.$mui.alert('添加图片失败，请刷新重试！', ()=>{
          this.$url.reload()
        })
      })
    },
    delImage(item, image){
      item._images = item._images.filter((_image)=>{
        return _image.serverId !== image.serverId
      })
    },
    previewImage(images, index) {
      this.$server.previewImage(images, index)
    },
    submit() {
      let evaluates = [], isPass = true
      this.orderInfo.ordersInfo.forEach((item)=>{
        if(!item._content){
          this.$mui.toptip('请输入评价内容')
          isPass = false
          return true
        }

        evaluates.push({
          goodsId: item.goodsId,
          judgegContent: item._content,
          imageMax: item._images_src
        })
      })

      if(!isPass) return

      this.$mui.showWaiting('提交中...')
      this.submiting = true
      this.$server.shop.evaluateGoods({
        orderId: this.orderInfo.orderId,
        evaluates: JSON.stringify(evaluates)
      }).then(()=>{
        this.$storage.session.remove('temp_evaluate_order')
        this.$mui.toast('评价成功')
        this.$router.back()
      }).finally(()=>{
        this.$mui.hideWaiting()
        this.submiting = false
      })
    }
  },
  created() {
    let orderInfo = this.$storage.session.get('temp_evaluate_order') || {}
    orderInfo.ordersInfo.map((item)=>{
      item._content = ''
      item._images = []
      return item
    })

    this.orderInfo = orderInfo
    // this.$mui.showWaiting()
    // this.$server.getWxConfig().then(()=>{
    //   this.$mui.hideWaiting()
    // })
  }
}
</script>
<style scoped lang="less">
.l-thumb{width: 2rem; height: 2rem;}

</style>