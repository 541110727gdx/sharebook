 //app.js
App({
  onLaunch: function (options) {
    // console.log(options.scene)
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     // console.log(res);
    //     if (res.authSetting['scope.userInfo']) {
    //       wx.getUserInfo({
    //         success: res => {
    //           // console.log(res);
    //           this.globalData.userInfo = res.userInfo;
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           } 
    //         }
    //       })
    //     } else {
    //       //未授权 提示用户授权
    //     }
    //   }
    // })
    wx.login({
      success: function (res) {
        if (res.code) {
          // console.log(res)
          //发起网络请求
          if (wx.getStorageSync('openId')) {
            console.log(wx.getStorageSync('openId'))
          } else {
            wx.request({
              url: 'https://kip.sharetimes.cn/interface/wx-openid',
              method: 'GET',
              data: {
                code: res.code
              },
              header: {
                'content-type': 'application/json'
              },
              success: function (res) {
                wx.setStorageSync('openId', res.data.openid);
              }
            })
            
          }
          
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      } 
    });
  },
  globalData: {
    userInfo: '',
    backSrc:'',
    backId:'',
    backType:2
  },
  getBackgroundAudioManager: function () {
    this.backgroundAudioManager = wx.getBackgroundAudioManager();
    return this.backgroundAudioManager
  }
  
})