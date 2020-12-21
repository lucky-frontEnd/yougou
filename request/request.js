// 同时发送异步代码的次数
let ajaxTime = 0;

export default function request(options) {
  ajaxTime++;
  // 显示加载中 效果
  wx.showLoading({
    title: '加载中',
    mask: true
  })
  const baseURL = 'https://api-hmugo-web.itheima.net/api/public/v1'
  return new Promise((resolve, reject) => {
    wx.request({
      // ...options,
      url: baseURL + options.url,
      methods: options.methods || 'get',
      data: options.data || {},
      success: res => resolve(res.data.message),
      fail: reject,
      complete: () => {
        ajaxTime--;
        if(ajaxTime === 0) {
          // 关闭图标
          wx.hideLoading()
        }
      }
    })
  })
}