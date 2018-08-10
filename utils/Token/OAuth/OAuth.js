import ASKey from './ASKey.js'

/**
 * 
 */
export default class OAuth {
  static oAuth(token_name) {
    const as_key = ASKey.getASKey(token_name);
    wx.request({
      url: as_key.url,
      data: as_key.data,
      header: {'content-type': 'application/x-www-form-urlencoded'},
      method: 'POST',
      success: (result) => {
        const token = {expires_in: result.data.expires_in + Date.now(), access_token: result.data.access_token};
        wx.setStorageSync(token_name, token);
      }
    })
  }
}