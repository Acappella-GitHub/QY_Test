import Token from "/utils/Token/Token.js"

App({
  onLaunch: function() {
    // wx.clearStorageSync();

    // console.log(wx.getStorageSync('BAIDU_OCR').expires_in - Date.now());

    Token.token((res) => {
      this.globalData.BAIDU_OCR_TOKEN = res.BAIDU_OCR_TOKEN;
      this.globalData.BAIDU_ASR_TOKEN = res.BAIDU_ASR_TOKEN;

      console.log(this.globalData.BAIDU_OCR_TOKEN);
      console.log(this.globalData.BAIDU_ASR_TOKEN);
      console.log(res);
    });
  },

  globalData: {
    BAIDU_OCR_TOKEN: "",
    BAIDU_ASR_TOKEN: ""
  }
})