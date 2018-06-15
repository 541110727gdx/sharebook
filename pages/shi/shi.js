// pages/shi/shi.js
var time = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shi:[],
    times:'',
    hiddenLoading:false,
    bu:false,
    yiban:false,
    hao:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://kip.sharetimes.cn/interface/video-read',
      header: {
        'content-type': 'application/json'
      },
      data:{
        type_num:options.type,
        id:options.id
      },
      success: function (res) {
        var times = time.formatTimeTwo(res.data[0].created, 'Y-M-D');
        that.setData({
          shi:res.data[0],
          times:times,
          hiddenLoading:true
        })
      }
    })
  },
  previewImg: function (e) {
    console.log(e)
    wx.previewImage({
      current: e.target.dataset.src, // 当前显示图片的http链接
      urls: [e.target.dataset.src] // 需要预览的图片http链接列表
    })
  },
  goLiu: function () {
    wx.navigateTo({
      url: '../liu/liu'
    })
  },
  bu:function() {
    this.setData({
      bu: true,
      yiban: false,
      hao: false
    })
  },
  yiban:function() {
    this.setData({
      bu: false,
      yiban: true,
      hao: false
    })
  },
  hao:function() {
    this.setData({
      bu: false,
      yiban: false,
      hao: true
    })
  }
})