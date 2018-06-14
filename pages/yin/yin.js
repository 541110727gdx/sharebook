// pages/shi/shi.js
const time = require('../../utils/util.js');
const app = getApp();
const backgroundAudioManager = app.getBackgroundAudioManager()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    yin:'',
    time:'',
    curTime:'00:00',
    sliderMax:'',
    sliderValue:'',
    playImg:'../../img/paused.png',
    isMovingSlider:false,
    max:'',
    hiddenLoading:false,
    yinId:'',
    pre:'../../img/pre_hui.png',
    next:'../../img/next_hui.png',
    parId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      yinId:options.id,
      parId: options.parId
    })
    // wx.request({
    //   url: 'https://kip.sharetimes.cn/interface/get-audio',
    //   data:{
    //     child_id:options.id,
    //     parent_id:options.parId
    //   },
    //   header: {
    //     'content-type': 'application/json'
    //   },
    //   success:function(res) {
    //     console.log(res)
    //   }
    // })
    wx.request({
      url: 'https://kip.sharetimes.cn/interface/audio-read',
      method: 'GET',
      data: {
        id:options.id,
        type_num:options.type,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res);
        var Miao = time.miao(res.data.audio_time);
        var Time = time.formatTimeTwo(res.data.created,'Y-M-D')
        var Max = parseInt(res.data.audio_time)
        that.setData({
          yin:res.data,
          sliderMax:Miao,
          time:Time,
          max:Max,
          hiddenLoading:true
        })
        
        // backgroundAudioManager.src = 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46'
        backgroundAudioManager.src = res.data.video_url
        backgroundAudioManager.title = that.data.yin.title_name
        backgroundAudioManager.coverImgUrl = that.data.yin.title_img
        backgroundAudioManager.play();//音频播放
        app.globalData.backId = that.data.yinId
        backgroundAudioManager.onTimeUpdate(function () {
          if (!that.data.isMovingSlider) {
            that.setData({
              curTime: time.miao(backgroundAudioManager.currentTime),
              sliderValue: Math.floor(backgroundAudioManager.currentTime)
            })
          }
        })
      }
    })
    
  },
  previewImg: function (e) {
    wx.previewImage({
      current: e.target.dataset.src, // 当前显示图片的http链接
      urls: [e.target.dataset.src] // 需要预览的图片http链接列表
    }) 
  },
  goLiu:function() {
    wx.navigateTo({
      url: '../liu/liu'
    })
  },
  play:function() {
    var that = this;
    if (that.data.playImg == '../../img/paused.png') {//正在播放
      backgroundAudioManager.pause();
      that.setData({
        playImg:'../../img/play.png'
      })
    } else {
      backgroundAudioManager.play();
      that.setData({
        playImg: '../../img/paused.png'
      })
    }
  },
  hanleSliderChange:function(e) {
    console.log(e.detail.value)
    var that = this;
    const position = e.detail.value;
    if (that.data.playImg == '../../img/paused.png') {//正在播放
      wx.seekBackgroundAudio({
        position: Math.floor(position),
      })
    } else {
      that.setData({
        curTime: Math.floor(position),
        sliderValue: Math.floor(position)
      })
      wx.seekBackgroundAudio({
        position: Math.floor(position),
      })
    }
  },
  handleSliderMoveStart() {
    this.setData({
      isMovingSlider: true
    });
  },
  handleSliderMoveEnd() {
    this.setData({
      isMovingSlider: false
    });
  }, 
})