// pages/zeng/zeng.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btnValue:'赠送',
    name:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    wx.getSetting({
      success: res => {
        // console.log(res);
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              // console.log(res);
              this.globalData.userInfo = res.userInfo;
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
              if (options.zeng) {
                this.setData({
                  btnValue: '领取',
                  name: options.name
                })
              }
            }
          })
        } else {
          //未授权 提示用户授权
          wx.navigateTo({
            url: '../../login/login',
          })
        }
      }
    })
    
  },
  
  btnClick:function(e) {

  }
})