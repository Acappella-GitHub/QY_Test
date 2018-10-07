function wxGetImageInfo(src, size, callback) {
  wx.getImageInfo({
    src,
    success: function (result) {
      if ((result.width > 2048 || result.width < 15) || (result.height > 2048 || result.height < 15)){
        wx.showModal({
          title: ' 图片尺寸不符合要求 ',
          content: ' 图片的长和宽，不能小于15像素，或大于2048像素 ',
          showCancel: false
        })
        return;
      }

      switch(result.type) {
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'bmp':
          break;
        default:
          wx.showModal({
            title: ' 图片格式不符合要求 ',
            content: ' 图片的格式必须为 jpg、jpeg、png、bmp ',
            showCancel: false
          })
          return;
          break;
      }

      callback(result);
    }
  })
}

function wxChooseImage(callback) {
  wx.chooseImage({
    count: 1,
    success: function (result) {
      wxGetImageInfo(result.tempFiles[0].path, result.tempFiles[0].size, callback);
    }
  })
}

export default class Tool {
  static chooseImage(callback) {
    wxChooseImage(callback);
  }
}