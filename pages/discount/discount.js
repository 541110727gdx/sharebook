// pages/discount/discount.js
const time = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    select:true,
    select2:false,
    select3:false,
    dis:[],
    time:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://kip.sharetimes.cn/interface/party-coupons',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data:{
        openid:wx.getStorageSync('openId')
      },
      success:function(res) {
        console.log(res);
        var timeArr = []//优惠券结束时间
        if (res.data.not_used) {
          for (var i = 0; i < res.data.not_used.length; i++) {

            var timeItem = res.data.not_used[i].end_time;

            timeArr.push(time.formatTimeTwo(timeItem, 'Y-M-D'))
          }
        }
        
        that.setData({
          dis:res.data,
          time: timeArr
        })
      }
    })
  },
  giveTab: function () {
    this.setData({
      select: true,
      select2: false,
      select3:false
    })
  },
  giveTab2: function () {
    this.setData({
      select: false,
      select2: true,
      select3:false
    })
  },
  giveTab3: function () {
    this.setData({
      select: false,
      select2: false,
      select3:true
    })
  }
  
})