const BAIDU_OCR = {url: 'https://aip.baidubce.com/oauth/2.0/token', data: {grant_type: 'client_credentials', client_id: 'LiQPCnDGmRg8P2VQFTde2lO4', client_secret: 'GaO3cueodQYqR8knHPw6Oy5BV3X0HrB5'}}

const BAIDU_ASR = {url: 'https://openapi.baidu.com/oauth/2.0/token', data: {grant_type: 'client_credentials', client_id: 'jorGwlwRQ8x5wtr8haGgIHNL', client_secret: 'V3Xkcdo4qeMr75O4vGEfa7qTLh3KdErT'}}

/**
 * 
 */
export default class ASKey {
  static getASKey(token_name) {
    let as_key = null;
    switch (token_name){
      case 'BAIDU_OCR':
        as_key = BAIDU_OCR;
        break;

      case 'BAIDU_ASR':
        as_key = BAIDU_ASR;
        break;
    }

    return as_key;
  }
}