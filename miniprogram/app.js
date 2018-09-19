//app.js
var util = require('/util/util.js')

App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }

    this.globalData = {
      avatarUrl: (!wx.getStorageSync('myAvatarUrl')?'/pages/index/user-unlogin.png':wx.getStorageSync('myAvatarUrl')),
      userInfo: (!wx.getStorageSync('myUserInfo') ? {"nickName": "您还没有登录，点击下方按钮补充信息" }:wx.getStorageSync('myUserInfo')),
      brand: wx.getStorageSync('brand'),
      model: wx.getStorageSync('model'),
      openid: wx.getStorageSync('openid'),
      name: wx.getStorageSync('name'),
      phoneNum: wx.getStorageSync('phoneNum'),
      department: wx.getStorageSync('department'),
      isManager:wx.getStorageSync('isManager'),

      // 下面是跟随定义
      dateString: util.getYMD(),
      todayhasOrder:"",
      // startOpen: util.startOpen(10, 30)
      startOpen: true
    }
  }
})
