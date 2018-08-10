import Token from "../../utils/Token/Token.js"

const app = getApp();

Page({
  onLoad: function() {
    app.globalData.BAIDU_OCR = Token.getToken("BAIDU_OCR");
    app.globalData.BAIDU_ASR = Token.getToken("BAIDU_ASR");

    console.log(app.globalData.BAIDU_OCR);
    console.log(app.globalData.BAIDU_ASR);
  }
})
