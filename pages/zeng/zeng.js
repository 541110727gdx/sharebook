// pages/zeng/zeng.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btnValue:'赠送',
    name:'',
    title:'',
    img:'',
    zeng:true,
    order_id:'',
    goodsType:'',
    goodsId:'',
    dis:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options);
    if(options.noZeng) {//不是分享过来的
      this.setData({
        title: options.title,
        img: options.img,
        order_id: options.id
      })
    } else {
      wx.login({
        success: function (res) {
          if (res.code) {
            // console.log(res)
            if (wx.getStorageSync('openId')) {//已经有openid，直接判断是否领取
              wx.request({
                url: 'https://kip.sharetimes.cn/interface/get-goods',
                data: {
                  id: options.id
                },
                success: function (res) {
                  console.log(res)
                  if(res.data.give_status == 2) {//已经被领取
                    that.setData({
                      name: options.name,
                      title: options.title,
                      img: options.img,
                      order_id: options.id,
                      zeng: false,
                      btnValue: '已被别人领取'
                    })
                  } else {
                    that.setData({
                      name: options.name,
                      title: options.title,
                      img: options.img,
                      order_id: options.id,
                      zeng: false,
                      btnValue: '领取',
                      goodsType:options.type,
                      goodsId:options.goodsId
                    })
                  }
                }
              })
            } else {
              wx.request({
                url: 'https://kip.sharetimes.cn/interface/wx-openid',
                method: 'GET',
                data: {
                  code: res.code
                },
                header: {
                  'content-type': 'application/json'
                },
                success: function (res) {
                  wx.setStorageSync('openId', res.data.openid);
                  wx.request({
                    url: 'https://kip.sharetimes.cn/interface/get-goods',
                    data: {
                      id: options.id
                    },
                    success: function (res) {
                      console.log(res)
                      if (res.data.give_status == 2) {//已经被领取
                        that.setData({
                          name: options.name,
                          title: options.title,
                          img: options.img,
                          order_id: options.id,
                          zeng: false,
                          btnValue: '已被别人领取'
                        })
                      } else {
                        that.setData({
                          name: options.name,
                          title: options.title,
                          img: options.img,
                          order_id: options.id,
                          zeng: false,
                          btnValue: '领取',
                          goodsType: options.type,
                          goodsId: options.goodsId
                        })
                      }
                    }
                  })
                  
                }
              })
            }
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      });
    }
  },
  onShareAppMessage: function () {
    var that = this;
    return {
      title: app.globalData.userInfo.nickName + '给你一个礼物',
      path: '/pages/zeng/zeng?zeng=true&name=' + app.globalData.userInfo.nickName + '&title=' + that.data.title + '&img=' + that.data.img + '&id=' + that.data.order_id+'&type='+that.data.goodsType+'&goodsId='+that.data.goodsId,
      imageUrl: that.data.img,
      success:function(res) {
        wx.request({
          url: 'https://kip.sharetimes.cn/interface/give-status',
          data:{
            id:that.data.order_id
          },
          header: {
            'content-type': 'application/json'
          },
          success:function(res) {
            console.log(res)
          }
        })
      }
    }
  },
  ling:function(e) {
    var that = this;
    wx.request({
      url: 'https://kip.sharetimes.cn/interface/give-party',
      data: {
        id: that.data.order_id,
        openid:wx.getStorageSync('openId'),
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res);
        wx.navigateTo({
          url: '../../pages/detail/detail?type=' + e.target.dataset.type + '&id=' + e.target.dataset.goodsId
        })
        that.setData({
          btnValue:'已领取',
          dis:true
        })
      }
    })
  }
})