const app = getApp();

export default class OCR {
  static recognition(olang, img_path) {
    wx.request({
      url: 'https://aip.baidubce.com/rest/2.0/ocr/v1/general_basic',
      data: {
        access_token: app.globalData.BAIDU_OCR_TOKEN,
        language_type: olang,
        image: wx.getFileSystemManager().readFileSync(img_path, 'base64'),
        detect_language: true
      },
      header: {'content-type': 'application/x-www-form-urlencoded'},
      method: 'POST',
      success: function(res) {
        console.log(res);
      }
    })
  }
}