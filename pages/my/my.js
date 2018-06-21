//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    btn:false
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this;
    wx.setNavigationBarTitle({
      title: '我的'
    })
  },
  onShow: function () {
    var that = this;
    wx.getSetting({
      success: res => {
        console.log(res);
        if (res.authSetting['scope.userInfo']) {
          that.setData({
            btn: true
          })
          wx.getUserInfo({
            success: res => {
              // console.log(res);
              app.globalData.userInfo = res.userInfo;
              that.setData({
                userInfo: res.userInfo
              })
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        } else {
          //未授权 提示用户授权
        }
      }
    })
  },
  getUserInfo: function(e) {
    if (e.detail.userInfo) {//允许授权
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true,
        btn:true
      })
      wx.request({//昵称头像给后台
        url: 'https://kip.sharetimes.cn/interface/icon-nick',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          openid: wx.getStorageSync('openId'),
          icon: app.globalData.userInfo.avatarUrl,
          nickname: app.globalData.userInfo.nickName
        },
        success: function (res) {
          console.log(res);
        }
      })
    } else {
      this.setData({
        hasUserInfo: false
      })
    }
  },
  goPerson:function() {
    wx.navigateTo({
      url: '../person/person',
    })
  },
  goYigou: function () {
    wx.navigateTo({
      url: '../yigou/yigou',
    })
  },
  goGive:function() {
    wx.navigateTo({
      url: '../give/give',
    })
  },
  goDis: function () {
    wx.navigateTo({
      url: '../discount/discount',
    })
  },
  goOpi: function () {
    wx.navigateTo({
      url: '../opinion/opinion',
    })
  },
  goLiu:function() {
    wx.navigateTo({
      url: '../liu/liu',
    })
  }
})
