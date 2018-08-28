function wxGetImageInfo(src) {
  wx.getImageInfo({
    src,
    success: function (result) {

    }
  })
}

function wxChooseImage() {
  wx.chooseImage({
    count: 1,
    sizeType: 'compressed',
    success: function (result) {
      // wxGetImageInfo(result.tempFiles[0].path);
      console.log(result.tempFiles[0].size);
    }
  })
}

export default class Tool {
  static chooseImage() {
    wxChooseImage();
  }
}