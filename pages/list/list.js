// pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr: [],
    ifInt:false,
    type:'',
    hiddenLoading:false
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
      data: {
        openid: wx.getStorageSync('openId')
      },
      success: function (res) {
        console.log(res)
        if (options.title == '大咖精读') {
          that.setData({
            arr: res.data.carefully,
            type: '1',
            hiddenLoading: true
          })
        } else if (options.title == '学霸笔记'){
          that.setData({
            arr: res.data.intensive,
            ifInt:true,
            type:'2',
            hiddenLoading:true
          })
        } else {
          that.setData({
            arr: res.data.read,
            ifInt: true,
            type: '3',
            hiddenLoading: true
          })
        }
      }
    })
  },
  goDetail:function(e) {
    wx.navigateTo({
      url: '../detail/detail?type=' + e.currentTarget.dataset.class + '&id=' + e.currentTarget.dataset.id
    })
  }
})