<template>
  <div class="l-page">
    <header class="mui-bar mui-bar-nav l-black" v-if="!$device.isWechat">
      <h1 class="mui-title">{{ $route.meta.title }}</h1>
      <a class="mui-icon mui-icon-arrowleft mui-pull-left _nav-back"></a>
    </header>
    <footer class="mui-bar mui-bar-footer l-flex-hc" v-if="isApply">
      <button type="button" class="mui-btn l-btn-main" @click="submit">提交申请</button>
    </footer>
    <div class="mui-content">
      <div class="l-bg-white l-flex-h" :class="stepCls">
        <div class="_step">
          <i class="_icon"></i>
          <p class="_txt">售后申请</p>
        </div>
        <div class="_line l-rest"></div>
        <div class="_step">
          <i class="_icon"></i>
          <p class="_txt">申请处理中</p>
        </div>
        <div class="_line l-rest"></div>
        <div class="_step">
          <i class="_icon"></i>
          <p class="_txt">处理结果</p>
        </div>
      </div>
      <transition name="fade">
        <div v-if="isApply">
          <div class="l-form l-padding-lr l-margin-tb l-bg-white">
            <div class="_tr _require l-border-b l-flex-hc">
              <label>售后服务</label>
              <div class="l-rest">
                <select v-model="formData.afterSalesType">
                  <option value="">请选择售后类型</option>
                  <option value="8">换货</option>
                  <option value="7" v-if="status < 5">退货退款</option>
                </select>
              </div>
            </div>
            <div class="_tr _require l-border-b l-flex-hc">
              <label>申请原因</label>
              <div class="l-rest">
                <select v-model="formData.afterSalesReason">
                  <option value="">请选择原因</option>
                  <option value="1">产品质量原因</option>
                  <option value="2" v-if="status < 5">7天无理由退换货</option>
                  <option value="10">其他</option>
                </select>
              </div>
            </div>
            <div class="_tr _require l-border-b l-flex-hc">
              <label>退货数量</label>
              <div class="l-rest">
                <input type="tel" v-model="formData.goodsNumber" maxlength="8" placeholder="请正确填写数量">
              </div>
            </div>
            <div class="_tr _require l-border-b l-flex-hc">
              <textarea class="l-textarea" v-model="formData.remark" maxlength="100" rows="3" placeholder="请填写其他备注"></textarea>
            </div>
            <div class="l-upload-images l-clearfix">
              <ul class="_list">
                <li class="_item" v-for="(item, index) in uploadImages">
                  <img :src="$utils.image.thumb(item.image, 60, 60) || item.localId" alt="" @click="previewImage(index)">
                  <i @click="delImage(item)"></i>
                </li>
              </ul>
              <div class="_btn" @click="addImages" v-if="uploadImages.length < imageCount">
                <i class="l-icon">&#xe632;</i>
                <p>添加图片</p>
                <p v-show="uploadImages.length > 0">{{uploadImages.length}}/{{imageCount}}</p>
              </div>
            </div>
          </div>
          <div class="l-margin l-fs-s l-text-gray">
            <p>1.最多上传2张图片</p>
            <p>2.退货地址：广东省广州市天河区陶庄路5号空间3F009</p>
            <p>3.邮寄费用：到付</p>
          </div>
        </div>
        <div v-else-if="status > 0" class="l-bg-white l-margin-tb">
          <br><br><br>
          <div class="l-text-center l-message">
            <p>
              <i class="l-icon _large" :class="message[status].icon"></i><br>
              <b>{{ message[status].title }}</b>
            </p>
            <p class="l-text-gray l-fs-m" style="padding: 1rem 1.6rem;" v-html="message[status].desc"></p>
          </div>
          <div class="l-text-center l-margin">
            <a href="http://p.qiao.baidu.com/cps/chat?siteId=10424067&userId=23235048" class="mui-btn l-btn-main _m" style="width:10rem;">在线客服</a>  
          </div>
          <br><br><br>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      status: '-1', // 0未申请1正在处理2审核已通过3审核不通过4不能申请5退款退货时间超出6换货时间超出
      message: {
        '1': {
          icon: '_icon-1',
          title: '申请已提交，正在处理',
          desc: '您的申请正在处理中，请耐心等待1-3个工作日'
        },
        '2': {
          icon: '_icon-2',
          title: '处理成功',
          desc: '您的售后申请已经成功处理，退款金额将由工作人员通过转账的形式退还至您的个人账户。'
        },
        '3': {
          icon: '_icon-3',
          title: '处理失败',
          desc: ''
        },
        '4': {
          icon: '_icon-3',
          title: '此订单不能申请售后',
          desc: ''
        },
        '5': {
          icon: '_icon-3',
          title: '超出申请时间',
          desc: '退款退货售后服务必须在确认收货后7天内提出申请'
        },
        '6': {
          icon: '_icon-3',
          title: '超出申请售后时间',
          desc: '您已错过申请售后时间段(确认收货后7天内可退款退货，3个月内可换货)'
        }
      },
      imageCount: 2,
      uploadImages: [],
      previewImages: [],
      formData: {
        orderId: '',
        orderInfoId: '',
        goodsId: '',
        goodsNumber: '',
        images: '',
        remark: '',
        afterSalesReason: '',
        afterSalesType: ''
      }
    }
  },
  computed: {
    stepCls() {
      let cls = ''
      switch(this.status){
        case '1':
          cls = 'l-service-step2'
          break
        case '2':
        case '3':
        case '6':
          cls = 'l-service-step3'
          break
        default:
          cls = 'l-service-step1'
      }
      return cls
    },
    isApply() {
      return this.status == 0 || this.status == 5
    }
  },
  methods: {
    addImages() {
      this.$server.chooseImage(this.imageCount - this.uploadImages.length)
      .then((localIds)=>{
        this.$server.uploadImage(localIds).then(({ serverIds, images, localIds })=>{
          this.previewImages = images
          serverIds.forEach((serverId, index)=>{
            this.uploadImages.push({
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
    delImage(image){
      this.uploadImages = this.uploadImages.filter((_image)=>{
        return _image.serverId !== image.serverId
      })
    },
    previewImage(index) {
      this.$server.previewImage(this.previewImages, index)
    },
    submit() {
      if(!this.formData.afterSalesType){
        this.$mui.toptip('请选择售后服务')
        return
      }
      if(!this.formData.afterSalesReason){
        this.$mui.toptip('请选择申请售后的原因')
        return
      }

      let number = Number(this.formData.goodsNumber)
      if(Number.isNaN(number) || number <= 0){
        this.$mui.toptip('请正确填写退货数量')
        return
      }

      this.formData.images = this.previewImages.join(',')

      this.$mui.showWaiting()
      this.$server.order.applyAfterSales(this.formData).then(()=>{
        this.status = '1'
      }).finally(()=>{
        this.$mui.hideWaiting()
      })
    }
  },
  mounted() {
    this.$mui.showWaiting()
    Object.assign(this.formData, this.$route.params)
    this.$server.order.checkAfterSales(this.$route.params).then((response)=>{
      this.status = response.data
      if(this.status == 3){
        this.message[this.status].desc = response.message
      }
    }).finally(()=>{
      this.$mui.hideWaiting()
    })
  }
}
</script>
<style scoped lang="less">
.l-form{
  select,input{margin:0;border:none;}
  ._tr{
    padding: 0.5rem 0;
    >label{
      margin-right: 0.75rem;
    }
  }
}
.l-upload-images{margin:0;}

.l-message{
  ._icon-1:after{
    content: '\e629';
    color: #ff784e;
  }
  ._icon-2:after{
    content: '\e7f8';
    color: #ff784e;
  }
  ._icon-3:after{
    content: '\e694';
    color: #ff784e;
  }
}

</style>