// pages/liu/liu.js
const re = /^1[3|4|5|7|8][0-9]\d{4,8}$/;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    liu:[],
    key:0,
    phone:'',
    yuanList:[],
    card_name:'',
    card_code:'',
    pay_amount:'',
    amount_payable:'',
    discount:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  changColor: function (e) {
    this.setData({
      key: e.currentTarget.dataset.index,
      card_name: e.currentTarget.dataset.card_name,
      card_code: e.currentTarget.dataset.card_code,
      pay_amount: e.currentTarget.dataset.money,
      amount_payable: e.currentTarget.dataset.card_value,
      discount: e.currentTarget.dataset.min_discount
    })
  },
  bindPhone:function(e) {
    var that = this;
    that.setData({
      phone:e.detail.value
    })
    console.log(that.data.phone)
    if (this.data.phone !== '') {
      if (re.test(that.data.phone)) {
        wx.request({
          url: 'https://kip.sharetimes.cn/interface/card-select',
          method:'POST',
          data:{
            phone_num:that.data.phone
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          success: function (res) {
            console.log(res.data)
            if(res.data.code == 1) {
              wx.showToast({
                title: '手机号不正确',
                image: '../../img/error.png',
                duration: 2000
              })
              that.setData({
                liu: [],
                yuanList:[]
              })
            } else {
              var yuan = [];
              for(var i = 0;i<res.data.length;i++) {
                yuan.push((res.data[i].card_value / 100) * (res.data[i].min_discount/100))
              }
              that.setData({
                liu: res.data,
                yuanList:yuan,
              })
            }
            
          }
        })
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
  },
  gou:function() {
    var that = this;
    if(this.data.phone !== '') {
      if (re.test(that.data.phone)) {
        wx.request({
          url: 'https://kip.sharetimes.cn/interface/flow-order',
          method:'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          data:{
            phone_num:that.data.phone,
            openid:wx.getStorageSync('openId'),
            card_name: that.data.card_name,
            card_code: that.data.card_code,
            pay_amount: that.data.amount_payable * that.data.discount /100,
            // pay_amount:1,
            amount_payable: that.data.amount_payable,
            discount: that.data.discount
          },
          success: function (res) {
            console.log(res.data);
            wx.requestPayment({
              timeStamp: res.data.timeStamp,
              nonceStr: res.data.nonceStr,
              package: res.data.package,
              signType: res.data.signType,
              paySign: res.data.paySign,
              success:function(res) {
                console.log(res)
                wx.navigateTo({
                  url: '../liu_suc/liu_suc',
                })
              }
            })
          }
        })
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