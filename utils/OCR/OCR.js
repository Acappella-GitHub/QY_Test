const app = getApp();

export default class OCR {
  static recognition() {
    wx.request({
      url: 'https://aip.baidubce.com/rest/2.0/ocr/v1/general_basic',
      data: {
        access_token: app.globalData.BAIDU_OCR.access_token,
        
      },
      header: {'content-type': 'application/x-www-form-urlencoded'},
      method: 'POST',
    })
  }
}