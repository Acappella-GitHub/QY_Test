export default class MT {
  static translate() {
    wx.request({
      url: 'https://fanyi-api.baidu.com/api/trans/vip/translate',
      
    })
  }
}