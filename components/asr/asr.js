import ASR from "../../utils/ASR/ASR.js"

const app = getApp();

const recog_lang_arr = [["1537", "普通话"], ["1737", "英语"]];
const trans_lang_arr = [["zh", "中文"], ["en", "英语"], ["yue", "粤语"],
["wyw", "文言文"], ["jp", "日语"], ["kor", "韩语"], ["fra", "法语"], ["spa", "西班牙语"],
["th", "泰语"], ["ara", "阿拉伯语"], ["ru", "俄语"], ["pt", "葡萄牙语"], ["de", "德语"],
["it", "意大利语"], ["el", "希腊语"], ["nl", "荷兰语"], ["pl", "波兰语"], ["bul", "保加利亚语"],
["est", "爱沙尼亚语"], ["dan", "丹麦语"], ["fin", "芬兰语"], ["cs", "捷克语"], ["rom", "罗马尼亚语"],
["slo", "斯洛文尼亚语"], ["swe", "瑞典语"], ["hu", "匈牙利语"], ["cht", "繁体中文"], ["vie", "越南语"]];
const recorder_manager = wx.getRecorderManager();
let timer_id = 0;

Component({
  data: {
    multi_array: [recog_lang_arr.map((val) => { return val[1] }), trans_lang_arr.map((val) => { return val[1] })],
    picker_text: recog_lang_arr[0][1] + " → " + trans_lang_arr[0][1],
    recog_lang: recog_lang_arr[0][0],
    trans_lang: trans_lang_arr[0][0],
    result_text: [],
    btn_text: "按住录音"
  },

  methods: {
    bindMultiPickerChange: function (e) {
      this.setData({
        picker_text: recog_lang_arr[e.detail.value[0]][1] + " → " + trans_lang_arr[e.detail.value[1]][1],
        recog_lang: recog_lang_arr[e.detail.value[0]][0],
        trans_lang: trans_lang_arr[e.detail.value[1]][0]
      });
    },

    translate: function () {
    },

    recordStart: function () {
      this.setData({ btn_text: "正在启动录音... (松开取消)" })

      let cnt = 1;
      timer_id = setInterval((sec, that)=>{
        if(cnt === 1){
          recorder_manager.start({
            sampleRate: 16000,
            encodeBitRate: 96000,
            numberOfChannels: 1,
          });
        }
        if (sec === new Date().getSeconds()){
          recorder_manager.pause();
          that.setData({btn_text: "已达到最大录音时间(1分钟)"});
          clearInterval(timer_id);
        } else {
          that.setData({ btn_text: `正在录音 (${cnt++}s)`});
        }
      }, 1000, new Date().getSeconds(), this)
    },

    recordEnd: function() {
      const that = this;
      clearTimeout(timer_id);
      recorder_manager.stop();
      recorder_manager.onStop((tmp_path)=>{
        ASR.recognition("http://tmp/wx44dfce2ec0484315.o6zAJs8hv00MWELUSbRq8bSE7eSk.JMvLDrj8pG7y1df5ddc700a462754e50627a1d241321.wav", 129998, (res) => {
          that.setData({result_text: res})
          console.log(res);
        })
      });
      this.setData({btn_text: "按住录音"});
    }
  }
})
