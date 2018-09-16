const app = getApp()

Page({
  data: {
    appdata: app.globalData,
    // date: new Date(),
    // dateString: new Date().toLocaleDateString()
  },

  onLoad: function () {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '/miniprogram/pages/chooseLib/chooseLib',
      })
      return
    }

    this.setData({
      appdata: app.globalData
    })
  }

})

