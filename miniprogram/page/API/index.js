const app = getApp()

Page({
  data: {
    appdata: app.globalData,
    list: [
      {
        id: 'view',
        name: '今日订餐',
        open: true,
        pages: ["还没有查询到您的订餐",]
      }, {
        id: 'form',
        name: '近期订单',
        open: false,
        pages: ['初版未开发完成，等待继续']
      }
    ] 
  },

  onLoad: function () {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '/pages/chooseLib/chooseLib',
      })
      return
    }
    // 获取今日本人订单
    const db = wx.cloud.database()
    db.collection('DinnerOrders').where({
      _openid: app.globalData.openid,
      dateString: app.globalData.dateString
    })
      .get({
        success: res => {
          // res.data 是包含以上定义的两条记录的数组
          if (res.data.length > 0 ) {
            this.data.list[0].pages =[]
            for (let val of res.data) {
              this.data.list[0].pages.push(val.dateString+'|'+val.todayOrder+':'+val.todayOrderDetail)
              // this.data.list[0].pages.push("rr")
            };
            app.globalData.todayhasOrder = true
            this.setData({
              list: this.data.list
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




    this.setData({
      appdata: app.globalData
    })

    if (!app.globalData.openid){
      wx.showModal({
        // title: "弹窗标题",
        content: "还没有您的基本信息，请返回填写",
        showCancel: false,
        confirmText: "返回",
        // cancelText: "继续选",
        success: cnf => {
          if (cnf.confirm) {
            wx.switchTab({
              url: '/page/component/index'
            })
          }
        },
      })
    }
  },

  kindToggle: function (e) {
    var id = e.currentTarget.id, list = this.data.list;
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      list: list
    });
  },

  onPullDownRefresh:function(){
    // 获取今日本人订单
    const db = wx.cloud.database()
    db.collection('DinnerOrders').where({
      _openid: app.globalData.openid,
      dateString: app.globalData.dateString
    })
      .get({
        success: res => {
          // res.data 是包含以上定义的两条记录的数组
          let templist
          if (res.data.length > 0) {
            this.data.list[0].pages =[]
            for (let val of res.data) {
              this.data.list[0].pages.push(val.dateString + '|' + val.todayOrder + ':' + val.todayOrderDetail)
              // this.data.list[0].pages.push("rr")
            };
            app.globalData.todayhasOrder = true
            this.setData({
              list: this.data.list
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
