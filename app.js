import Token from "/utils/Token/Token.js"

App({
  onLaunch: function() {
    Token.setToken("BAIDU_OCR");
    Token.setToken("BAIDU_ASR");
  },

  globalData: {
    BAIDU_OCR: "",
    BAIDU_ASR: ""
  }
})