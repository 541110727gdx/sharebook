// pages/give/give.js
const time = require('../../utils/util.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    select:true,
    select2:false,
    hiddenLoading:false,
    arr1: [],
    arr2: [],
    timeArr:[],
    timeArr2:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.setNavigationBarTitle({
      title: '我的赠送'
    })
    wx.getSetting({
      success: res => {
        // console.log(res);
        if (res.authSetting['scope.userInfo']) {
          wx.request({
            url: 'https://kip.sharetimes.cn/interface/already-bought',
            data: {
              openid: wx.getStorageSync('openId'),
              give:1
            },
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              console.log(res)
              var arr_wei=[];
              var arr_yi=[];
              var timeArr = [];
              var timeArr2 = [];
              if(res.data.length !== 0) {
                for (var j = 0; j < res.data.length; j++) {
                  if (res.data[j].give_status == 0) {
                    arr_wei.push(res.data[j])
                  } else {
                    arr_yi.push(res.data[j])
                  }
                }
                for (var i = 0; i < arr_wei.length; i++) {

                  var timeItem2 = arr_wei[i].transaction_created;

                  timeArr.push(time.formatTimeTwo(timeItem2, 'Y-M-D h:m'))
                }
                for (var k = 0; k < arr_yi.length; k++) {

                  var timeItem3 = arr_yi[k].transaction_created;

                  timeArr2.push(time.formatTimeTwo(timeItem3, 'Y-M-D h:m'))
                }
                that.setData({
                  arr1: arr_wei,
                  arr2:arr_yi,
                  timeArr: timeArr,
                  timeArr2:timeArr2,
                  hiddenLoading:true
                })
              }
            }
          })
        } else {
          //未授权 提示用户授权
          wx.navigateBack({
            delta: 1
          })
          wx.showToast({
            title: '请先登录',
            image: '../../img/error.png',
            duration: 2000
          })
        }
      }
    })
  },
  giveTab:function() {
    this.setData({
      select:true,
      select2:false
    })
  },
  giveTab2: function () {
    this.setData({
      select: false,
      select2: true
    })
  },
  goZeng:function(e) {
    console.log(e)
    wx.navigateTo({
      url: '../../pages/zeng/zeng?noZeng=true&title=' + e.target.dataset.title + '&img=' + e.target.dataset.img + '&id=' + e.target.dataset.id + '&type=' + e.target.dataset.type + '&goods_id=' + e.target.dataset.goodsid
    })
  },
  
})