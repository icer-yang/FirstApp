const app = getApp()

Page({
  data: {
    date: app.globalData.dateString,
    array: ['A', 'B', 'C'],
    index: 0,
    result:[]
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },

  onQuery:function(){
    const db = wx.cloud.database()
    db.collection('DinnerOrders').where({
      todayOrder: this.data.array[this.data.index],
      dateString: this.data.date
    })
      .get({
        success: res => {
          if (res.data.length > 0) {
            // this.data.list[0].pages = []
            // for (let val of res.data) {
            //   this.data.list[0].pages.push(val.dateString + '|' + val.todayOrder + ':' + val.todayOrderDetail)
            //   // this.data.list[0].pages.push("rr")
            // };
            // app.globalData.todayhasOrder = true
            this.setData({
              result: res.data
            })
          }
          // console.log(res.data)
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '出错了'
          })
        }
      })
  }
})
