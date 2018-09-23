const app = getApp()

Page({
  data: {
    appdata: app.globalData,
    time: '10:45'
  },

  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.value
    })
  },

  onLoad: function () {
    this.setData({
      appdata: app.globalData
    })
  },
  formSubmit: function (e) {
    const db = wx.cloud.database()
    db.collection('DinnerMenu').doc(app.globalData.dateString).set({
      data: {
        date: new Date(),
        name: app.globalData.name,
        A: e.detail.value.A,
        B: e.detail.value.B,
        C: e.detail.value.C,
        StopTime: this.data.time
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        wx.showToast({
          title: '设置套餐成功',
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '设置套餐失败'
        })
      }
    })
    wx.switchTab({
      url: '/page/component/index'
    })
  }

})

