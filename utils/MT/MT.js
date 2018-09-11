import MD5 from '../MD5/MD5.js'

export default class MT {
  static translate(source_language, target_language, original_text) {
    return new Promise(function (resolve) {
      wx.request({
        url: 'https://fanyi-api.baidu.com/api/trans/vip/translate',
        data: {
          q: original_text,
          from: source_language,
          to: target_language,
          appid: '20180517000161197',
          salt: Date.now(),
          sign: MD5.encrypt('20180517000161197' + original_text + Date.now() + '8TAGPW2Ckk_4_LiLa1Gm'),
        },
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        method: 'POST',
        success: function (result) {
          // console.log(result.data.trans_result[0].dst);
          resolve(result.data.trans_result[0].dst);
        }
      })
    });
  }
}