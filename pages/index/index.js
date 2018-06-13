Page({
  data:{
    banner:[],
    arr:[
      
    ],
    carefully:[],
    intensive:[]
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
      success: function (res) {
        that.setData({
          carefully: res.data.carefully,
          intensive: res.data.intensive
        })
        // console.log(res)
      }
    })
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
      url: '../detail/detail?id=' + e.target.dataset.id + '&type=' + e.target.dataset.type
    })
  }
})