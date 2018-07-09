const app = getApp();
Page({
  data:{
    banner:[],
    arr:[],
    carefully:[],
    intensive:[],
    read:[],
    hiddenLoading:false,
    btn:false,
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '分享读书部落',
      path: '/pages/index/index'
    }
  },
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://kip.sharetimes.cn/interface/banner', //banner
      header: {
        'content-type': 'application/json' 
      },
      success: function (res) {
        that.setData({
          banner: res.data
        })
      }
    })
    wx.request({
      url: 'https://kip.sharetimes.cn/interface/carefully-intensive',//首页
      header: {
        'content-type': 'application/json'
      },
      data:{
        openid:wx.getStorageSync('openId')
      },
      success: function (res) {
        that.setData({
          carefully: res.data.carefully,
          intensive: res.data.intensive,
          read:res.data.read,
          hiddenLoading:true
        })
        // console.log(res)
      }
    })
  },
  onShow: function () {
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
    var that = this;
    if (e.detail.userInfo) {//允许授权
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        btn:true
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
          that.setData({
            hiddenLoading:false
          })
          wx.request({
            url: 'https://kip.sharetimes.cn/interface/carefully-intensive',//首页
            header: {
              'content-type': 'application/json'
            },
            data: {
              openid: wx.getStorageSync('openId')
            },
            success: function (res) {
              that.setData({
                carefully: res.data.carefully,
                intensive: res.data.intensive,
                read: res.data.read,
                hiddenLoading: true
              })
              console.log(res)
            }
          })
        }
      })
    } else {
      this.setData({
        btn: false
      })
    }
  },
  bannerJump:function(e) {
    if (e.target.dataset.id == 1) {//跳转精读
      wx.navigateTo({
        url: '../detail/detail?id=' + e.target.dataset.care + '&type=1'
      })
    } else if (e.target.dataset.id == 2) {//跳转笔记
      wx.navigateTo({
        url: '../detail/detail?id=' + e.target.dataset.int + '&type=2'
      })
    } else if (e.target.dataset.id == 4) {
      wx.showModal({
        title: '提示',
        confirmText: '复制',
        content: '暂不支持跳转此链接，请点击复制后在微信聊天界面发送查看',
        success: function (res) {
          if (res.confirm) {
            wx.setClipboardData({
              data: e.target.dataset.src,
              success: function (res) {
                wx.getClipboardData({
                  success: function (res) {
                    console.log(res.data) // data
                  }
                })
              }
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  }, 
  goDetail:function(e) {
    wx.navigateTo({
      url: '../detail/detail?id=' + e.target.dataset.id + '&type=' + e.target.dataset.type + '&ifShare=2'
    })
  },
  backMusic:function() {
    console.log(app.globalData)
    if (app.getBackgroundAudioManager().src) {
      if (app.getBackgroundAudioManager().paused) {//是否正在播放
        wx.showModal({
          title: '',
          content: '没有正在播放的音频',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              // console.log('用户点击确定')
            } else if (res.cancel) {
              // console.log('用户点击取消')
            }
          }
        })
      } else {
        wx.navigateTo({
          url: '../yin/yin?id=' + app.globalData.backId + '&type=' + app.globalData.type + '&parId=' + app.globalData.parId + '&index=' + app.globalData.index + '&detailtype=' + app.globalData.detailtype
        })
      }
    } else {
      wx.showModal({
        title: '',
        content: '没有正在播放的音频',
        showCancel:false,
        success: function (res) {
          if (res.confirm) {
            // console.log('用户点击确定')
          } else if (res.cancel) {
            // console.log('用户点击取消')
          }
        }
      })
    }
  }
})