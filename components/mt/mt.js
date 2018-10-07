import MT from '../../utils/MT/MT.js'

const lang_arr = [["auto", "自动检测"], ["zh", "中文"], ["en", "英语"], ["yue", "粤语"],
["wyw", "文言文"], ["jp", "日语"], ["kor", "韩语"], ["fra", "法语"], ["spa", "西班牙语"],
["th", "泰语"], ["ara", "阿拉伯语"], ["ru", "俄语"], ["pt", "葡萄牙语"], ["de", "德语"],
["it", "意大利语"], ["el", "希腊语"], ["nl", "荷兰语"], ["pl", "波兰语"], ["bul", "保加利亚语"],
["est", "爱沙尼亚语"], ["dan", "丹麦语"], ["fin", "芬兰语"], ["cs", "捷克语"], ["rom", "罗马尼亚语"],
["slo", "斯洛文尼亚语"], ["swe", "瑞典语"], ["hu", "匈牙利语"], ["cht", "繁体中文"], ["vie", "越南语"]];
const src_lang_arr = lang_arr.map((val) => {return val[1]});
const dst_lang_arr = src_lang_arr.slice(1);

Component({
  data: {
    multi_array: [src_lang_arr, dst_lang_arr],
    picker_text: src_lang_arr[0] + " → " + dst_lang_arr[0],
    src_lang: lang_arr[0][0],
    dst_lang: lang_arr[1][0],
    translate_text: ""
  },

  methods: {
    bindMultiPickerChange: function(e) {
      this.setData({
        picker_text: src_lang_arr[e.detail.value[0]] + " → " + dst_lang_arr[e.detail.value[1]],
        src_lang: lang_arr[e.detail.value[0]][0],
        dst_lang: lang_arr[e.detail.value[1]+1][0]
      });
    },

    translate: function() {
      const that = this;
      const query = wx.createSelectorQuery().in(this);
      query.select('#textarea').fields({properties: ['value']}, function (res) {
        const reg = /[\S]+/m;
        if (reg.test(res.value)) {
          MT.translate(that.data.src_lang, that.data.dst_lang, res.value, function (trans_res) {
            that.setData({
              translate_text: trans_res
            })
          })
        }
      }).exec()
    }
  }
})
