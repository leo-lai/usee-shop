<template>
	<div>
		<transition name="fade">
			<div v-if="!isFollow" class="l-guanzhu l-flex-hc">
		    <div class="_icon">
		      <img src="~assets/favicon.png" alt="">  
		    </div>
		    <div class="_text l-rest">
		      关注“U视一号”公众号享受更多服务
		    </div>
		    <span class="_btn" @click="guanZhu">关注</span>
		  </div>
	  </transition>
	  <transition name="fade">
		  <div v-if="visible" class="l-guanzhu-qrcode l-flex-vhc" >
		  	<img style="width:10rem;" :src="qrcode" alt="">
		  	<p class="l-fs-s l-margin-tb">长按识别二维码关注“U视一号”</p>
		  	<p class="l-icon l-fs-xl " @click="guanZhu">&#xe61a;</p>
		  </div>
	  </transition>
	</div>
</template>
<script>
export default {
	data() {
		return {
			visible: false,
			qrcode: '',
			isFollow: true
		}
	},
	mounted() {
		this.qrcode = this.$server.getWxQrcode()
		this.$server.user.getInfo(true).then(({data})=>{
			this.isFollow = data.isFollow == 1 ? true : false
		})
	},
  methods: {
  	guanZhu() {
  		this.visible = !this.visible
  		// this.$link('https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MjM5NDU0Mjk2MQ==&scene=124#wechat_redirect')
  	}
  }
}
</script>
<style scoped lang="less">
.l-guanzhu-qrcode{
	position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.8);
	color: #fff; z-index: 10000;
}

.l-guanzhu{
  position: absolute; top:0; left: 0; right: 0; z-index: 10000;
  background: rgba(0, 0, 0, 0.8); padding:0.4rem 0.5rem;
  ._text{
    color: #fff; font-size: 0.75rem;
  }
  ._icon{
    width: 1.4rem; height: 1.4rem; margin-right: 0.5rem;
    img{
      width: 100%; height: 100%;
    }
  }
  ._btn{
    display: block; width: 2.6rem; padding: 0.1rem 0;
    background: #00cc33; border-radius: 3px; text-align: center; color: #fff; font-size: 0.7rem;
  }
}
.l-guanzhu ~ .mui-content{top: 2.2rem;}
</style>