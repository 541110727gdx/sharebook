// pages/opinion/opinion.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { name: '关于课程', value: '关于课程', checked: 'true' },
      { name: '关于功能', value: '关于功能' },
      { name: '其他建议', value: '其他建议' },
    ],
    radio:'关于课程',
    text:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  radioChange: function (e) {
    var checked = e.detail.value;
    this.setData({
      radio:checked
    })
  },
  textArea:function(e) {
    this.setData({
      text:e.detail.value
    })
  },
  submit:function() {
    wx.request({
      url: 'https://kip.sharetimes.cn/interface/feedback',
      method: 'POST',
      data: {
        radio:this.data.radio,
        text:this.data.text,
        openid:wx.getStorageSync('openId')
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res);
        wx.navigateBack({
          delta: 1
        })
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 2000
        })
        
      }
    })
  }
})