const app = getApp()

Page({
  data: {
    // focus: false,
    // inputValue: '',
    array: ['研发', '采购', '食堂', '其他'],
    index: 0,
    avatarUrl: '/pages/index/user-unlogin.png',
    userInfo: { "nickName": "您还没有登录，点击头像授权" },
    logged: false,
    requestResult: '',
    brand: '手机品牌',
    model: '手机型号',
    openid: '',
    name:'',
    phoneNum:'',
    department:''
    // appdata: app.globalData
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  onLoad: function () {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '/miniprogram/pages/chooseLib/chooseLib',
      })
      return
    }

    this.setData({
      // avatarUrl: wx.getStorageSync('myAvatarUrl'),
      // userInfo: wx.getStorageSync('myUserInfo'),
      avatarUrl: (!wx.getStorageSync('myAvatarUrl') ? '/pages/index/user-unlogin.png' : wx.getStorageSync('myAvatarUrl')),
      userInfo: (!wx.getStorageSync('myUserInfo') ? { "nickName": "点击左侧头像授权" } : wx.getStorageSync('myUserInfo')),
      brand: wx.getStorageSync('brand'),
      model: wx.getStorageSync('model'),
      openid: wx.getStorageSync('openid'),
      name: wx.getStorageSync('name'),
      phoneNum: wx.getStorageSync('phoneNum'),
      department: wx.getStorageSync('department')
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
              wx.setStorageSync("myAvatarUrl", res.userInfo.avatarUrl)
              wx.setStorageSync("myUserInfo", res.userInfo)
            }
          })
        }
      }
    })
  },


  onGetUserInfo: function (e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
      wx.setStorageSync("myAvatarUrl", e.detail.userInfo.avatarUrl)
      wx.setStorageSync("myUserInfo", e.detail.userInfo)
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
    wx.getSystemInfo({
      success: res => {
        wx.setStorageSync("brand", res.brand),
        wx.setStorageSync("model", res.model)
      }
    })

  },

  // submit_reg: function () {

  //     wx.setStorageSync("name", res.brand),
  //     wx.setStorageSync("department", res.model),
  //     wx.setStorageSync("name", res.brand)
  // },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    wx.setStorageSync("name", e.detail.value.name),
    wx.setStorageSync("department", this.data.array[e.detail.value.department]),
    wx.setStorageSync("phoneNum", e.detail.value.phoneNum)

    app.globalData = {
      avatarUrl: (!wx.getStorageSync('myAvatarUrl') ? '/pages/index/user-unlogin.png' : wx.getStorageSync('myAvatarUrl')),
      userInfo: (!wx.getStorageSync('myUserInfo') ? { "nickName": "您还没有登录，点击下方按钮补充信息" } : wx.getStorageSync('myUserInfo')),
      brand: wx.getStorageSync('brand'),
      model: wx.getStorageSync('model'),
      openid: wx.getStorageSync('openid'),
      name: wx.getStorageSync('name'),
      phoneNum: wx.getStorageSync('phoneNum'),
      department: wx.getStorageSync('department')
    }
// 测试阶段不用上传时暂时关闭
//     const db = wx.cloud.database()
//     db.collection('Users').add({
//       data: {
//         nickName: wx.getStorageSync('myUserInfo').nickName,
//         brand: wx.getStorageSync('brand'),
//         model: wx.getStorageSync('model'),
//         name: wx.getStorageSync('name'),
//         phoneNum: wx.getStorageSync('phoneNum'),
//         department: wx.getStorageSync('department')
//       },
//       success: res => {
//         // 在返回结果中会包含新创建的记录的 _id
//         wx.showToast({
//           title: '新增记录成功',
//         })
//       },
//       fail: err => {
//         wx.showToast({
//           icon: 'none',
//           title: '新增记录失败'
//         })
//       }
//     })
    wx.switchTab({
      url: '/page/component/index'
    })
  },
  formReset: function (e) {
    console.log('form发生了reset事件，携带数据为：', e.detail.value)
    this.setData({
      chosen: ''
    })
  }
})
