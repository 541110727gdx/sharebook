//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    
    wx.setNavigationBarTitle({
      title: '我的'
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    if (e.detail.userInfo) {//允许授权
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
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
  }
})
