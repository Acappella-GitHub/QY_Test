const BAIDU_OCR = { token_name: 'BAIDU_OCR', url: 'https://aip.baidubce.com/oauth/2.0/token', data: { grant_type: 'client_credentials', client_id: 'LiQPCnDGmRg8P2VQFTde2lO4', client_secret: 'GaO3cueodQYqR8knHPw6Oy5BV3X0HrB5' } };
const BAIDU_ASR = { token_name: 'BAIDU_ASR', url: 'https://openapi.baidu.com/oauth/2.0/token', data: { grant_type: 'client_credentials', client_id: 'jorGwlwRQ8x5wtr8haGgIHNL', client_secret: 'V3Xkcdo4qeMr75O4vGEfa7qTLh3KdErT' } };

/**
 * request方法，发送一个OAuth2.0认证请求.
 * @function
 * @param {string} token_name - 令牌名称.
 * @param {string} url - OAuth2.0认证请求地址.
 * @param {string} data - 认证请求数据.
 */
function request(token_name, url, data) {
  return new Promise((resolve) => {
    wx.request({
      url,
      data,
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      method: 'POST',
      success: (result) => {
        switch (token_name) {
          case 'BAIDU_OCR':
            wx.setStorageSync(token_name, { expires_in: result.data.expires_in + Date.now(), access_token: result.data.access_token });
            break;
          case 'BAIDU_ASR':
            wx.setStorageSync(token_name, { expires_in: result.data.expires_in + Date.now(), access_token: result.data.access_token });
            break;
        }
        resolve(wx.getStorageSync(token_name).access_token);
      }
    });
  });
}

/**
 * Token类，获取令牌.
 * @classdesc 向外暴露获取令牌的静态方法.
 */
export default class Token {
  static token(callback) {
    const TOKEN = { BAIDU_OCR_TOKEN: '', BAIDU_ASR_TOKEN: '' };

    /** 判断令牌是否在本地缓存和是否已经过期 */
    if (!(wx.getStorageSync('BAIDU_OCR').expires_in - Date.now() > 86400)) {
      Promise.all([request(BAIDU_OCR.token_name, BAIDU_OCR.url, BAIDU_OCR.data), request(BAIDU_ASR.token_name, BAIDU_ASR.url, BAIDU_ASR.data)]).then((res) => { TOKEN.BAIDU_OCR_TOKEN = res[0]; TOKEN.BAIDU_ASR_TOKEN = res[1]; return TOKEN; }).then(callback);
    } else {
      TOKEN.BAIDU_OCR_TOKEN = wx.getStorageSync('BAIDU_OCR').access_token;
      TOKEN.BAIDU_ASR_TOKEN = wx.getStorageSync('BAIDU_ASR').access_token;
      callback(TOKEN);
    }
  }
}