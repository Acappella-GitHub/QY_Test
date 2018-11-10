import Tool from 'Tool.js'
import OCR from '../../utils/OCR/OCR.js'
import MT from '../../utils/MT/MT.js'

const recog_lang_arr = [["AUTO", "自动检测"], ["CHN_ENG", "中英混合"], ["ENG", "英语"], 
["POR", "葡萄牙语"], ["FRE", "法语"], ["GER", "德语"], ["ITA", "意大利语"], ["SPA", "西班牙语"], 
["RUS", "俄语"], ["JAP", "日语"], ["KOR", "韩语"]];
const trans_lang_arr = [["zh", "中文"], ["en", "英语"], ["yue", "粤语"],
["wyw", "文言文"], ["jp", "日语"], ["kor", "韩语"], ["fra", "法语"], ["spa", "西班牙语"],
["th", "泰语"], ["ara", "阿拉伯语"], ["ru", "俄语"], ["pt", "葡萄牙语"], ["de", "德语"],
["it", "意大利语"], ["el", "希腊语"], ["nl", "荷兰语"], ["pl", "波兰语"], ["bul", "保加利亚语"],
["est", "爱沙尼亚语"], ["dan", "丹麦语"], ["fin", "芬兰语"], ["cs", "捷克语"], ["rom", "罗马尼亚语"],
["slo", "斯洛文尼亚语"], ["swe", "瑞典语"], ["hu", "匈牙利语"], ["cht", "繁体中文"], ["vie", "越南语"]];
const recog_res_arr = [];
const trans_res_arr = [];
let tans_switch = true;

Component({
  data: {
    multi_array: [recog_lang_arr.map((val) => {return val[1]}), trans_lang_arr.map((val) => {return val[1]})],
    picker_text: recog_lang_arr[0][1] + " → " + trans_lang_arr[0][1],
    recog_lang: recog_lang_arr[0][0],
    trans_lang: trans_lang_arr[0][0],
    result_text: [],

    display: false,
    image_path: "",
    image_width: "",
    image_height: "",
    current_target_id: "",
    scroll_top: 0,
    scroll_left: 0
  },

  methods: {
    bindMultiPickerChange: function(e) {
      this.setData({
        picker_text: recog_lang_arr[e.detail.value[0]][1] + " → " + trans_lang_arr[e.detail.value[1]][1],
        recog_lang: recog_lang_arr[e.detail.value[0]][0],
        trans_lang: trans_lang_arr[e.detail.value[1]][0]
      });
    },

    translate: function() {
      const that = this;
      if (tans_switch) {
        MT.translate(this.data.recog_lang, this.data.trans_lang, recog_res_arr, function (res) {
          res.map((val) => { trans_res_arr.push(val + "\n") });
          recog_res_arr.map((val, i) => { trans_res_arr.splice(i * 2, 0, val) })
          that.setData({
            result_text: trans_res_arr
          })
        })
        tans_switch = false;
      }
    },

    chooseImage: function (event) {
      const that = this;
      Tool.chooseImage((res) => {
        that.setData({
          display: true,
          image_path: res.path,
          image_width: res.width + "px",
          image_height: res.height + "px"
        })

        OCR.recognition('', res.path, (res) => {
          res.map((val) => {recog_res_arr.push(val + "\n")})
          that.setData({
            result_text: recog_res_arr
          });
          tans_switch = true;
        });
      });
    },

    closeImage: function (event) {
      recog_res_arr.length = 0;
      trans_res_arr.length = 0;
      this.setData({
        display: false,
        result_text: []
      })
    },

    getCurrentTargetId: function (event) {
      this.setData({
        current_target_id: event.currentTarget.id
      })
    },

    syncRoll: function (event) {
      if (event.currentTarget.id === this.data.current_target_id) {
        this.setData({
          scroll_top: event.detail.scrollTop,
          scroll_left: event.detail.scrollLeft
        });
      }
    }
  }
})

// function chooseImage(that) {
//   wx.chooseImage({
//     count: 1,
//     success: function (result) {
//       wx.getImageInfo({
//         src: result.tempFilePaths[0],
//         success: function (result) {
//           that.setData({
//             display: false,
//             image_path: result.path,
//             image_width: result.width + "px",
//             image_height: result.height + "px"
//           })
//         }
//       })
//     }
//   })
// }
