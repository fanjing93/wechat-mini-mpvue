import config from '../config'

const request = function ({
  url, data = {}, noToken = false, loadingTitle = '加载中...', noLoading = false, method = 'get', header = {}, success = res => {
  }, fail = res => {
  }, complete = res => {
    if (!noLoading) {
      wx.hideLoading()
    }
  }
} = {}, ...param) {
  if (!noLoading) {
    wx.showLoading({ title: loadingTitle })
  }
  method = method.toLocaleUpperCase()
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${config.http}://${config.host}${url}`,
      data: buildPostData(data, noToken),
      method: method, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: method === 'POST' || method === 'PUT' ? Object.assign({
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }, header) : header, // 设置请求的 header
      success: res => {
        if ((res.statusCode >= 200 && res.statusCode < 300) || res.statusCode === 304) {
          success(res.data)
          resolve(res.data)
        } else {
          reject(res)
        }
      },
      fail: res => {
        fail(res)
        reject(res)
      },
      complete: complete(noLoading),
      param
    })
  })
}

const buildPostData = function (data, noToken) {
  let userId = wx.getStorageSync('buyer_id')
  let paramsData = Object.assign({
    'shop_id': config.shopId
  }, data)
  if (userId) {
    paramsData['unique_code'] = userId
  }
  if (!noToken) {
    paramsData['buyer_token'] = wx.getStorageSync('buyer_token')
  }
  return paramsData
}

// 暴露出来供其他文件引用
export default request
