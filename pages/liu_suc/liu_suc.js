// pages/liu_suc/liu_suc.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  jixu:function() {
    wx.navigateBack({
      delta: 1
    })
  },
  fan:function() {
    wx.navigateBack({
      delta: 2
    })
  }
 })