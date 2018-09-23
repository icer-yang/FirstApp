var util = require('../../../../util/util.js')
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

  // onQuery:function(){
  //   this.setData({
  //     result : []
  //   })
  //   const db = wx.cloud.database()
  //   db.collection('DinnerOrders').where({
  //     todayOrder: this.data.array[this.data.index],
  //     dateString: this.data.date
  //   })
  //     .get({
  //       success: res => {
  //         if (res.data.length > 0) {
  //           this.setData({
  //             result: res.data
  //           })
  //         }
  //         // console.log(res.data)
  //       },
  //       fail: err => {
  //         wx.showToast({
  //           icon: 'none',
  //           title: '出错了'
  //         })
  //       }
  //     })
  // },
  onQuery: function () {
    this.setData({
      result: []
    })
    wx.cloud.callFunction({
      // 云函数名称
      name: 'AllOrders',
      // 传给云函数的参数
      data: {
        todayOrder: this.data.array[this.data.index],
        dateString: util.dateTOString(this.data.date)
      },
      success: res => {
        console.log(res) // 3
        if (res.result.data.length > 0) {
          this.setData({
            result: res.result.data
          })
        }
      },
      fail: console.error
    })
  }
})
