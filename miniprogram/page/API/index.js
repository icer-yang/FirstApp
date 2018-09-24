const app = getApp()

Page({
  data: {
    appdata: app.globalData,
    list: [
      {
        id: 'view',
        name: '今日订餐',
        open: false,
        pages: [{ 'content': "还没有查询到您的订餐",'id': '', 'hasGot': true},],
      }, {
        id: 'form',
        name: '近期订单',
        open: false,
        pages: [{ 'content': "还没有查询到您的订餐", 'id': '', 'hasGot': true },]
      }
    ],
  },

  clearStorage: function () {
    wx.clearStorageSync()
    wx.showToast({
      icon: 'none',
      title: '已清除所有缓存'
    })
  },

  onLoad: function () {
    // if (!wx.cloud) {
    //   wx.redirectTo({
    //     url: '/pages/chooseLib/chooseLib',
    //   })
    //   return
    // }
// 获取今日本人订单
    // const db = wx.cloud.database()
    // db.collection('DinnerOrders').where({
    //   _openid: app.globalData.openid,
    //   dateString: app.globalData.dateString
    // })
    //   .get({
    //     success: res => {
    //       // res.data 是包含以上定义的两条记录的数组
    //       if (res.data.length > 0 ) {
    //         this.data.list[0].pages =[]
    //         for (let val of res.data) {
    //           this.data.list[0].pages.push(val.dateString+'|'+val.todayOrder+':'+val.todayOrderDetail)
    //           // this.data.list[0].pages.push("rr")
    //         };
    //         app.globalData.todayhasOrder = true
    //         this.setData({
    //           list: this.data.list
    //         })
    //       }
    //       // console.log(res.data)
    //     },
    //     fail: err => {
    //       wx.showToast({
    //         icon: 'none',
    //         title: '出错了'
    //       })
    //     }
    //   })

// 第一次进入时，若没有openid，认为是没有填写基本信息的，所以要进入注册页面
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
// 从网上拉取帐户信息并保存
  onGetUserInfo: function (e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
      wx.setStorageSync("myAvatarUrl", e.detail.userInfo.avatarUrl)
      app.globalData.avatarUrl = e.detail.userInfo.avatarUrl
      wx.setStorageSync("myUserInfo", e.detail.userInfo)
      app.globalData.userInfo = e.detail.userInfo
    }
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.setStorageSync("openid", res.result.openid)
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
    const db = wx.cloud.database()
    db.collection('Users').where({
      _openid: app.globalData.openid
    })
      .get({
        success: res => {
          wx.setStorageSync('name', res.data[0].name)
          app.globalData.name = res.data[0].name
          wx.setStorageSync('department', res.data[0].department)
          app.globalData.department = res.data[0].department
          wx.setStorageSync('phoneNum', res.data[0].phoneNum)
          app.globalData.phoneNum = res.data[0].phoneNum
          wx.setStorageSync('isManager', res.data[0].isManager)
          app.globalData.isManager = res.data[0].isManager
          app.globalData.isUser = res.data[0].isUser
          wx.setStorageSync('isUser', res.data[0].isUser)
          this.setData({
            appdata: app.globalData
          })
        }
      })
     
  },



  // kindToggle: function (e) {
  //   var id = e.currentTarget.id, list = this.data.list;
  //   for (var i = 0, len = list.length; i < len; ++i) {
  //     if (list[i].id == id) {
  //       list[i].open = !list[i].open
  //     } else {
  //       list[i].open = false
  //     }
  //   }
  //   this.setData({
  //     list: list
  //   });
  // },

  onPullDownRefresh:function(){
    wx.showToast({
      title: '正刷新订餐信息',
      icon: 'loading'
    })
    // 获取今日本人订单
    const db = wx.cloud.database()
    db.collection('DinnerOrders').where({
      _openid: app.globalData.openid,
      dateString: app.globalData.dateString
    })
      .get({
        success: res => {
          // res.data 是包含以上定义的两条记录的数组
          wx.stopPullDownRefresh()
          if (res.data.length > 0) {
            this.data.list[0].pages =[]
            for (let val of res.data) {
              this.data.list[0].pages.push({'content':val.todayOrder + '|' + val.todayOrderDetail + '|' +(val.hasGot?"已取":"未取"),'id':val._id,'hasGot':val.hasGot})

            };
            // 确定订餐过，在点击订餐时弹窗提示已经订过餐
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
  },

// 点击今日按钮选项调整
  kindToggle: function (e) {
    var id = e.currentTarget.id, list = this.data.list;
    // for (var i = 0, len = list.length; i < len; ++i) {
      if (id == "view") {
        list[0].open = !list[0].open
        const db = wx.cloud.database()
        db.collection('DinnerOrders').where({
          _openid: app.globalData.openid,
          dateString: app.globalData.dateString
        })
          .get({
            success: res => {
              // res.data 是包含以上定义的两条记录的数组
              if (res.data.length > 0) {
                this.data.list[0].pages = []
                // this.data.list[0].uid = []
                for (let val of res.data) {
                  this.data.list[0].pages.push({ 'content': val.todayOrder + '|' + val.todayOrderDetail + '|' + (val.hasGot ? "已取" : "未取"), 'id': val._id, 'hasGot': val.hasGot })
                  // this.data.list[0].uid.push({ 'id': val._id, 'hasGot': val.hasGot })
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
      } else if (id == "form"){
        list[1].open = !list[1].open
        const db = wx.cloud.database()
        db.collection('DinnerOrders').where({
          _openid: app.globalData.openid,
          // dateString: app.globalData.dateString
        })
          .get({
            success: res => {
              // res.data 是包含以上定义的两条记录的数组
              if (res.data.length > 0) {
                this.data.list[1].pages = []
                for (let val of res.data) {
                  this.data.list[1].pages.push({ 'content': val.dateString + '|' + val.todayOrder + '|' + val.todayOrderDetail + '|' + (val.hasGot ? "已取" : "未取")})
                };
                // app.globalData.todayhasOrder = true
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
      }else {
        // list[i].open = false
      }
    // }
    this.setData({
      list: list
    });
  },

  getButton:function(e){
    // console.log(e)
    const db = wx.cloud.database()
    db.collection('DinnerOrders').doc(e.target.id).update({
      data: {
        hasGot : true
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        wx.showToast({
          title: '领取成功',
        })
        this.onPullDownRefresh()
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '领取失败'
        })
      }
    })
  }
})
