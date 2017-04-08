import mui from 'libs/mui/js/mui'
import Vue from 'vue'
import { storage, utils } from 'assets/js/utils'

// 测试
let appid = 'wxb022237ad49ef61f'
let baseUrl = 'http://119.23.30.245:8080/useeproject/interface'

// 正式
if(window.location.origin === 'http://shop.usee.com'){
  appid = 'wxa68cfebf01268d68'
  baseUrl = 'http://api.usee.com'
}

const errorPromise = function(message = ''){
  return new Promise((resolve ,reject)=>{
    reject({ message })
  })
}
const _http = {
  ajax(url = '', data = {}, type  = 'GET', contentType = 'form') {
    url = baseUrl + url
    let headers = {
      // 'sessionId': storage.local.get('sessionId') || '',
      'Content-Type': 'application/x-www-form-urlencoded'
    }

    if(contentType === 'json' || type === 'PUT'){
      // headers['Content-Type'] = 'text/plain'
      data = JSON.stringify(data)
    }
    
    // if(Vue._router.currentRoute.meta.auth){
      data.sessionId = storage.local.get('sessionId')
    // }
    
    return new Promise((resolve, reject)=>{
      mui.ajax(url, {
        data,
        type,
        headers,
        dataType: 'json',
        timeout: 60000,
        success(response, status, xhr) {
          mui.closePopups()
          !response.message && (response.message = '系统繁忙')
          if(response.resultCode === 4002) { 
            mui.hideWaiting()
            mui.alert(response.message, ()=>{
              _server.logout(false)
            })
            reject(response.message)
          }else if(response.resultCode !== 200){
            mui.hideWaiting()
            mui.alert(response.message)
            reject(response.message)
          }else{
            // 修正接口数据规范
            resolve(response)
          }
        },
        error(xhr, errorType, error){
          mui.hideWaiting()
          mui.closePopups()
          mui.alert('请求失败，请检查网络。')
          reject(error)
        }
      })
    })
  },
  get(url = '', data) {
    return this.ajax(url)
  },
  delete(url = '', data){
    return this.ajax(url, undefined, 'DELETE')
  },
  post(url, data, contentType = 'form') {
    return this.ajax(url, data, 'POST', contentType)
  },
  put(url, data, contentType = 'json') {
    return this.ajax(url, data, 'PUT', contentType)
  }
}

// 分页数据类
class List {
  constructor(type,  params = [], method = 'GET'){
    this.type = type
    this.method = method
    this.params = params            // 异步发送数据

    this.isLoading = false          // 正在请求数据
    this.isNull = false             // 表示后台已无数据返回，无需再发送请求
    this.isAjax = false             // 是否已请求过数据
    this.alldata = []               // 累计分页已返回数据
    this.data = []                  // 当前分页数据
    this.page = 1                   // 当前页数
    this.row = 10                   // 条数
    
    this.beforeAjax = utils.noop
    this.callback = utils.noop
  }
  init() {
    this.isAjax = false
    this.isNull = false
    this.data = []
    this.alldata = []
    this.goto(1)
  }
  next() {
    if(!this.isLoading && !this.isNull){
      ++this.page
      this.ajax()  
    }
    return this
  }
  prev() {
    if(!this.isLoading && this.page > 1){
      this.page = Math.min(--this.page, 1)
      this.ajax()  
    }
    return this
  }
  goto(index = 1) {
    if(!this.isLoading && !this.isNull){
      this.page = index
      this.ajax()
    }
    return this
  }
  ajax() {
    if(this.isLoading || this.isNull){ return this }

    let url = ''
    switch (this.type) {
      case 'Order': // 订单列表
        url = '/Member/order/list'
        break
      case 'UserCombos': // 用户套餐
        url = '/Member/combo/my'
        break
      case 'UserCoupons': // 用户优惠券
        url = '/Member/coupon/my'
        break
      case 'Coupons': // 优惠券中心
        url = '/Member/coupon/list'
        break
      case 'Combos': // 套餐年卡
        url = '/Member/combo/list'
        break
      case 'OrderHistory': // 消费记录
        url = '/Member/order/his_order'
        break
      case 'AgentRecord': // 分销记录
        url = '/Member/user/rebate_info'
        break
      case 'HolderDrawal': // 提现记录
        url = '/Member/holder/drawal_list'
        break
      case 'HolderMember': // 我的人脉
        url = '/Member/holder/member_list'
        break
      case 'HolderRebate': // 分红记录
        url = '/Member/holder/rebate_list'
        break
      case 'Goods': // 商品列表
        url = '/Member/shopping/goods_list'
        break
      case 'Store': // 门店列表
        url = '/Member/store/lbs_list'
        break
    }

    this.isLoading = true
    this.beforeAjax()

    let promise = null
    switch(this.method){
      case 'GET':
        url += `/${this.page}/${this.row}`
        if(utils.isArray(this.params) && this.params.length > 0){
          url += '/' + this.params.join('/')  
        }
        promise = _http.get(url)
        break
      case 'POST':
        if(!utils.isPlainObject(this.params)) this.params = {}
        this.params.page = this.page
        this.params.row = this.row
        promise = _http.post(url, this.params)
        break
    }

    promise.then(({list, obj})=>{
      this.isAjax = true
      this.isLoading = false
      
      this.data = list

      if(list.length === 0 || list.length < this.row){
        this.isNull = true
      }
       
      this.alldata = this.alldata.concat(list)
      this.callback(this.alldata, obj)
    }).catch((error)=>{
      this.isAjax = true
      this.isNull = false
      this.isLoading = false
      this.callback(this.alldata)
    })

    return promise
  }
}

