// pages/yigou/yigou.js
const time = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr:[],
    time:[],
    hiddenLoading:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.setNavigationBarTitle({
      title: '我的已购'
    })
    wx.request({
      url: 'https://kip.sharetimes.cn/interface/already-bought',
      data: {
        openid: wx.getStorageSync('openId')
      },
      header: {
        'content-type': 'application/json'
      },
      success:function(res) {
        console.log(res)
        if (res.data.code !== 1) {
          var timeArr=[];
          for (var i = 0; i < res.data.length; i++) {

            var timeItem2 = res.data[i].transaction_created;

            timeArr.push(time.formatTimeTwo(timeItem2, 'Y-M-D h:m'))
          }
          that.setData({
            arr: res.data,
            time: timeArr,
            hiddenLoading:true
          })
        } else {
          that.setData({
            arr: [],
            time: [],
            hiddenLoading: true
          })
        }
        
      }
    })
  },
  goDetail:function(e) {
    console.log(e)
    wx.navigateTo({
      url: '../detail/detail?id=' + e.currentTarget.dataset.id + '&type=' + e.currentTarget.dataset.type
    })
  }
})