// pages/liu/liu.js
const re = /^1[3|4|5|7|8][0-9]\d{4,8}$/;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    liu:[
      {name:'全国电信5M',price:18.00,d_price:15.00},
      { name: '全国电信5M', price: 18.00, d_price: 15.00 },
      { name: '全国电信5M', price: 18.00, d_price: 15.00 },
      { name: '全国电信5M', price: 18.00, d_price: 15.00 },
      { name: '全国电信5M', price: 18.00, d_price: 15.00 },
      { name: '全国电信5M', price: 18.00, d_price: 15.00 },
    ],
    key:0,
    phone:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  changColor: function (e) {
    this.setData({
      key: e.target.dataset.index
    })
    
  },
  bindPhone:function(e) {
    this.setData({
      phone:e.detail.value
    })
    
    // wx.request({
    //   url: '',
    //   method:'POST',
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded' // 默认值
    //   },
    //   success: function (res) {
    //     console.log(res.data)
    //   }
    // })
  },
  gou:function() {
    var that = this;
    if(this.data.phone !== '') {
      if (re.test(that.data.phone)) {
        // wx.request({
        //   url: '',
        //   method:'POST',
        //   header: {
        //     'content-type': 'application/x-www-form-urlencoded' // 默认值
        //   },
        //   success: function (res) {
        //     console.log(res.data)
        //   }
        // })
      } else {
        wx.showToast({
          title: '手机号不正确',
          image: '../../img/error.png',
          duration: 2000
        })
      }
    } else {
      wx.showToast({
        title: '手机号不能为空',
        image: '../../img/error.png',
        duration: 2000
      })
    }
  }
})