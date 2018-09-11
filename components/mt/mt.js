import MT from '../../utils/MT/MT.js'

Component({
  data: {
    translate_text: ""
  },

  methods: {
    translate: function() {
      const that = this;
      const query = wx.createSelectorQuery().in(this);
      query.select('#textarea').fields({properties: ['value']}, function (res) {
        console.log(res.value);
        const promise = MT.translate("en", "zh", res.value);
        promise.then(function(res) {
          that.setData({
            translate_text: res
          });
        }).done(function (res) {
          console.log("123");
        })
      }).exec();
    }
  }
})
