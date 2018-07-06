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
    parId:'',
    yinId_pre:'',
    yinId_next:'',
    first:'',
    now:'',
    last:'',
    detailType:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options)
    that.setData({
      yinId: options.id,
      parId: options.parId,
      status:options.status,
      detailType: options.detailtype
    })
    if (that.data.detailType == 'duwu') {//有声读物
      wx.request({
        url: 'https://kip.sharetimes.cn/interface/get-audios',
        data: {
          child_id: options.id,
          parent_id: options.parId
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          console.log(res)
          if (that.data.status == 0) {//未购买，不显示上一首下一首

          } else {
            if (res.data.first !== 0) {
              that.setData({
                pre: '../../img/pre.png',
                first: res.data.first,
                yinId_pre: res.data.first.id,
              })
            }
            if (res.data.last !== 0) {
              that.setData({
                next: '../../img/next.png',
                last: res.data.last,
                yinId_next: res.data.last.id
              })
            }
          }

        }
      })
      if (options.index) {
        wx.request({
          url: 'https://kip.sharetimes.cn/interface/audio-reads',
          method: 'GET',
          data: {
            id: options.id,
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            console.log(res);
            var Miao = time.miao(res.data.audio_time);
            var Time = time.formatTimeTwo(res.data.created, 'Y-M-D')
            var Max = parseInt(res.data.audio_time)
            that.setData({
              yin: res.data,
              sliderMax: Miao,
              time: Time,
              max: Max,
              hiddenLoading: true,
              type_num: options.type
            })
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
      } else {
        wx.request({
          url: 'https://kip.sharetimes.cn/interface/audio-reads',
          method: 'GET',
          data: {
            id: options.id,
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            // console.log(res);
            var Miao = time.miao(res.data.audio_time);
            var Time = time.formatTimeTwo(res.data.created, 'Y-M-D')
            var Max = parseInt(res.data.audio_time)
            that.setData({
              yin: res.data,
              sliderMax: Miao,
              time: Time,
              max: Max,
              hiddenLoading: true,
              type_num: options.type
            })
            if (app.getBackgroundAudioManager().src == res.data.video_url) {
              backgroundAudioManager.onTimeUpdate(function () {
                if (!that.data.isMovingSlider) {
                  that.setData({
                    curTime: time.miao(backgroundAudioManager.currentTime),
                    sliderValue: Math.floor(backgroundAudioManager.currentTime)
                  })
                }
              })
            } else {
              backgroundAudioManager.src = res.data.video_url
              backgroundAudioManager.title = that.data.yin.title_name
              backgroundAudioManager.coverImgUrl = that.data.yin.title_img
              backgroundAudioManager.play();//音频播放
              app.globalData.detailtype = that.data.detailType;
              app.globalData.backId = that.data.yinId;
              app.globalData.type = that.data.type_num;
              app.globalData.parId = that.data.parId;
              app.globalData.index = true;
              console.log(app.globalData)
              backgroundAudioManager.onTimeUpdate(function () {
                if (!that.data.isMovingSlider) {
                  that.setData({
                    curTime: time.miao(backgroundAudioManager.currentTime),
                    sliderValue: Math.floor(backgroundAudioManager.currentTime)
                  })
                }
              })
            }

          }
        })
      }
    } else {
      if (options.type == 2) {//子集
        wx.request({
          url: 'https://kip.sharetimes.cn/interface/get-audio',
          data: {
            child_id: options.id,
            parent_id: options.parId
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            console.log(res)
            if (that.data.status == 0) {//未购买，不显示上一首下一首

            } else {
              if (res.data.first !== 0) {
                that.setData({
                  pre: '../../img/pre.png',
                  first: res.data.first,
                  yinId_pre: res.data.first.id,
                })
              }
              if (res.data.last !== 0) {
                that.setData({
                  next: '../../img/next.png',
                  last: res.data.last,
                  yinId_next: res.data.last.id
                })
              }
            }

          }
        })
      }
      if (options.index) {
        wx.request({
          url: 'https://kip.sharetimes.cn/interface/audio-read',
          method: 'GET',
          data: {
            id: options.id,
            type_num: options.type,
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            console.log(res);
            var Miao = time.miao(res.data.audio_time);
            var Time = time.formatTimeTwo(res.data.created, 'Y-M-D')
            var Max = parseInt(res.data.audio_time)
            that.setData({
              yin: res.data,
              sliderMax: Miao,
              time: Time,
              max: Max,
              hiddenLoading: true,
              type_num: options.type
            })
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
      } else {
        wx.request({
          url: 'https://kip.sharetimes.cn/interface/audio-read',
          method: 'GET',
          data: {
            id: options.id,
            type_num: options.type,
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            console.log(res);
            var Miao = time.miao(res.data.audio_time);
            var Time = time.formatTimeTwo(res.data.created, 'Y-M-D')
            var Max = parseInt(res.data.audio_time)
            that.setData({
              yin: res.data,
              sliderMax: Miao,
              time: Time,
              max: Max,
              hiddenLoading: true,
              type_num: options.type
            })
            if (app.getBackgroundAudioManager().src == res.data.video_url) {
              backgroundAudioManager.onTimeUpdate(function () {
                if (!that.data.isMovingSlider) {
                  that.setData({
                    curTime: time.miao(backgroundAudioManager.currentTime),
                    sliderValue: Math.floor(backgroundAudioManager.currentTime)
                  })
                }
              })
            } else {
              backgroundAudioManager.src = res.data.video_url
              backgroundAudioManager.title = that.data.yin.title_name
              backgroundAudioManager.coverImgUrl = that.data.yin.title_img
              backgroundAudioManager.play();//音频播放
              app.globalData.detailtype = that.data.detailType;
              app.globalData.backId = that.data.yinId;
              app.globalData.type = that.data.type_num;
              app.globalData.parId = that.data.parId;
              app.globalData.index = true;
              console.log(app.globalData)
              backgroundAudioManager.onTimeUpdate(function () {
                if (!that.data.isMovingSlider) {
                  that.setData({
                    curTime: time.miao(backgroundAudioManager.currentTime),
                    sliderValue: Math.floor(backgroundAudioManager.currentTime)
                  })
                }
              })
            }

          }
        })
      }
    }
    
    
    
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
  next:function(e) {
    var that = this;
    
    if(that.data.next == '../../img/next.png') {
      that.setData({
        hiddenLoading: false
      })
      if(that.data.detailType == 'duwu') {//有声读物
        wx.request({
          url: 'https://kip.sharetimes.cn/interface/get-audios',
          data: {
            child_id: that.data.yinId_next,
            parent_id: that.data.parId
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            console.log(res)
            if (res.data.first !== 0) {
              that.setData({
                pre: '../../img/pre.png',
                first: res.data.first,
                yinId_pre: res.data.first.id,
                yinId: res.data.now.id
              })
            }
            if (res.data.last !== 0) {
              that.setData({
                next: '../../img/next.png',
                last: res.data.last,
                yinId_next: res.data.last.id,
                yinId: res.data.now.id
              })
            } else {
              that.setData({
                next: '../../img/next_hui.png'
              })
            }
            var Miao = time.miao(res.data.now.audio_time);
            var Time = time.formatTimeTwo(res.data.now.created, 'Y-M-D')
            var Max = parseInt(res.data.now.audio_time)
            that.setData({
              yin: res.data.now,
              sliderMax: Miao,
              time: Time,
              max: Max,
              hiddenLoading: true
            })
            backgroundAudioManager.src = that.data.yin.video_url
            backgroundAudioManager.title = that.data.yin.title_name
            backgroundAudioManager.coverImgUrl = that.data.yin.title_img
            backgroundAudioManager.play();//音频播放
            app.globalData.backId = that.data.yinId;
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
      } else {
        wx.request({
          url: 'https://kip.sharetimes.cn/interface/get-audio',
          data: {
            child_id: that.data.yinId_next,
            parent_id: that.data.parId
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            console.log(res)
            if (res.data.first !== 0) {
              that.setData({
                pre: '../../img/pre.png',
                first: res.data.first,
                yinId_pre: res.data.first.id,
                yinId: res.data.now.id
              })
            }
            if (res.data.last !== 0) {
              that.setData({
                next: '../../img/next.png',
                last: res.data.last,
                yinId_next: res.data.last.id,
                yinId: res.data.now.id
              })
            } else {
              that.setData({
                next: '../../img/next_hui.png'
              })
            }
            var Miao = time.miao(res.data.now.audio_time);
            var Time = time.formatTimeTwo(res.data.now.created, 'Y-M-D')
            var Max = parseInt(res.data.now.audio_time)
            that.setData({
              yin: res.data.now,
              sliderMax: Miao,
              time: Time,
              max: Max,
              hiddenLoading: true
            })
            backgroundAudioManager.src = that.data.yin.video_url
            backgroundAudioManager.title = that.data.yin.title_name
            backgroundAudioManager.coverImgUrl = that.data.yin.title_img
            backgroundAudioManager.play();//音频播放
            app.globalData.backId = that.data.yinId;
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
      }

      
    } else {

    }
  },
  pre:function() {
    var that = this;
    
    if (that.data.pre == '../../img/pre.png') {
      that.setData({
        hiddenLoading: false
      })
      if(that.data.detailType == 'duwu') {//有声读物
        wx.request({
          url: 'https://kip.sharetimes.cn/interface/get-audios',
          data: {
            child_id: that.data.yinId_pre,
            parent_id: that.data.parId
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            console.log(res)
            if (res.data.first !== 0) {
              that.setData({
                pre: '../../img/pre.png',
                first: res.data.first,
                yinId_pre: res.data.first.id,
                yinId: res.data.now.id
              })
            } else {
              that.setData({
                pre: '../../img/pre_hui.png'
              })
            }
            if (res.data.last !== 0) {
              that.setData({
                next: '../../img/next.png',
                last: res.data.last,
                yinId_next: res.data.last.id,
                yinId: res.data.now.id
              })
            } else {
              that.setData({
                next: '../../img/next_hui.png'
              })
            }
            var Miao = time.miao(res.data.now.audio_time);
            var Time = time.formatTimeTwo(res.data.now.created, 'Y-M-D')
            var Max = parseInt(res.data.now.audio_time)
            that.setData({
              yin: res.data.now,
              sliderMax: Miao,
              time: Time,
              max: Max,
              hiddenLoading: true
            })
            backgroundAudioManager.src = that.data.yin.video_url
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
      } else {
        wx.request({
          url: 'https://kip.sharetimes.cn/interface/get-audio',
          data: {
            child_id: that.data.yinId_pre,
            parent_id: that.data.parId
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            console.log(res)
            if (res.data.first !== 0) {
              that.setData({
                pre: '../../img/pre.png',
                first: res.data.first,
                yinId_pre: res.data.first.id,
                yinId: res.data.now.id
              })
            } else {
              that.setData({
                pre: '../../img/pre_hui.png'
              })
            }
            if (res.data.last !== 0) {
              that.setData({
                next: '../../img/next.png',
                last: res.data.last,
                yinId_next: res.data.last.id,
                yinId: res.data.now.id
              })
            } else {
              that.setData({
                next: '../../img/next_hui.png'
              })
            }
            var Miao = time.miao(res.data.now.audio_time);
            var Time = time.formatTimeTwo(res.data.now.created, 'Y-M-D')
            var Max = parseInt(res.data.now.audio_time)
            that.setData({
              yin: res.data.now,
              sliderMax: Miao,
              time: Time,
              max: Max,
              hiddenLoading: true
            })
            backgroundAudioManager.src = that.data.yin.video_url
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
      }
      
    } else {

    }
  }
})