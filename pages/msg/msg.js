// pages/msg/msg.js
const time = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg:[],
    time:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.setNavigationBarTitle({
      title: '消息'
    });
    wx.request({
      url: 'https://kip.sharetimes.cn/interface/party-receive',
      method: 'GET',
      data: {
        openid:wx.getStorageSync('openId')
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if(res.data == '无消息') {

        } else {
          var timeArr = []
          for(var i = 0;i<res.data.length;i++) {
            timeArr.push(time.formatTimeTwo(res.data[i].receive_created,'M-D'))
          }
        }
        that.setData({
          msg:res.data,
          time:timeArr
        })
      }
    })
  },
  goJump:function(e) {
    if (e.target.dataset.jump == 1) {//跳转精读
      wx.navigateTo({
        url: '../detail/detail?id=' + e.target.dataset.care + '&type=1'
      })
    } else if (e.target.dataset.jump == 2) {//跳转笔记
      wx.navigateTo({
        url: '../detail/detail?id=' + e.target.dataset.int + '&type=2'
      })
    } else if (e.target.dataset.jump == 4) {
      wx.showModal({
        title: '提示',
        confirmText:'复制',
        content: '暂不支持跳转此链接，请点击复制后在微信聊天界面发送查看',
        success: function (res) {
          if (res.confirm) {
            wx.setClipboardData({
              data: e.target.dataset.src,
              success: function (res) {
                // wx.getClipboardData({
                //   success: function (res) {
                //     console.log(res.data) // data
                //   }
                // })
              }
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  }
 
})