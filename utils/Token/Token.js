import OAuth from './OAuth/OAuth.js'

/**
 * 
 */
export default class Token {
  static setToken(token_name) {
    const token = wx.getStorageSync(token_name);
    if ((!token) || ((token.expires_in - Date.now()) < 86400)) {
      OAuth.oAuth(token_name);
    }
  }

  static getToken(token_name) {
    return wx.getStorageSync(token_name);
  }
}