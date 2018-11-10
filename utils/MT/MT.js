import MD5 from '../MD5/MD5.js'

const url = 'https://fanyi-api.baidu.com/api/trans/vip/translate';
const appid = '20180517000161197';
const skey = '8TAGPW2Ckk_4_LiLa1Gm';
let salt = Date.now();

function promise(source_language, target_language, original_text) {
  return new Promise(function (resolve) {
    wx.request({
      url,
      data: {
        appid,
        salt,
        from: source_language,
        to: target_language,
        q: original_text,
        sign: MD5.encrypt(appid + original_text + salt + skey),
      },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      method: 'POST',
      success: function (result) {
        let res = "";

        if (result.data.trans_result) {
          res = result.data.trans_result[0].dst
        } else {
          res = "错误码：" + result.data.error_code + "，错误信息：" + result.data.error_msg;
        }

        resolve(res);
      }
    })
  })
}

export default class MT {
  static translate(src_lang, dst_lang, original_text, callback) {
    if (Object.prototype.toString.call(original_text) === "[object String]") {
      promise(src_lang, dst_lang, original_text).then(callback);
    } else if (Object.prototype.toString.call(original_text) === "[object Array]") {
      Promise.all(original_text.map((val) => {return promise(src_lang, dst_lang, val)})).then(callback);
    }
  }
}