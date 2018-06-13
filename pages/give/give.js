// pages/give/give.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    select:true,
    select2:false,
    arr: [
      { title: '荒野求生', dec: '河森堡新解《人类简史》' },
      { title: '荒野求生', dec: '河森堡新解《人类简史》' },
      { title: '荒野求生', dec: '河森堡新解《人类简史》' },
      { title: '荒野求生', dec: '河森堡新解《人类简史》' },
      { title: '荒野求生', dec: '河森堡新解《人类简史》' },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '我的赠送'
    })
    wx.getSetting({
      success: res => {
        // console.log(res);
        if (res.authSetting['scope.userInfo']) {
          
        } else {
          //未授权 提示用户授权
          wx.navigateBack({
            delta: 1
          })
          wx.showToast({
            title: '请先登录',
            image: '../../img/error.png',
            duration: 2000
          })
        }
      }
    })
  },
  giveTab:function() {
    this.setData({
      select:true,
      select2:false
    })
  },
  giveTab2: function () {
    this.setData({
      select: false,
      select2: true
    })
  },
  goZeng:function(e) {
    wx.navigateTo({
      url: '../../pages/zeng/zeng'
    })
  },
  onShareAppMessage: function () {
    return {
      title: app.globalData.userInfo.nickName + '给你一个礼物',
      path: '/pages/zeng/zeng?zeng=true&name=' + app.globalData.userInfo.nickName,
      imageUrl: '../../img/banner.png'
    }
  },
})