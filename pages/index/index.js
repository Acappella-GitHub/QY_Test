const app = getApp();

Page({
  data: {disp: 'ocr'},

  onLoad: function() {},

  switch: function(event) {
    switch (event.target.dataset.name) {
      case 'ocr-tab':
        this.setData({ disp: 'ocr' })
        break;
      case 'asr-tab':
        this.setData({ disp: 'asr' })
        break;
      case 'mt-tab':
        this.setData({ disp: 'mt' })
        break;
    }
  }
})
