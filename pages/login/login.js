const app = getApp()
Page({
  data: {
    
  },
  onLoad: function () {
    
    
  },
  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {//允许授权
      app.globalData.userInfo = e.detail.userInfo;
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
          wx.navigateBack({
            delta: 1
          })
        }
      })
      
    } else {
      
    }
  }
})