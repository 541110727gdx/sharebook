// pages/detail/detail.js
const time = require('../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    select:true,
    select2:false,
    showYou: false,
    showMai:false,
    showZeng:false,
    num: 1,
    minusStatus: 'disabled',
    price:'',
    priceGou:'',
    danjia:'',
    detail:[],
    time:[],
    timeArr:[],
    time_top:'',
    youHidden:false,
    type_num:'',
    id: '',
    coupon_id: 0,//优惠券id
    denomination:'',
    working_condition: '',
    name:'不使用优惠券',
    ifBi:false,
    jump_type:'',
    hiddenLoading:false,
    status:'',
    index:'',
    id_you:'',
    ifRead:false,
    type:'',
    detailType:''
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: this.data.detail.title,
      path: '/pages/detail/detail?id=' + this.data.id +'&type=' + this.data.type_num + '&ifShare=1'
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options)
    if(options.ifShare == 1) {//分享进来的
      wx.login({
        success: function (res) {
          if (res.code) {
            // console.log(res)
            //发起网络请求
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
                  console.log(res)
                  wx.setStorageSync('openId', res.data.openid);

                  that.setData({
                    id: options.id,
                    type_num: options.type,
                  })
                  wx.request({
                    url: 'https://kip.sharetimes.cn/interface/details',
                    data: {
                      id: options.id,
                      type_num: options.type,
                      openid: wx.getStorageSync('openId')
                    },
                    header: {
                      'content-type': 'application/json'
                    },
                    success: function (res) {
                      console.log(res);
                      if (res.data.carefully) {//精读
                        that.setData({
                          detail: res.data.carefully[0],
                          care_child: res.data.carefully_child,
                          danjia: res.data.carefully[0].price,
                          price: res.data.carefully[0].price,
                          priceGou: res.data.carefully[0].price,
                          coupon: res.data.coupon,
                          jump_type: 1,
                          hiddenLoading: true,
                          status: res.data.status,
                          detailType: 'jingdu'
                        })
                        var timeList = []
                        var timeArr = []//优惠券结束时间
                        for (var i = 0; i < res.data.carefully_child.length; i++) {

                          var timeItem = res.data.carefully_child[i].created;

                          timeList.push(time.formatTimeTwo(timeItem, 'M-D'))
                        }
                        if (res.data.coupon) {
                          for (var i = 0; i < res.data.coupon.length; i++) {

                            var timeItem2 = res.data.coupon[i].end_time;

                            timeArr.push(time.formatTimeTwo(timeItem2, 'Y-M-D'))
                          }
                        } else {
                          that.setData({
                            youHidden: true
                          })
                        }
                        var times = time.formatTimeTwo(res.data.carefully[0].created, 'M-D');
                        that.setData({
                          time: timeList,
                          timeArr: timeArr,
                          time_top: times
                        })

                      } else if (res.data.intensive) {//笔记
                        if (res.data.status == 0) {
                          that.setData({
                            select: false
                          })
                        } else {

                        }
                        that.setData({
                          detail: res.data.intensive[0],
                          danjia: res.data.intensive[0].price,
                          price: res.data.intensive[0].price,
                          priceGou: res.data.intensive[0].price,
                          coupon: res.data.coupon,
                          ifBi: true,
                          jump_type: 2,
                          hiddenLoading: true,
                          status: res.data.status,
                          detailType: 'biji'
                        })
                        var timeList = []
                        var timeArr = []//优惠券结束时间
                        for (var i = 0; i < res.data.intensive.length; i++) {

                          var timeItem = res.data.intensive[i].created;

                          timeList.push(time.formatTimeTwo(timeItem, 'M-D'))
                        }
                        if (res.data.coupon) {
                          for (var i = 0; i < res.data.coupon.length; i++) {

                            var timeItem2 = res.data.coupon[i].end_time;

                            timeArr.push(time.formatTimeTwo(timeItem2, 'Y-M-D'))
                          }
                        } else {
                          that.setData({
                            youHidden: true
                          })
                        }
                        var times = time.formatTimeTwo(res.data.intensive[0].created, 'M-D');
                        that.setData({
                          time: timeList,
                          timeArr: timeArr,
                          time_top: times
                        })

                      } else if (res.data.read) {//读物
                        that.setData({
                          detail: res.data.read[0],
                          care_child: res.data.read_child,
                          danjia: res.data.read[0].price,
                          price: res.data.read[0].price,
                          priceGou: res.data.read[0].price,
                          coupon: res.data.coupon,
                          jump_type: 1,
                          hiddenLoading: true,
                          status: res.data.status,
                          ifRead: true,
                          select2: false,
                          detailType: 'duwu'
                        })
                        var timeList = []
                        var timeArr = []//优惠券结束时间
                        for (var i = 0; i < res.data.read_child.length; i++) {

                          var timeItem = res.data.read_child[i].created;

                          timeList.push(time.formatTimeTwo(timeItem, 'M-D'))
                        }
                        if (res.data.coupon) {
                          for (var i = 0; i < res.data.coupon.length; i++) {

                            var timeItem2 = res.data.coupon[i].end_time;

                            timeArr.push(time.formatTimeTwo(timeItem2, 'Y-M-D'))
                          }
                        } else {
                          that.setData({
                            youHidden: true
                          })
                        }
                        var times = time.formatTimeTwo(res.data.read[0].created, 'M-D');
                        that.setData({
                          time: timeList,
                          timeArr: timeArr,
                          time_top: times
                        })
                      }

                    }
                  })
                }
              })


          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      });
    } else {
      that.setData({
        id: options.id,
        type_num: options.type,
      })
      wx.request({
        url: 'https://kip.sharetimes.cn/interface/details',
        data: {
          id: options.id,
          type_num: options.type,
          openid: wx.getStorageSync('openId')
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          console.log(res);
          if (res.data.carefully) {//精读
            that.setData({
              detail: res.data.carefully[0],
              care_child: res.data.carefully_child,
              danjia: res.data.carefully[0].price,
              price: res.data.carefully[0].price,
              priceGou: res.data.carefully[0].price,
              coupon: res.data.coupon,
              jump_type: 1,
              hiddenLoading: true,
              status: res.data.status,
              detailType: 'jingdu'
            })
            var timeList = []
            var timeArr = []//优惠券结束时间
            for (var i = 0; i < res.data.carefully_child.length; i++) {

              var timeItem = res.data.carefully_child[i].created;

              timeList.push(time.formatTimeTwo(timeItem, 'M-D'))
            }
            if (res.data.coupon) {
              for (var i = 0; i < res.data.coupon.length; i++) {

                var timeItem2 = res.data.coupon[i].end_time;

                timeArr.push(time.formatTimeTwo(timeItem2, 'Y-M-D'))
              }
            } else {
              that.setData({
                youHidden: true
              })
            }
            var times = time.formatTimeTwo(res.data.carefully[0].created, 'M-D');
            that.setData({
              time: timeList,
              timeArr: timeArr,
              time_top: times
            })

          } else if (res.data.intensive) {//笔记
            if (res.data.status == 0) {
              that.setData({
                select: false
              })
            } else {

            }
            that.setData({
              detail: res.data.intensive[0],
              danjia: res.data.intensive[0].price,
              price: res.data.intensive[0].price,
              priceGou: res.data.intensive[0].price,
              coupon: res.data.coupon,
              ifBi: true,
              jump_type: 2,
              hiddenLoading: true,
              status: res.data.status,
              detailType: 'biji'
            })
            var timeList = []
            var timeArr = []//优惠券结束时间
            for (var i = 0; i < res.data.intensive.length; i++) {

              var timeItem = res.data.intensive[i].created;

              timeList.push(time.formatTimeTwo(timeItem, 'M-D'))
            }
            if (res.data.coupon) {
              for (var i = 0; i < res.data.coupon.length; i++) {

                var timeItem2 = res.data.coupon[i].end_time;

                timeArr.push(time.formatTimeTwo(timeItem2, 'Y-M-D'))
              }
            } else {
              that.setData({
                youHidden: true
              })
            }
            var times = time.formatTimeTwo(res.data.intensive[0].created, 'M-D');
            that.setData({
              time: timeList,
              timeArr: timeArr,
              time_top: times
            })

          } else if (res.data.read) {//读物
            that.setData({
              detail: res.data.read[0],
              care_child: res.data.read_child,
              danjia: res.data.read[0].price,
              price: res.data.read[0].price,
              priceGou: res.data.read[0].price,
              coupon: res.data.coupon,
              jump_type: 3,
              hiddenLoading: true,
              status: res.data.status,
              ifRead: true,
              select2: false,
              detailType: 'duwu'
            })
            var timeList = []
            var timeArr = []//优惠券结束时间
            for (var i = 0; i < res.data.read_child.length; i++) {

              var timeItem = res.data.read_child[i].created;

              timeList.push(time.formatTimeTwo(timeItem, 'M-D'))
            }
            if (res.data.coupon) {
              for (var i = 0; i < res.data.coupon.length; i++) {

                var timeItem2 = res.data.coupon[i].end_time;

                timeArr.push(time.formatTimeTwo(timeItem2, 'Y-M-D'))
              }
            } else {
              that.setData({
                youHidden: true
              })
            }
            var times = time.formatTimeTwo(res.data.read[0].created, 'M-D');
            that.setData({
              time: timeList,
              timeArr: timeArr,
              time_top: times
            })
          }

        }
      })
    }
  },

  giveTab: function () {
    this.setData({
      select: true,
      select2: false
    })
  },
  giveTab2: function () {
    this.setData({
      select: false,
      select2: true
    })
  },
  youHui: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.you(currentStatu)
  },
  gouMai: function (e) {
    wx.getSetting({
      success: res => {
        // console.log(res);
        if (res.authSetting['scope.userInfo']) {
          var currentStatu = e.currentTarget.dataset.statu;
          this.mai(currentStatu)
        } else {
          //未授权 提示用户授权
          wx.navigateTo({
            url: '../login/login',
          })
        }
      }
    })
    
  },
  zengSong: function (e) {
    wx.getSetting({
      success: res => {
        // console.log(res);
        if (res.authSetting['scope.userInfo']) {
          var currentStatu = e.currentTarget.dataset.statu;
          this.zeng(currentStatu)
        } else {
          //未授权 提示用户授权
          wx.navigateTo({
            url: '../login/login',
          })
        }
      }
    })
    
  },
  you: function (currentStatu) {//优惠券
    var animation = wx.createAnimation({
      duration: 200,  //动画时长  
      timingFunction: "linear", //线性  
      delay: 0  //0则不延迟  
    });
    this.animation = animation;
    animation.translateY(550).step();
    this.setData({
      animationData: animation.export()
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation
      })  
      if (currentStatu == "close") {
        this.setData(
          {
            showYou: false
          }
        );
      }
    }.bind(this), 200)
    if (currentStatu == "open") {
      this.setData(
        {
          showYou: true
        }
      );
    }
  },
  mai: function (currentStatu) {//购买
    var animation = wx.createAnimation({
      duration: 200,  //动画时长  
      timingFunction: "linear", //线性  
      delay: 0  //0则不延迟  
    });
    this.animation = animation;
    animation.translateY(300).step();
    this.setData({
      animationData: animation.export()
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation
      })
      if (currentStatu == "close") {
        this.setData(
          {
            showMai: false
          }
        );
      }
    }.bind(this), 200)
    if (currentStatu == "open") {
      this.setData(
        {
          showMai: true
        }
      );
    }
  },
  zeng: function (currentStatu) {//赠送
    var animation = wx.createAnimation({
      duration: 200,  //动画时长  
      timingFunction: "linear", //线性  
      delay: 0  //0则不延迟  
    });
    this.animation = animation;
    animation.translateY(300).step();
    this.setData({
      animationData: animation.export()
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation
      })
      if (currentStatu == "close") {
        this.setData(
          {
            showZeng: false
          }
        );
      }
    }.bind(this), 200)
    if (currentStatu == "open") {
      this.setData(
        {
          showZeng: true
        }
      );
    }
  },
  /* 点击减号 */
  bindMinus: function () {
    var num = this.data.num;
    // 如果大于1时，才可以减  
    if (num > 1) {
      num--;
    }
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num <= 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    this.setData({
      num: num,
      minusStatus: minusStatus
    });
    this.count();
  },
  /* 点击加号 */
  bindPlus: function () {
    var num = this.data.num;
    // 不作过多考虑自增1  
    num++;
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num < 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    this.setData({
      num: num,
      minusStatus: minusStatus
    });
    this.count();
  },
  /* 输入框事件 */
  bindManual: function (e) {
    console.log(e.detail.value)
    var num = e.detail.value;
    var minusStatus;
    if (e.detail.value.length == 0) {
      this.setData({
        num: 1,
        minusStatus: 'disabled'
      });
      this.count();
    } else if (e.detail.value > 1) {
      this.setData({
        num: num,
        minusStatus: 'normal'
      });
      this.count();
    } else if (e.detail.value == 1) {
      this.setData({
        num: num,
        minusStatus: 'disabled'
      });
      this.count();
    }
  },
  count:function() {
    var price = (this.data.num * this.data.danjia).toFixed(1);
    this.setData({
      price:price
    })
  },
  previewImg:function(e) {
    wx.previewImage({
      current: e.target.dataset.src, // 当前显示图片的http链接
      urls: [e.target.dataset.src] // 需要预览的图片http链接列表
    })
  },
  sureZeng:function(){//确认赠送购买
    var that = this;
    wx.getSetting({
      success: res => {
        // console.log(res);
        if (res.authSetting['scope.userInfo']) {
          wx.request({
            url: 'https://kip.sharetimes.cn/interface/push-order',
            data: {
              openid: wx.getStorageSync('openId'),
              price: (that.data.price * 100).toFixed(0),
              // price:1,
              jump_type: that.data.jump_type,
              id: that.data.detail.id,
              hui_id: that.data.coupon_id,
              order_type:1
            },
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              console.log(res);
              wx.requestPayment({
                timeStamp: res.data.timeStamp,
                nonceStr: res.data.nonceStr,
                package: res.data.package,
                signType: 'MD5',
                paySign: res.data.paySign,
                success: function (res) {
                  wx.redirectTo({
                    url: '../give/give'
                  })
                }
              })
            }
          })
        } else {
          //未授权 提示用户授权
          wx.navigateTo({
            url: '../login/login',
          })
        }
      }
    })
  }, 
  sureMai:function() {//确认支付
  var that = this;
    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log((that.data.priceGou * 100).toFixed(0));
        if (res.authSetting['scope.userInfo']) {
          wx.request({
            url: 'https://kip.sharetimes.cn/interface/push-order',
            data:{
              openid:wx.getStorageSync('openId'),
              price: (that.data.priceGou * 100).toFixed(0),
              // price:1,
              jump_type: that.data.jump_type,
              id: that.data.detail.id,
              hui_id: that.data.coupon_id
            },
            header: {
              'content-type': 'application/json'
            },
            success:function(res) {
              console.log(res);
              wx.requestPayment({
                timeStamp: res.data.timeStamp,
                nonceStr: res.data.nonceStr,
                package: res.data.package,
                signType: 'MD5',
                paySign: res.data.paySign,
                success:function(res) {
                  that.setData({
                    hiddenLoading:false
                  })
                  wx.redirectTo({
                    url:'../detail/detail?id='+that.data.id+'&type='+that.data.type_num
                  })
                }
              })
            }
          })
        } else {
          //未授权 提示用户授权
          wx.navigateTo({
            url: '../login/login',
          })
        }
      }
    })
  },
  goShi:function(e) {
    wx.navigateTo({
      url: '../shi/shi?id=' + e.currentTarget.dataset.id + '&type=1',
    })
  },
  goDao:function(e) {
    var that = this;
    wx.navigateTo({
      url: '../yin/yin?id=' + e.currentTarget.dataset.id + '&type=1' + '&parId=' + that.data.id,
    })
  },
  goYin:function(e) {
    var that = this;
    if (e.currentTarget.dataset.index == 0 && that.data.status == 0) {//没购买且是第一个子集
      wx.navigateTo({
        url: '../yin/yin?id=' + e.currentTarget.dataset.id + '&type=2' + '&parId=' + that.data.id + '&status=' + that.data.status + '&detailtype=' + e.currentTarget.dataset.detailtype,
      })
    } else if (e.currentTarget.dataset.index !== 0 && that.data.status == 0){
      wx.showToast({
        title: '请先购买',
        icon: 'none',
        duration: 1500
      })
    } else if (that.data.status == 1) {
      wx.navigateTo({
        url: '../yin/yin?id=' + e.currentTarget.dataset.id + '&type=2' + '&parId=' + that.data.id + '&detailtype=' + e.currentTarget.dataset.detailtype,
      })
    } 
    
  },
  goChoose:function(e) {
    wx.navigateTo({
      url: '../choose/choose?openid=' + wx.getStorageSync('openId') + '&id=' + this.data.id + '&type_num=' + this.data.type_num + '&price=' + this.data.detail.price,
    })
  },
  ling:function(e) {
    wx.request({
      url: 'https://kip.sharetimes.cn/interface/party-coupon',
      method: 'POST',
      data: {
        hui_id:e.currentTarget.dataset.id,
        openid: wx.getStorageSync('openId')
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if(res.data.code == 0) {
          wx.showToast({
            title: '领取成功',
            icon: 'success',
            duration: 2000
          })
        } else if(res.data.code == 1) {
          wx.showToast({
            title: '超出限领个数',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  }
})