// pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr: [],
    ifInt:false,
    type:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.setNavigationBarTitle({
      title: options.title
    })
    wx.request({
      url: 'https://kip.sharetimes.cn/interface/carefully-intensive',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (options.title == '大咖精读') {
          that.setData({
            arr: res.data.carefully,
            type: '1'
          })
        } else {
          that.setData({
            arr: res.data.intensive,
            ifInt:true,
            type:'2'
          })
        }
      }
    })
  },
  goDetail:function(e) {
    wx.navigateTo({
      url: '../detail/detail?type=' + e.target.dataset.class + '&id=' + e.target.dataset.id
    })
  }
})