const app = getApp()

Page({
  data: {
    appdata: app.globalData,
    A: "",
    B: "",
    C: "",
    hasOrdered:"",
  },

  onLoad: function () {
    // 如果已订餐，弹窗
    if(app.globalData.todayhasOrder){
      wx.showModal({
        // title: "弹窗标题",
        content: "今日已订过餐，订餐无法取消",
        showCancel: true,
        confirmText: "返回",
        cancelText: "我还要订",
        success: cnf => {
          if (cnf.confirm) {
            wx.switchTab({
              url: '/page/API/index'
            })
          }
        },
      })
    }


    const db = wx.cloud.database()
    db.collection('DinnerMenu').where({
      _id: app.globalData.dateString
    })
      .get({
        success: res => {
          // res.data 是包含以上定义的两条记录的数组
          if(res.data.length<1){
            wx.showModal({
              // title: "弹窗标题",
              content: "今日菜品还没上，请稍后再点,当然也可以随便先选，有的吃总比没得吃好",
              showCancel: true,
              confirmText: "返回",
              cancelText: "继续选",
              success: cnf=> {
                if(cnf.confirm){
                  wx.switchTab({
                    url: '/page/component/index'
                  })
                }
              },
            })
          }
          this.setData({
            A: res.data[0].A,
            B: res.data[0].B,
            C: res.data[0].C,
          })
          console.log(res.data)
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '今日菜品还没上，请稍后再点'
          })
        }
      })

    // this.setData({
    //   appdata: app.globalData
    // })
  },
  radioChange: function(e){
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.setData({
      hasOrdered:e.detail.value,
    })
  },

  formSubmit: function(e){
    const db = wx.cloud.database()
    db.collection('DinnerOrders').add({
      data: {
        dateString: app.globalData.dateString,
        date:new Date(),
        name: app.globalData.name,
        todayOrder: e.detail.value.order,
        todayOrderDetail: this.data[e.detail.value.order]
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        wx.showToast({
          title: '新增记录成功',
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '新增记录失败'
        })
      }
    })
    wx.switchTab({
      url: '/page/API/index'
    })
  }

})

