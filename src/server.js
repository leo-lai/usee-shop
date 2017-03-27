import Vue from 'vue'
import { storage, utils } from 'assets/js/utils'

// 测试
let appid = 'wx8069d2775c2f68ab'
let baseUrl = 'http://twww.dongcheshixiong.com'

// 正式
if(window.location.origin === 'http://wx.dongcheshixiong.com'){
  appid = 'wxa68cfebf01268d68'
  baseUrl = 'http://sas.dongcheshixiong.com'
}

const _http = {
  ajax(url = '', data = {}, type  = 'GET', contentType = 'form') {
    url = baseUrl + url
    let headers = {
      'Token': storage.local.get('token') || '',
      'Content-Type': 'application/x-www-form-urlencoded'
    }

    if(contentType === 'json' || type === 'PUT'){
      headers['Content-Type'] = 'text/plain'
      data = JSON.stringify(data)
    }
    return new Promise((resolve, reject)=>{
      $.ajax({
        url,
        data,
        type,
        headers,
        dataType: 'json',
        timeout: 60000,
        success(response, status, xhr) {
          // 登录失效 800001 800002 800003
          $.closeModal()
          if(response.status_code === 800001 || response.status_code === 800002 || 
            response.status_code === 800003) { 
            $.hideIndicator()
            $.alert(response.status_msg, ()=>{
              _server.logout()
            })
            reject(response.status_msg)
          }else if(response.status_code !== 0){
            $.hideIndicator()
            $.alert(response.status_msg)
            reject(response.status_msg)
          }else{
            // 修正接口数据规范
            !response.list && (response.list = [])
            !response.obj && (response.obj = {})
            resolve(response)
          }
        },
        error(xhr, errorType, error){
          $.hideIndicator()
          $.closeModal()
          $.alert('请求失败，请检查网络。')
          reject(error)
        }
      })
    })
  },
  get(url = '', ...data) {
    url = url + '/' + data.join('/')
    return this.ajax(url)
  },
  delete(url = '', ...data){
    url = url + '/' + data.join('/')
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
    return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${url}&response_type=code&scope=snsapi_userinfo&state=dcsx#wechat_redirect`
  },
  // 获取微信信息
  getWxByCode(code = '') {
    return _http.get('/Member/login', code).then((response)=>{
      storage.local.set('openid', response.obj.openid)
      return response
    })
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

        _http.post('/Member/verify/js_config', { url }).then(({ obj })=>{
          config.appId = obj.appid
          config.timestamp = obj.timestamp
          config.nonceStr = obj.noncestr
          config.signature = obj.signature

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
  getWxPayConfig(order_id) { // 微信支付配置
    let promise = new Promise((resolve, reject)=>{
      const openid = storage.local.get('openid')
      if(!order_id){
        reject('支付失败：订单id不存在')
        $.alert('支付失败：订单id不存在')
        return
      }

      if(!openid){
        reject('获取不到openid，请重新登录')
        $.alert('获取不到openid，请重新登录', ()=>{
          this.logout()
        })
        return
      }

      _http.post('/Api/Payment/wx_pay', {
        openid, order_id
      }).then(resolve).catch(reject)
    })

    return promise
  },
  chooseWXPay(order_id) { // 微信支付
    let promise = new Promise((resolve, reject)=>{
      if(!utils.device.isWechat){
        $.alert('请在微信浏览器进行支付')
        reject('请在微信浏览器进行支付')
        return
      }

      this.getWxConfig().then((wx)=>{
        if(wx._ready){
          this.getWxPayConfig(order_id).then(({obj})=>{
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
                  $.alert('支付失败，如有疑问请联系客服')
                  reject('fail')
                }else{
                  resolve('支付回调成功')
                }
              }
            })
          }).catch(reject)
        }else{
          $.alert('微信jsdk不可用')
          reject('微信jsdk不可用')
        }
      })
    })
    return promise
  },
  chooseWXPay2(order_id) {
    let promise = new Promise((resolve, reject)=>{
      if(!utils.device.isWechat){
        $.alert('请在微信浏览器进行支付')
        reject('请在微信浏览器进行支付')
        return
      }
      this.getWxPayConfig(order_id).then(({obj})=>{
        WeixinJSBridge.invoke('getBrandWCPayRequest', obj, (res)=>{
          if(res.err_msg === 'get_brand_wcpay_request:ok') {
            resolve('ok')
          }else if(res.err_msg === 'get_brand_wcpay_request:cancel'){
            reject('cancel')
          }else if(res.err_msg === 'get_brand_wcpay_request:fail'){
            $.alert('支付失败，如有疑问请联系客服')
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
    $.showIndicator()
    this.getWxConfig().then((wx)=>{
      if(wx._ready){
        wx.previewImage({
          current: imgs[index],     // 当前显示图片的http链接
          urls: imgs,               // 需要预览的图片http链接列表
          fail(err) {
            $.alert('预览图片失败：' + err.errMsg)
          }
        })    
      }else{
        $.alert('请在微信浏览器打开')
      }
    }).finally(()=>{
      $.hideIndicator()
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
          $.ajaxJSONP('http://apis.map.qq.com/ws/geocoder/v1/', {
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
    if(!phone) {
      $.alert('请输入正确手机号码')
      return
    }

    let time = 30
    let oldtext = ''
    let timeid = 0
    if(btn){
      btn.setAttribute('disabled', true)
      oldtext = btn.textContent
      timeid = setInterval(()=>{
        if(--time >= 0){
          btn.textContent = `${time}s后重新获取`
        }else{
          clearInterval(timeid)
          btn.removeAttribute('disabled')
          btn.textContent = oldtext
        }
      }, 1000)
    }

    let promise = _http.get(`/Member/verify/sms/${phone}`)
    promise.then((response)=>{
      $.toast('验证码已发送到您的手机上', 2000, 'l-toast')
    }).catch(()=>{
      clearInterval(timeid)
      btn.removeAttribute('disabled')
      btn.textContent = oldtext
    })

    return promise
  },
  // 注销
  logout(isRemote, toUrl = window.location.pathname) {
    storage.local.remove('token')
    if(utils.device.isWechat){
      // 避免登录后跳转到登录页面
      toUrl = toUrl === '/login' ? '/index' : toUrl
      window.location.replace(_server.getGrantUrl('/login', {to: toUrl}))
    }else{
      Vue._router.push('/login')
    }
  },
  // 登录
  login(formData) {
    return _http.post('/Member/login', formData)
  },
  // 电子报告
  getReport(carid) {
    return _http.get('/Member/electronic/report', carid)
  },
  // 车主资料
  user: {
    // 我的资料
    getInfo() {
      return _http.get('/Member/User/get_info')
    },
    // 我的优惠券
    getCoupons(type = 1) {
      return new List('UserCoupons', [type])
    },
    // 我的套餐
    getCombos() {
      return new List('UserCombos')
    },
    // 查询账户
    getCash() {
      return _http.get('/Member/pay/cash')
    },
    // 个人钱包支付
    cashPay(formData) {
      return _http.post('/Member/pay/cash_pay', formData)
    },
    // 钱包充值
    recharge(money = 0) {
      return _http.post('/Member/order/recharge', { money })
    }
  },
  // 分销商
  agent: {
    getQrcode() { // 分销商二维码
      return _http.get('/Member/User/get_grcode')
    },
    isTrue() { // 是否为分销商
      return _http.get('/Member/user/judge')
    },
    apply(formData) { // 申请为分销商
      return _http.post('/Member/user/apply', formData)
    },
    getRecord() { // 分销记录
      return new List('AgentRecord')
    }
  },
  // 股东
  holder: {
    getQrcode() {
      return _http.get('/Member/User/get_holder')
    },
    isTrue() { // 是否为股东
      return _http.get('/Member/holder/judge_holder')
    },
    // 股东信息
    getInfo() {
      return _http.get('/Member/holder/info')
    },
    // 提现记录
    getDrawal() {
      return new List('HolderDrawal')
    },
    // 我的人脉
    getMember() {
      return new List('HolderMember')
    },
    // 分红记录
    getRebate() {
      return new List('HolderRebate')
    }
  },
  // 活动信息
  activity: {
    getList() {
      return _http.get('/Member/Activity/list')
    }
  },
  // 有关车辆接口
  car: {
    getList() {
      return _http.get('/Member/Car/list')
    },
    getInfo(id) {
      return _http.get('/Member/Car/info', id)
    },
    edit(id, formData) {
      return _http.put(`/Member/Car/set/${id}`, formData)
    },
    add(formData) {
      return _http.post('/Member/Car/add', formData)
    },
    del(id){
      return _http.delete(`/Member/Car/delete/${id}`)
    },
    getBrands() {
      return _http.get('/Member/Car/brand')
    },
    getFamily(id) {
      return _http.get('/Member/car/family', id)
    },
    getGroup(id) {
      return _http.get('/Member/car/group', id)
    },
    getPailiang(id) {
      return _http.get('/Member/car/pailiang', id)
    },
    getModel(id) {
      return _http.get('/Member/car/model', id)
    }
  },
  // 优惠券
  coupon: {
    getList() {
      return new List('Coupons')
    },
    pick(coupon_id) {
      return _http.get('/Member/coupon/pick', coupon_id)
    }
  },
  // 套餐年卡
  combo: {
    getList() {
      return new List('Combos')
    },
    getInfo(suit_id) {
      return _http.get('/Member/combo/info', suit_id)
    },
    getService(suit_id, carid) {
      return _http.get('/Member/combo/detail', suit_id, carid)
    },
    getParts(service_id, carid) {
      return _http.get('/Member/combo/change_parts', service_id, carid)
    },
    // 购买套餐
    order(jsonData) {
      jsonData = JSON.stringify(jsonData)
      return _http.post('/Member/order/combo_order', {jsonstr: jsonData} )
    },
    pay(formData) { // 套餐支付
      return _http.post('/Member/pay/pay_combo', formData)
    }
  },
  // 商城
  shop: {
    // 一级分类
    getCategory1(page = 1, row = 50) { 
      return _http.get('/Member/shopping/fist_category_list', page, row)
    },
    // 二级分类
    getCategory2(category1_id) {
      return _http.get('/Member/shopping/second_category_list', category1_id)
    },
    // 商品列表
    getGoodsList(category1_id = 0, category2_id = 0, desc = 'DESC') {
      return new List('Goods', [desc, category1_id, category2_id])
    },
    // 商品详情
    getGoodsInfo(id){
      return _http.get('/Member/shopping/goods_detail', id)
    },
    // 获取立即购买信息
    getBuyInfo(id, longitude = 0, latitude = 0) {
      return _http.post('/Member/Shopping/order_info', {
        id,
        longitude,
        latitude
      })
    }
  },
  // 购物车
  shopcar: {
    getList() {
      return _http.get('/Member/cart/list')
    },
    // 修改购物车数量
    editNum(id, goods_number = 1) {
      return _http.post('/Member/cart/add_num_info', {
        id, goods_number
      })
    },
    // 添加商品到购物车
    add(id, goods_number = 1) {
      return _http.post('/Member/cart/add', {
        id, goods_number
      })
    },
    // 删除一个或多个购物车商品
    del(id) { // id = '1,2,3'
      return _http.post('/Member/cart/delete', {
        id
      })
    },
    // 获取购物车结算信息
    getBuyInfo(jsonData) {
      jsonData = JSON.stringify(jsonData)
      return _http.post('/Member/cart/settle', {jsonstr: jsonData} )
    }
  },
  // 订单
  order: {
    getList( type = 1) { // 订单列表
      return new List('Order', [type])
    },
    getInfo(order_id) {
      return _http.get('/Member/order/info', order_id)
    },
    add(formData) { // 单个商品下单
      return _http.post('/Member/order/goods', formData)
    },
    add2(jsonData) { // 多个商品下单
      jsonData = JSON.stringify(jsonData)
      return _http.post('/Member/order/cart_goods', {jsonstr: jsonData} )
    },
    getHistory() { // 订单(消费)记录
      return new List('OrderHistory')
    },
    cancel(order_id) {
      return _http.put(`/Member/order/cancel/${order_id}`)
    },
    recive(order_id) {
      return _http.put(`/Member/order/order_recive/${order_id}`)
    }
  },
  // 门店
  store: {
    getList(longitude = 0, latitude = 0) {
      return new List('Store', { longitude, latitude }, 'POST')
    },
    getInfo(id) {
      return _http.get('/Member/store/info', id)
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
