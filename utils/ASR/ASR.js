const app = getApp();

export default class ASR {
  static recognition(img_path, size, callback) {
    const buf = 
    wx.request({
      url: 'https://vop.baidu.com/server_api',
      data: {
        token: app.globalData.BAIDU_OCR_TOKEN,
        cuid: "12345678",

        format: "wav",
        rate: "16000",
        channel: "1",
        
        dev_pid: 1536,
        speech: wx.getFileSystemManager().readFileSync(img_path, 'base64'),
        len: size
      },
        header: {'content-type': 'application/json'},
      method: 'POST',
      success: function (res) {
        callback(res.data.result);
      }
    })
  }
}