import mui from 'libs/mui/js/mui'
import Vue from 'vue'
import { storage, utils } from 'assets/js/utils'

// 测试
// let baseUrl = 'http://119.23.30.245:8080/useeproject/interface'
// let baseUrl = 'http://api.deyila.cn/useeproject/interface'
let appid = 'wxb022237ad49ef61f'
let baseUrl = 'http://api.deyila.cn/useeproject/interface'
let qrcode = require('assets/images/usee-test.jpg')

// 正式
if (['h5.usee1.com.cn', 'h5.ushiyihao.com', 'shoptest.deyila.cn'].indexOf(window.location.host) > -1) {
  // baseUrl = 'https://api.usee1.com.cn/useeproject/interface'
  // baseUrl = 'https://bird.ioliu.cn/v1?url=' + baseUrl
  appid = 'wxc81b31922070b7ae'
  baseUrl = 'http://apitest.deyila.cn/useeproject/interface'
  qrcode = require('assets/images/usee-online.jpg')
}

const errorPromise = function(message = '') {
  return new Promise((resolve, reject) => {
    reject({ message })
  })
}
const _http = {
  ajax(url = '', data = {}, type = 'GET', contentType = 'form') {
    url = baseUrl + url
    let headers = {
      // 'sessionId': storage.local.get('sessionId') || '',
      'Content-Type': 'application/x-www-form-urlencoded'
    }

    if (contentType === 'json' || type === 'PUT') {
      // headers['Content-Type'] = 'text/plain'
      data = JSON.stringify(data)
    }
    data.sessionId = storage.local.get('sessionId')

    return new Promise((resolve, reject) => {
      mui.ajax(url, {
        data,
        type,
        headers,
        dataType: 'json',
        timeout: 60000,
        success(response, status, xhr) {
          mui.closePopups()
          !response.message && (response.message = '系统繁忙')
          if (response.resultCode === 4002) { // 登录失效
            mui.hideWaiting()
            storage.local.remove('sessionId')
            mui.alert(response.message, ()=>{
              _server.logout(false)
            })
            setTimeout(()=>{
              mui.closePopups()
            }, 3000)
            reject(response.message)
          } else if (response.resultCode !== 200) {
            mui.hideWaiting()
            mui.alert(response.message)
            reject(response.message)
          } else {
            resolve(response)
          }
        },
        error(xhr, errorType, error) {
          mui.hideWaiting()
          mui.closePopups()
          mui.toast('服务器连接失败')
          reject(error)
        }
      })
    })
  },
  get(url = '', data) {
    return this.ajax(url)
  },
  delete(url = '', data) {
    return this.ajax(url, undefined, 'DELETE')
  },
  post(url, data, contentType = 'form') {
    return this.ajax(url, data, 'POST', contentType)
  },
  put(url, data, contentType = 'json') {
    return this.ajax(url, data, 'PUT', contentType)
  }
}

