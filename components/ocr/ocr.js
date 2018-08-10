Component({
  data: {
    display: true,
    image_path: "",
    text_result: "",
    current_target_id: "",
    scroll_top: 0,
    scroll_left: 0
  },

  methods: {
    touchStart: function (event) {
      this.setData({
        current_target_id: event.currentTarget.id
      });

      console.log(event, this.data.current_target_id);
    },

    syncRoll: function (event) {
      if (event.currentTarget.id === this.data.current_target_id) {
        this.setData({
          scroll_top: event.detail.scrollTop,
          scroll_left: event.detail.scrollLeft
        });

        console.log(event.currentTarget);
      }
    },

    photograph: function (event) {
      const that = this;

      wx.chooseImage({
        count: 1,
        success: function (result) {
          that.setData({
            display: false,
            image_path: result.tempFilePaths
          });
        }
      })
    },

    refreshImage: function (event) {

    },

    closeImage: function (event){
      console.log(event);
      this.setData({
        display: true
      });
    }
  }
})