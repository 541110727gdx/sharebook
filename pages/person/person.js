//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    btnInfo: '获取验证码',
    hasUserInfo: false,
    phone:'',
    isdisable: true,
    phoneDis:false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    sexList:['男','女'],
    sex:'未设置',
    cityList: ["北京", "上海", "天津", "重庆", "河北", "山西", "内蒙", "辽宁", "吉林", "黑龙江", "江苏", "浙江", "安徽", "福建", "江西", "山东", "河南", "湖北", "湖南", "广东", "广西", "海南", "四川", "贵州", "云南", "西藏", "陕西", "甘肃", "宁夏", "青海", "新疆", "香港", "澳门", "台湾", "其它"],
    city:'未设置',
    date:'未设置',
    hangValue:'',
    zhiValue:'',
    ifBao:'dis',
    ifNum:true
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    
    if(wx.getStorageSync('sex')) {
      this.setData({
        sex: wx.getStorageSync('sex')
      })
    }
    if (wx.getStorageSync('city')) {
      this.setData({
        city: wx.getStorageSync('city')
      })
    }
    if (wx.getStorageSync('date')) {
      this.setData({
        date: wx.getStorageSync('date')
      })
    }
    if (wx.getStorageSync('hangValue')) {
      this.setData({
        hangValue: wx.getStorageSync('hangValue')
      })
    }
    if (wx.getStorageSync('zhiValue')) {
      this.setData({
        zhiValue: wx.getStorageSync('zhiValue')
      })
    }
    if (wx.getStorageSync('mobile')) {
      this.setData({
        phone: wx.getStorageSync('mobile')
      })
    }

    wx.setNavigationBarTitle({
      title: '我的'
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  bindSexChange: function (e) {//性别
    var that = this;
    this.setData({
      sex: that.data.sexList[e.detail.value],
      ifBao:''
    })
    wx.setStorageSync('sex', that.data.sexList[e.detail.value])
  },
  bindCityChange:function(e) {//城市
    var that = this;
    this.setData({
      city: e.detail.value,
      ifBao: ''
    })
    wx.setStorageSync('city', e.detail.value)
  },
  bindDateChange: function (e) {//生日
    this.setData({
      date: e.detail.value,
      ifBao: ''
    })
    wx.setStorageSync('date', e.detail.value)
  },
  bindHangInput: function (e) {//行业
  
    this.setData({
      hangValue: e.detail.value,
      ifBao: ''
    })
    wx.setStorageSync('hangValue', e.detail.value)
    
  },
  bindZhiInput: function (e) {//职位
    this.setData({
      zhiValue: e.detail.value,
      ifBao: ''
    })
    wx.setStorageSync('zhiValue', e.detail.value)
  },
  save:function(e) {
    var that = this;
    var citys = null;
    if (e.target.dataset.class == 'dis') {
      
    } else {
      if (wx.getStorageSync('city')) {
        citys = wx.getStorageSync('city').join("-");

      } else {

      }
      wx.request({
        url: 'https://kip.sharetimes.cn/interface/party',
        method: 'POST',
        data: {
          sex: wx.getStorageSync('sex'),
          city: citys,
          birthday: wx.getStorageSync('date'),
          industry: wx.getStorageSync('hangValue'),
          position: wx.getStorageSync('zhiValue'),
          mobile: wx.getStorageSync('phone'),
          openid:wx.getStorageSync('openId')
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log(res)
          wx.navigateBack({
            delta: 1
          })
          wx.showToast({
            title: '修改成功',
            icon: 'success',
            duration: 2000
          })
        }
      })
    }
  },
  phone:function() {
    this.setData({
      ifNum:false
    })
  },
  cancel:function() {
    this.setData({
      ifNum:true
    })
  },
  //手机号输入框事件
  phoneInput: function (e) {
    this.setData({
      phone: e.detail.value
    })
    if (e.detail.value.length == 11) {
      this.setData({
        isdisable: false
      })
    } else {
      this.setData({
        isdisable: true
      })
    }
  },
  //获取验证码
  getCode: function () {
    var that = this
    var count = 60;
    const re = /^1[3|4|5|7|8][0-9]\d{4,8}$/;
    if (!re.test(that.data.phone)) {
      wx.showToast({
        title: '手机号不正确',
        image: '../../img/error.png',
        duration: 2000
      })
      return false;
    } else {
      if (that.data.isdisable == false) {
        that.sendcode()
        var timer = setInterval(function () {
          count--;
          if (count >= 1) {
            that.setData({
              btnInfo: count + 's',
              isdisable: true
            })
          } else {
            that.setData({
              btnInfo: '获取验证码',
              isdisable: false
            })
            clearInterval(timer);
          }
        }, 1000);

      }
    }
  },
  sendcode: function () {
    var that = this
    console.log(that.data.phone)
    wx.request({
      method: 'GET',
      url: 'https://kip.sharetimes.cn/interface/code',
      data: {
        mobile: that.data.phone
      },
      success: function (res) {
        that.setData({
          code1: res.data,
          phoneDis:true
        })
        console.log(that.data.code1)
      },
      header: {//请求头
        'content-type': 'application/x-www-form-urlencoded'
      },
    })
  },
  //验证码输入框
  codeInput: function (e) {
    this.setData({
      code2: e.detail.value
    })
  },
  sure:function() {
    var that = this;
    const re = /^1[3|4|5|7|8][0-9]\d{4,8}$/;
    if (!re.test(that.data.phone)) {
      wx.showToast({
        title: '手机号不正确',
        image: '../../img/error.png',
        duration: 2000
      })
      return false;
    } else {
      if (that.data.code1 != null && that.data.code2 != null && (that.data.code1 == that.data.code2)) {
        wx.setStorageSync('mobile', that.data.phone);
        that.setData({
          ifNum: true,
          ifBao: ''
        })
      } else {
        wx.showToast({
          title: '验证码不正确',
          image: '../../img/error.png',
          duration: 2000
        })
      }
    }
  }
})
