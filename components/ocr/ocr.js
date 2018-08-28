import Tool from 'Tool.js'

const app = getApp();

Component({
  data: {
    display: true,
    image_path: "",
    image_width: "",
    image_height: "",
    text_result: "",
    current_target_id: "",
    scroll_top: 0,
    scroll_left: 0
  },

  methods: {
    chooseImage: function (event) {
      Tool.chooseImage();
    },

    closeImage: function (event) {
      closeImage(this);
    },

    getCurrentTargetId: function (event) {
      getCurrentTargetId(event, this);
    },

    syncRoll: function (event) {
      syncRoll(event, this);
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

function closeImage(that) {
  that.setData({
    display: true,
  })
}

function getCurrentTargetId(event, that) {
  that.setData({
    current_target_id: event.currentTarget.id
  })

  console.log(event.currentTarget);;
}

function syncRoll(event, that) {
  if (event.currentTarget.id === that.data.current_target_id) {
    that.setData({
      scroll_top: event.detail.scrollTop,
      scroll_left: event.detail.scrollLeft
    });

    console.log(event);
  }
}