const _server = {
  getHost() {
    return window.location.origin
  }, 
  getWxQrcode() {
    return qrcode
  },
  getImageBase64(imagePath) {
    return _http.post('/shopUsers/imageBase64', {path: imagePath}).then((response) => {
      !response.data && (response.data = '')
      response.data = 'data:image/jpg;base64,' + response.data
      return response
    })
  },
  // 获取微信授权路径 url为绝对路径
  getGrantUrl(url, params) {
    if (!url) return ''
    url = window.location.origin + utils.url.setArgs(url, params)
    return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${url}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
  },
  // 获取jssdk授权配置 promise返回一个对象(wx or {})
  getWxConfig(url) {
    // if(!url){
    //   url = utils.isWeb ? window.location.href : storage.session.get('wx_url')
    // }
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
      if (!window.wx) {
        // reject('找不到wx对象')
        window.wx = {
          _ready: false
        }
        resolve(window.wx)
      } else {
        if (!utils.device.isWechat || window.wx._ready) {
          resolve(window.wx)
          return
        }

        _http.post('/shopOrderPay/getConfig', { url }).then(({ data }) => {
          config.appId = data.appId
          config.timestamp = data.timestamp
          config.nonceStr = data.nonceStr
          config.signature = data.signature

          window.wx.config(config)

          window.wx.error((res) => {
            console.log('微信JS-SDK权限验证失败', res)
            
            // 第一次权限验证失败再利用当前地址尝试一下
            if (!window.wx._tried && res.errMsg === 'config:invalid signature' && url !== window.location.href) { 
              window.wx._tried = true // 标识已经尝试验证过，不再尝试
              window.wx._ready = false
              resolve(self.getWxConfig(window.location.href))
            } else {
              resolve(window.wx)
            }
          })

          window.wx.ready((res) => {
            console.log('微信JS-SDK权限验证成功', res)
            window.wx._ready = true
            resolve(window.wx)
          })
        }).catch(() => {
          console.log('微信JS-SDK权限验证配置获取失败')
          resolve(window.wx)
        })
      }
    })
    return promise
  },
  getWxPayConfig(formData = {}) { // 微信支付配置
    let promise = new Promise((resolve, reject) => {
      if (!formData.orderId) {
        reject('支付失败：订单id不存在')
        mui.alert('支付失败：订单id不存在')
        return
      }
      if (storage.session.get('openId')) {
        formData.openId = storage.session.get('openId')
      }
      _http.post('/shopOrderPay/pay/prepare', formData).then(({ data }) => {
        storage.session.set('buy_become_agent', data.isAgent || 0)
        storage.session.set('openId', data.openId)
        resolve(data.payInfo)
      }).catch(reject)
    })

    return promise
  },
  chooseWXPay(formData) { // 微信jssdk支付
    let promise = new Promise((resolve, reject) => {
      if (!utils.device.isWechat) {
        mui.toast('请使用微信浏览器支付')
        reject('请使用微信浏览器支付')
        return
      }
      this.getWxConfig().then((wx) => {
        if (wx._ready) {
          mui.showWaiting('正在支付...')
          this.getWxPayConfig(formData).then((data) => {
            wx.chooseWXPay({
              timestamp: data.timeStamp,
              nonceStr: data.nonceStr,
              package: data.package,
              signType: data.signType,
              paySign: data.paySign,
              success(res) {
                if (res.err_msg === 'get_brand_wcpay_request:ok') {
                  resolve('ok')
                } else if (res.err_msg === 'get_brand_wcpay_request:cancel') {
                  reject('cancel')
                } else if (res.err_msg === 'get_brand_wcpay_request:fail') {
                  // mui.alert('支付失败，如有疑问请联系客服')
                  reject('fail')
                } else {
                  resolve('支付回调成功')
                }
              }
            })
          }).catch(reject).finally(()=>{
            mui.hideWaiting()
          })
        } else {
          mui.toast('微信jssdk不可用')
          reject('微信jssdk不可用')
        }
      })
    })
    return promise
  },
  chooseWXPay2(formData) { // 微信浏览器支付
    let promise = new Promise((resolve, reject) => {
      if (!utils.device.isWechat) {
        mui.toast('请使用微信浏览器支付')
        reject('请使用微信浏览器支付')
        return
      }
      mui.showWaiting('正在支付...')
      this.getWxPayConfig(formData).then((data) => {
        let onBridgeReady = function(){
          WeixinJSBridge.invoke('getBrandWCPayRequest', data, (res) => {
            if (res.err_msg === 'get_brand_wcpay_request:ok') {
              resolve('ok')
            } else if (res.err_msg === 'get_brand_wcpay_request:cancel') {
              reject('cancel')
            } else if (res.err_msg === 'get_brand_wcpay_request:fail') {
              // mui.alert('支付失败，如有疑问请联系客服')
              reject('fail')
            } else {
              resolve('支付回调成功')
            }
          })
        }
        if (typeof WeixinJSBridge == 'undefined') {
          document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false)
        } else {
          onBridgeReady()
        }
      }).catch(reject).finally(()=>{
        mui.hideWaiting()
      })
    })

    return promise
  },
  previewImage(imgs = [], index = 0) {
    return new Promise((resolve, reject) => {
      mui.showWaiting()
      this.getWxConfig().then((wx) => {
        if (wx._ready) {
          wx.previewImage({
            current: imgs[index], // 当前显示图片的http链接
            urls: imgs, // 需要预览的图片http链接列表
            fail(err) {
              mui.alert('预览图片失败：' + err.errMsg)
            }
          })
          resolve(wx)
        } else {
          reject('请在微信浏览器内预览图片')
        }
      }).finally(() => {
        mui.hideWaiting()
      })
    })
  },
  wxShare(shareInfo) {
    return new Promise((resolve, reject) => {
      if(!shareInfo) {
        reject(window.wx, '分享信息为空')
        return
      }
      mui.showWaiting()
      this.getWxConfig().then((wx) => {
        if (wx._ready) {
          let _info = {
            title: shareInfo.title,             // 分享标题
            desc: shareInfo.desc,
            link: shareInfo.link,               // 分享链接
            imgUrl: shareInfo.imgUrl,           // 分享图标
            success: resolve,
            cancel: reject
          }
          wx.onMenuShareTimeline(_info)
          wx.onMenuShareAppMessage(_info)
          wx.onMenuShareQQ(_info)
          wx.onMenuShareWeibo(_info)
          wx.onMenuShareQZone(_info)

          resolve(wx, '微信分享授权成功')
        }else{
          reject(wx, '微信分享授权失败')
        }
      }).finally(() => {
        mui.hideWaiting()
      })
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

    let promise = new Promise((resolve) => {
      if (position) { // 先取缓存
        resolve(position)
      } else {
        this.getWxConfig().then((wx) => {
          if (wx._ready) { // 调取微信地址位置接口
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
          } else { // h5获取位置
            navigator.geolocation.getCurrentPosition((response) => {
              position.latitude = response.coords.latitude
              position.longitude = response.coords.longitude
              storage.local.set('position', position, 1000 * 1800)
              resolve(position)
            }, error => {
              let errHtml = ''
              switch (error.code) {
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
      if (address) {
        resolve(address)
      } else {
        self.getPosition().then((position) => {
          mui.ajaxJSONP('http://apis.map.qq.com/ws/geocoder/v1/', {
            params: {
              location: position.latitude + ',' + position.longitude,
              key: 'GPIBZ-V7YH3-CD735-3HDQM-CNM3F-4PFQP',
              output: 'jsonp'
            }
          }, function({ body }) {
            if (body.status == 0) {
              storage.local.set('address', body.result, 1000 * 1800);
              resolve(body.result)
            } else {
              resolve(ret)
            }
          })
        })
      }
    })
    return promise
  },
  // 获取两个经纬度的距离
  getDistance(lng1 = 0, lat1 = 0, lng2 = 0, lat2 = 0) {
    let EARTH_RADIUS = 6378137.0 //单位M
    let PI = Math.PI
    let getRad = function(d) {
      return d * PI / 180.0
    }

    let f = getRad((lat1 + lat2) / 2)
    let g = getRad((lat1 - lat2) / 2)
    let l = getRad((lng1 - lng2) / 2)

    let sg = Math.sin(g)
    let sl = Math.sin(l)
    let sf = Math.sin(f)

    let s, c, w, r, d, h1, h2
    let a = EARTH_RADIUS
    let fl = 1 / 298.257

    sg = sg * sg
    sl = sl * sl
    sf = sf * sf

    s = sg * (1 - sl) + (1 - sf) * sl
    c = (1 - sg) * (1 - sl) + sf * sl

    w = Math.atan(Math.sqrt(s / c))
    r = Math.sqrt(s * c) / w
    d = 2 * w * a
    h1 = (3 * r - 1) / 2 / c
    h2 = (3 * r + 1) / 2 / s

    let m = d * (1 + fl * (h1 * sf * (1 - sg) - h2 * (1 - sf) * sg))

    if (Number.isNaN(m)) {
      return 0
    }

    return Number((m / 1000).toFixed(2))
  },
  // 发送手机验证码
  sendMobiCode(phone, btn) {
    if (!/^1\d{10}$/.test(phone)) {
      mui.alert('请输入正确手机号码')
      return errorPromise('请输入正确手机号码')
    }

    let time = 30
    let oldtext = ''
    let timeid = 0
    if (btn) {
      btn.setAttribute('disabled', true)
      oldtext = btn.textContent
      timeid = setInterval(() => {
        if (--time >= 0) {
          btn.textContent = `${time}s`
        } else {
          clearInterval(timeid)
          btn.removeAttribute('disabled')
          btn.textContent = oldtext
        }
      }, 1000)
    }

    let promise = _http.post('/shopUsers/phoneVerifyCode', { phoneNumber: phone })
    promise.then((response) => {
      mui.toast('验证码已发送到您的手机上')
        // response.data = response.data ? response.data : '1234'
      return response
    }).catch(() => {
      clearInterval(timeid)
      btn.removeAttribute('disabled')
      btn.textContent = oldtext
    })

    return promise
  },
  // 注销
  logout(tipText = '请先登录', toUrl = window.location.pathname) {
    let sessionId = storage.local.get('sessionId')
    if (sessionId) {
      _http.post('/shopUsers/loginOut', { sessionId })
    }

    // 清除缓存
    storage.local.remove('sessionId')
    storage.local.remove('userInfo')
    storage.local.remove('buy_slted_address')

    tipText && mui.toast(tipText)
    if (utils.device.isWechat) {
      // 避免登录后跳转到登录页面
      toUrl = toUrl === '/login' ? '/index' : toUrl
      window.location.replace(_server.getGrantUrl('/login', { to: toUrl }))
    } else {
      Vue._link(`/login?to=${toUrl}`, 'page-in')
    }
  },
  // 检测登录
  checkLogin() {
    return storage.local.get('sessionId')
  },
  // 登录
  login(type, formData = {}) {
    var url = type == 1 ? '/shopUsers/loginPassword' : '/shopUsers/loginCode'
    formData.qrUserCode = storage.session.get('bind_qrcode') || ''
    return _http.post(url, formData).then((response) => {
      !response.data && (response.data = {})
      response.data.avatar = utils.image.wxHead(response.data.image)
      storage.local.set('userInfo', response.data)
      return response
    })
  },
  // 注册
  register(formData = {}) {
    formData.qrUserCode = storage.session.get('bind_qrcode') || ''
    return _http.post('/shopUsers/register', formData).then((response) => {
      !response.data && (response.data = {})
      response.data.avatar = utils.image.wxHead(response.data.image)
      storage.local.set('userInfo', response.data)
      return response
    })
  },
  // 修改密码、找回密码
  changePwd(formData) {
    return _http.post('/shopUsers/forgetPassword', formData).then((response) => {
      !response.data && (response.data = {})
      return response
    })
  },
  // 首页幻灯片
  getBanner() {
    return _http.post('/carouselFigure/getImages').then((response) => {
      !response.data && (response.data = [])
      return response
    })
  },
  user: {
    getInfo(remote) {
      return new Promise((resolve)=>{
        if(!_server.checkLogin()){
          resolve({data: {}})
          return
        }

        let userInfo = storage.local.get('userInfo')
        if(!remote && userInfo){
          resolve({data: userInfo})
        }else{
          _http.post('/shopUsers/refresh').then((response) => {
            !response.data && (response.data = {})
            response.data.avatar = utils.image.wxHead(response.data.image)
            storage.local.set('userInfo', response.data, 1000*60*15)
            resolve(response)
          })
        }
      })
    },
    getBankInfo() {
      return _http.post('/shopUsers/myBankInfo').then((response) => {
        !response.data && (response.data = {})
        return response
      })
    },
    withdrawals(formData) {
      return _http.post('/shopUsers/withdrawals', formData).then((response) => {
        !response.data && (response.data = {})
        return response
      })
    },
    getWithdrawalsRecord(startDate = '', finishDate = '', page = 1, rows = 10) {
      return _http.post('/shopUsers/withdrawalsRecord', {
        startDate, finishDate, page, rows
      }).then((response) => {
        !response.data && (response.data = {})
        response.data.rows = rows
        return response
      })
    },
    getRebateRecord(startDate = '', finishDate = '', page = 1, rows = 10) {
      return _http.post('/shopUsers/rebateRecord', {
        startDate, finishDate, page, rows
      }).then((response) => {
        !response.data && (response.data = {})
        response.data.rows = rows
        return response
      })
    },
    getCustomer(isSuccess = 1, page = 1, rows = 10) {
      return _http.post('/shopUsers/myCustomer', {
        isSuccess, page, rows
      }).then((response) => {
        !response.data && (response.data = {})
        response.data.rows = rows
        return response
      })
    },

    bind(qrUserCode) {
      qrUserCode = qrUserCode || storage.session.get('bind_qrcode') || ''
      if(!qrUserCode) {
        return errorPromise('没有检测到二维码')
      }

      if(!_server.checkLogin()){
        return errorPromise('用户未登录') 
      }

      storage.local.set('bind_qrcode', qrUserCode)
      return _http.post('/shopUsers/bindingCheck', { qrUserCode }).then((response) => {
        !response.data && (response.data = {})
        return response
      })
    }
  },
  // 地址
  address: {
    getList() {
      return _http.post('/shopUsers/myAddressList').then((response) => {
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
      return _http.post('/shopGoods/goodsSearch', { isIndex: recommend }).then((response) => {
        !response.data && (response.data = [])
        return response
      })
    },
    getGoodsInfo(goodsId = '') {
      return _http.post('/shopGoods/goodsInfo', { goodsId }).then((response) => {
        !response.data && (response.data = {})
        return response
      })
    }
  },
  // 购物车
  shopcar: {
    getList() {
      return _http.post('/shopGoods/shoppingCartList').then((response) => {
        !response.data && (response.data = [])
        return response
      })
    },
    // 修改购物车数量
    editNum(shoppingCartId, number = 1) {
      return _http.post('/shopGoods/changeShoppingCart', {
        shoppingCartId,
        number
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
    },
    getNum() {
      return new Promise((resolve)=>{
        if(_server.checkLogin()){
          let shopcarNumber = storage.session.get('shopcarNumber')
          if(shopcarNumber){
            resolve({ data: shopcarNumber })
          }else{
            _http.post('/shopGoods/shoppingCartNumber').then((response) => {
              !response.data && (response.data = 0)
              storage.session.set('shopcarNumber', response.data)
              resolve(response)
            })  
          }
        }else{
          resolve({ data: 0 })
        }
      })
    }
  },
  // 订单
  order: {
    getList(status = 'ALL', page = 1, rows = 10) { // 订单列表 ALL UNPAY RECEIVE EVALUATE
      return _http.post('/shopUsers/myOrders', {
        status,
        page,
        rows
      }).then((response) => {
        !response.data && (response.data = [])
        response.data.rows = rows
        return response
      })
    },
    changeStatus(orderId, status) { // CANCEL RECEIVE
      let ordersState = ''
      switch (status) {
        case 'CANCEL':
          ordersState = -1
          break
        case 'RECEIVE':
          ordersState = 5
          break
      }
      return _http.post('/shopUsers/changeOrderState', {
        orderId,
        ordersState
      })
    },
    getInfo(orderId) {
      return _http.post('/shopGoods/orderInfo', { orderId }).then((response) => {
        !response.data && (response.data = {})
        return response
      })
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
      return _http.post('/shopUsers/myInvoiceInfo').then((response) => {
        !response.data && (response.data = {})
        return response
      })
    },
    getExpressInfo(orderId = '17') {
      return _http.post('/shopGoods/expressInfo', {
        orderId
      })
    }
  }
}
Vue.mixin({
  created() {
    // 判断设备
    this.$device = utils.device
    // 接口
    this.$server = _server
    // 本地缓存
    this.$storage = storage
  }
})
export default _server
