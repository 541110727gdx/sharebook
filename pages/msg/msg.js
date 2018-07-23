// pages/msg/msg.js
const app = getApp();
const time = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg:[],
    time:[],
    hiddenLoading:false,
    btn:false
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
        console.log(res)
        if(res.data.msg == '无消息') {
          that.setData({
            msg: [],
            time: [],
            hiddenLoading: true
          })
        } else {
          var timeArr = []
          for(var i = 0;i<res.data.length;i++) {
            timeArr.push(time.formatTimeTwo(res.data[i].receive_created,'M-D'))
          }
          that.setData({
            msg: res.data,
            time: timeArr,
            hiddenLoading: true
          })
        }
        
      }
    })
  },
  onShow:function() {
    var that = this;
    wx.getSetting({
      success: res => {
        // console.log(res);
        if (res.authSetting['scope.userInfo']) {
          that.setData({
            btn: true
          })
          wx.getUserInfo({
            success: res => {
              // console.log(res);
              app.globalData.userInfo = res.userInfo;
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        } else {
          //未授权 提示用户授权
        }
      }
    })
  },
  getUserInfo: function (e) {
    if (e.detail.userInfo) {//允许授权
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        btn: true
      })
      wx.request({//昵称头像给后台
        url: 'https://kip.sharetimes.cn/interface/icon-nick',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          openid: wx.getStorageSync('openId'),
          icon: app.globalData.userInfo.avatarUrl,
          nickname: app.globalData.userInfo.nickName
        },
        success: function (res) {
          console.log(res);
        }
      })
    } else {
      this.setData({
        btn: false
      })
    }
  },
  goJump:function(e) {
    if (e.currentTarget.dataset.jump == 1) {//跳转精读
      wx.navigateTo({
        url: '../detail/detail?id=' + e.currentTarget.dataset.care + '&type=1'
      })
    } else if (e.currentTarget.dataset.jump == 2) {//跳转笔记
      wx.navigateTo({
        url: '../detail/detail?id=' + e.currentTarget.dataset.int + '&type=2'
      })
    } else if (e.currentTarget.dataset.jump == 4) {
      wx.showModal({
        title: '提示',
        confirmText:'复制',
        content: '暂不支持跳转此链接，请点击复制后在微信聊天界面发送查看',
        success: function (res) {
          if (res.confirm) {
            wx.setClipboardData({
              data: e.currentTarget.dataset.src,
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