const _server = {
  // 获取微信授权路径 url为绝对路径
  getGrantUrl(url, params) {
    if(!url) return ''
    url = window.location.origin + utils.url.setArgs(url, params)
    return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${url}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
  },
  // 获取jssdk授权配置 promise返回一个对象(wx or {})
  getWxConfig(url) { 
    url = url || storage.session.get('wx_url') || window.location.href
    const self = this
    let config = {
      debug: false,
      appId: '',
      timestamp: '',
      nonceStr: '',
      signature: '',
      jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone', 'chooseImage', 'previewImage', 'uploadImage', 'downloadImage', 'openLocation', 'getLocation', 'hideOptionMenu', 'showOptionMenu']
    }

    let promise = new Promise((resolve, reject) => {
      if(!window.wx){
        // reject('找不到wx对象')
        window.wx = {
          _ready: false
        }
        resolve(window.wx)
      }else{
        if(!utils.device.isWechat || window.wx._ready){
          resolve(window.wx)
          return
        }

        _http.post('/shopOrderPay/getConfig', { url }).then(({ data })=>{
          config.appId = data.appid
          config.timestamp = data.timestamp
          config.nonceStr = data.noncestr
          config.signature = data.signature

          window.wx.config(config)

          window.wx.error((error)=>{
            console.log('jssdk权限验证出错', error)
            if(!window.wx._tried){        // 第一次权限验证失败再利用当前地址尝试一下
              window.wx._tried = true     // 标识已经尝试验证过，不再尝试
              if(url === window.location.href){
                resolve(window.wx) 
              }else{
                window.wx._ready = false
                resolve(self.getWxConfig(window.location.href))
              }
            }else{
              resolve(window.wx) 
            }
          })

          window.wx.ready(()=>{
            console.log('微信jsdk授权成功')
            window.wx._ready = true
            resolve(window.wx)
          })
        }).catch(()=>{
          console.log('微信jsdk授权失败')
          resolve(window.wx)
        })
      }
    })
    return promise
  },
  getWxPayConfig(formData = {}) { // 微信支付配置
    let promise = new Promise((resolve, reject)=>{
      if(!formData.orderId){
        reject('支付失败：订单id不存在')
        mui.alert('支付失败：订单id不存在')
        return
      }
      _http.post('/shopOrderPay/pay/prepare', formData).then(resolve).catch(reject)
    })

    return promise
  },
  chooseWXPay(orderId) { // 微信jssdk支付
    let promise = new Promise((resolve, reject)=>{
      if(!utils.device.isWechat){
        mui.alert('请在微信浏览器进行支付')
        reject('请在微信浏览器进行支付')
        return
      }

      this.getWxConfig().then((wx)=>{
        if(wx._ready){
          this.getWxPayConfig(orderId).then(({obj})=>{
            wx.chooseWXPay({
              timestamp: obj.timeStamp, 
              nonceStr: obj.nonceStr, 
              package: obj.package, 
              signType: obj.signType,
              paySign: obj.paySign, 
              success(res) {
                if(res.err_msg === 'get_brand_wcpay_request:ok') {
                  resolve('ok')
                }else if(res.err_msg === 'get_brand_wcpay_request:cancel'){
                  reject('cancel')
                }else if(res.err_msg === 'get_brand_wcpay_request:fail'){
                  mui.alert('支付失败，如有疑问请联系客服')
                  reject('fail')
                }else{
                  resolve('支付回调成功')
                }
              }
            })
          }).catch(reject)
        }else{
          mui.alert('微信jsdk不可用')
          reject('微信jsdk不可用')
        }
      })
    })
    return promise
  },
  chooseWXPay2(formData) { // 微信浏览器支付
    let promise = new Promise((resolve, reject)=>{
      if(!utils.device.isWechat){
        mui.alert('请在微信浏览器进行支付')
        reject('请在微信浏览器进行支付')
        return
      }
      this.getWxPayConfig(formData).then(({obj})=>{
        WeixinJSBridge.invoke('getBrandWCPayRequest', obj, (res)=>{
          if(res.err_msg === 'get_brand_wcpay_request:ok') {
            resolve('ok')
          }else if(res.err_msg === 'get_brand_wcpay_request:cancel'){
            reject('cancel')
          }else if(res.err_msg === 'get_brand_wcpay_request:fail'){
            mui.alert('支付失败，如有疑问请联系客服')
            reject('fail')
          }else{
            resolve('支付回调成功')
          }
        })
      }).catch(reject)
    })

    return promise
  },
  previewImage(imgs = [], index = 0) {
    mui.showWaiting()
    this.getWxConfig().then((wx)=>{
      if(wx._ready){
        wx.previewImage({
          current: imgs[index],     // 当前显示图片的http链接
          urls: imgs,               // 需要预览的图片http链接列表
          fail(err) {
            mui.alert('预览图片失败：' + err.errMsg)
          }
        })    
      }else{
        mui.alert('请在微信浏览器打开')
      }
    }).finally(()=>{
      mui.hideWaiting()
    })
  },
  // 获取当前经纬度 成功失败都返回一个对象
  getPosition() {
    let position = storage.local.get('position')
    const _defualt = { // 获取位置失败返回默认坐标
      error: '获取地理位置失败',
      longitude: 113.531406,
      latitude: 22.808019
    }

    let promise = new Promise((resolve)=>{
      if(position){ // 先取缓存
        resolve(position)
      }else{
        this.getWxConfig().then((wx)=>{
          if(wx._ready){ // 调取微信地址位置接口
            wx.getLocation({
              type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
              success(res) {
                position = res
                storage.local.set('position', position, 1000 * 1800)
                resolve(position)
              },
              fail(err) {
                console.log('调用位置接口出错', err)
                resolve(_defualt)
              }
            })
          }else{ // h5获取位置
            navigator.geolocation.getCurrentPosition((response)=>{
              position.latitude = response.coords.latitude
              position.longitude = response.coords.longitude
              storage.local.set('position', position, 1000 * 1800)
              resolve(position)
            }, error => {
              let errHtml = ''
              switch(error.code){ 
                case error.PERMISSION_DENIED: 
                  errHtml = "用户拒绝对获取地理位置的请求。" 
                  break
                case error.POSITION_UNAVAILABLE: 
                  errHtml = "位置信息是不可用的。" 
                  break
                case error.TIMEOUT: 
                  errHtml = "请求用户地理位置超时。" 
                  break
                case error.UNKNOWN_ERROR: 
                  errHtml = "未知错误。" 
                  break
              } 
              _defualt.error = errHtml
              resolve(_defualt)
            })
          }
        })
      }
    })
    return promise
  },
  // 获取当前地址 使用腾讯地图WebService API
  getAddress() {
    const self = this
    let ret = ''
    let promise = new Promise((resolve) => {
      let address = storage.local.get('address')
      if(address){
        resolve(address)
      }else{
        self.getPosition().then((position)=>{
          mui.ajaxJSONP('http://apis.map.qq.com/ws/geocoder/v1/', {
            params: {
              location: position.latitude + ',' + position.longitude,
              key: 'GPIBZ-V7YH3-CD735-3HDQM-CNM3F-4PFQP',
              output: 'jsonp'
            }
          }, function({body}){
            if(body.status == 0){
              storage.local.set('address', body.result, 1000 * 1800);
              resolve(body.result)
            }else{
              resolve(ret)
            }
          })
        })
      }
    })
    return promise
  },
  // 获取两个经纬度的距离
  getDistance( lng1 = 0, lat1 = 0 ,  lng2 = 0, lat2 = 0 ) {
    let EARTH_RADIUS = 6378137.0    //单位M
    let PI = Math.PI
    let getRad = function(d){
      return d*PI/180.0
    }

    let f = getRad((lat1 + lat2)/2)
    let g = getRad((lat1 - lat2)/2)
    let l = getRad((lng1 - lng2)/2)
    
    let sg = Math.sin(g)
    let sl = Math.sin(l)
    let sf = Math.sin(f)
    
    let s,c,w,r,d,h1,h2
    let a = EARTH_RADIUS
    let fl = 1/298.257
    
    sg = sg*sg
    sl = sl*sl
    sf = sf*sf
    
    s = sg*(1-sl) + (1-sf)*sl
    c = (1-sg)*(1-sl) + sf*sl
    
    w = Math.atan(Math.sqrt(s/c))
    r = Math.sqrt(s*c)/w
    d = 2*w*a
    h1 = (3*r -1)/2/c
    h2 = (3*r +1)/2/s
    
    let m = d*(1 + fl*(h1*sf*(1-sg) - h2*(1-sf)*sg))

    if(Number.isNaN(m)){
      return 0
    }

    return Number((m/1000).toFixed(2))
  },
  // 发送手机验证码
  sendMobiCode(phone, btn) {
    if(!/^1\d{10}$/.test(phone)) {
      mui.alert('请输入正确手机号码')
      return errorPromise('请输入正确手机号码')
    }

    let time = 30
    let oldtext = ''
    let timeid = 0
    if(btn){
      btn.setAttribute('disabled', true)
      oldtext = btn.textContent
      timeid = setInterval(()=>{
        if(--time >= 0){
          btn.textContent = `${time}s`
        }else{
          clearInterval(timeid)
          btn.removeAttribute('disabled')
          btn.textContent = oldtext
        }
      }, 1000)
    }

    let promise = _http.post('/shopUsers/phoneVerifyCode', { phoneNumber: phone })
    promise.then((response)=>{
      mui.toast('验证码已发送到您的手机上')
      // response.data = response.data ? response.data : '1234'
      return response
    }).catch(()=>{
      clearInterval(timeid)
      btn.removeAttribute('disabled')
      btn.textContent = oldtext
    })

    return promise
  },
  // 注销
  logout (tipText = '请先登录', toUrl = window.location.pathname) {
    let sessionId = storage.local.get('sessionId')
    if(sessionId){
      _http.post('/shopUsers/loginOut', { sessionId })
      storage.local.remove('sessionId')
      storage.local.remove('userInfo')
    }
    
    tipText && mui.toast(tipText)
    if(utils.device.isWechat){
      // 避免登录后跳转到登录页面
      toUrl = toUrl === '/login' ? '/index' : toUrl
      window.location.replace(_server.getGrantUrl('/login', {to: toUrl}))
    }else{
      Vue._link(`/login?to=${toUrl}`, 'page-in')
    }
  },
  // 检测登录
  checkLogin() {
    return storage.local.get('sessionId')
  },
  // 登录
  login(type, formData) {
    var url = type == 1 ? '/shopUsers/loginPassword' : '/shopUsers/loginCode'
    return _http.post(url, formData).then((response)=>{
      !response.data && (response.data = {})
      response.data.avatar = utils.image.wxHead(response.data.image)
      storage.local.set('userInfo', response.data)
      return response
    })
  },
  // 注册
  register(formData) {
    return _http.post('/shopUsers/register', formData).then((response)=>{
      !response.data && (response.data = {})
      response.data.avatar = utils.image.wxHead(response.data.image)
      storage.local.set('userInfo', response.data)
      return response
    })
  },
  // 修改密码、找回密码
  changePwd(formData) {
    return _http.post('/shopUsers/forgetPassword', formData).then((response)=>{
      !response.data && (response.data = {})
      return response
    })
  },
  // 首页幻灯片
  getBanner() {
    return _http.post('/carouselFigure/getImages').then((response)=>{
      !response.data && (response.data = [])
      return response
    })
  },
  // 地址
  address: {
    getList() {
      return _http.post('/shopUsers/myAddressList').then((response)=>{
        !response.data && (response.data = [])
        return response
      })
    },
    eidtInfo(formData) {
      return _http.post('/shopUsers/addOrEditAddress', formData)
    },
    del(addressId) {
      return _http.post('/shopUsers/delAddress', { addressId })
    },
    setDefault(addressId) {
      return _http.post('/shopUsers/setAddressIsDefault', { addressId })
    }
  },
  // 商城
  shop: {
    getGoodsList(recommend = '') {
      return _http.post('/shopGoods/goodsSearch', {isIndex: recommend}).then((response)=>{
        !response.data && (response.data = [])
        return response
      })
    },
    getGoodsInfo(goodsId = '') {
      return _http.post('/shopGoods/goodsInfo', { goodsId }).then((response)=>{
        !response.data && (response.data = {})
        return response
      })
    }
  },
  // 购物车
  shopcar: {
    getList() {
      return _http.post('/shopGoods/shoppingCartList').then((response)=>{
        !response.data && (response.data = [])
        return response
      })
    },
    // 修改购物车数量
    editNum(shoppingCartId, number = 1) {
      return _http.post('/shopGoods/changeShoppingCart', {
        shoppingCartId, number
      })
    },
    // 添加商品到购物车
    add(formData) {
      return _http.post('/shopGoods/addShoppingCart', formData)
    },
    // 删除一个或多个购物车商品
    del(shoppingCartIds) { // id = '1,2,3'
      return _http.post('/shopGoods/delShoppingCart', {
        shoppingCartIds
      })
    }
  },
  // 订单
  order: {
    getList( type = 1) { // 订单列表
      return new List('Order', [type])
    },
    getInfo(orderId) {
      return _http.get('/Member/order/info', orderId)
    },
    addFromGoodsInfo(formData) { // 1从订单详情下单
      return _http.post('/shopGoods/addOrders', formData)
    },
    addFromShopcar(formData) { // 2从购物车下单
      return _http.post('/shopGoods/addOrdersOfshoppingCart', formData)
    },
    cancel(orderId) {
      return _http.put(`/Member/order/cancel/${orderId}`)
    },
    recive(orderId) {
      return _http.put(`/Member/order/order_recive/${orderId}`)
    },
    editInvoice(formData) {
      return _http.post('/shopUsers/addOrEditInvoiceInfo', formData)
    },
    getInvoice() {
      return _http.post('/shopUsers/myInvoiceInfo').then((response)=>{
        !response.data && (response.data = {})
        return response
      })
    }
  }
}

Vue.mixin({
  created() {
    // 异步通信
    // this.$http = _http

    // 判断设备
    this.$device = utils.device

    // 接口
    this.$server = _server

    // 本地缓存
    this.$storage = storage
  }
})


export default _server
