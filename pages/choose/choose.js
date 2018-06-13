// pages/choose/choose.js
const time = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { name: 'USA', value: '1', checked: 'true' },
      { name: 'USA', value: '美2国' },
      { name: 'USA', value: '3' }
    ],
    you:[],
    time:[],
    price:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var that = this;
    wx.setNavigationBarTitle({
      title: '选择优惠券'
    })
    wx.request({
      url: 'https://kip.sharetimes.cn/interface/get-party-coupon',
      method: 'POST',
      data: {
        id: options.id,
        type_num:options.type_num,
        openid: wx.getStorageSync('openId')
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        // console.log(res);
        if(res.data.code) {

        } else {
          var timeArr = []//优惠券结束时间
          for (var i = 0; i < res.data.length; i++) {

            var timeItem = res.data[i].end_time;

            timeArr.push(time.formatTimeTwo(timeItem, 'Y-M-D'))
          }
          var arr = { coupon_name: '不使用优惠券', id: null, coupon_id: null, working_condition: null, denomination: null,show:true,checked:'checked'};
          res.data.push(arr);
          that.setData({
            you: res.data,
            time: timeArr,
            price:options.price
          })
          console.log(that.data.you)
        }
        
      }
    })
  },  
  radioChange: function (e) {
    var that = this;
    var youMsg = e.detail.value.split('+')
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    if (youMsg[3] > this.data.price) {//优惠券金额大于商品金额，不能使用
      wx.showToast({
        title: '不满足条件',
        icon:'none',
        duration: 2000
      })
    } else {
      prevPage.setData({
        id:youMsg[0],
        coupon_id:youMsg[1],
        denomination:youMsg[2],
        working_condition:youMsg[3],
        name:youMsg[4],
        priceGou:that.data.price - youMsg[2]
      })
    wx.navigateBack({
      delta: 1
    })
    }
    
   }
})