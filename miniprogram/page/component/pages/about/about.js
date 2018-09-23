Page({
  data: {
    text: '',
    canAdd: true,
    canRemove: false,
    texts: ['当前并未对小程序使用者进行确认，功能为全开放状态，在注册人员稳定后开启人员审核机制，以保护大家的隐私',]
  },
  extraLine: [],
  add: function (e) {
    var that = this;
    this.extraLine.push(this.data.texts[this.extraLine.length % 3])
    this.setData({
      text: this.extraLine.join('\n\n'),
      canAdd: this.extraLine.length < 3,
      canRemove: this.extraLine.length > 0
    })
    setTimeout(function () {
      that.setData({
        scrollTop: 99999
      });
    }, 0)
  },
  remove: function (e) {
    var that = this;
    if (this.extraLine.length > 0) {
      this.extraLine.pop()
      this.setData({
        text: this.extraLine.join('\n'),
        canAdd: this.extraLine.length < 3,
        canRemove: this.extraLine.length > 0,
      })
    }
    setTimeout(function () {
      that.setData({
        scrollTop: 99999
      });
    }, 0)
  },
  onLoad:function(e){
    const db = wx.cloud.database()
    db.collection('About').doc('W6bu75KURGseSvMg')
      .get({
        success: res => {
          console.log(res)
          this.setData({
            texts:res.data.record
          })
        },
        fail :res=>{
          console.log('fail')
        },
        complete: res => {
          console.log('complete')
        }
      })
  }
})
