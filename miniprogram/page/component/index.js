var util = require('../../util/util.js')
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
        url: '/pages/chooseLib/chooseLib',
      })
      return
    }
    app.globalData.startOpen = util.startOpen(24, 60)
    this.setData({
      appdata: app.globalData
    })


  }

})

