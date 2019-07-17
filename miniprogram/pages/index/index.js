//index.js
const app = getApp()

Page({
  data: {
    hasUserInfo: false,
    playMusic: true
  },

  onLoad: function() {
    wx.showLoading({
      mask: true,
      title: '正在加载',
    })
    this.onGetOpenid();
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
    wx.playBackgroundAudio({
      dataUrl: 'http://www.ytmp3.cn/down/48414.mp3'
    })
    wx.getBackgroundAudioPlayerState({
      success(res) {
        console.log(res)
      }
    })
  },
  playMusic(){
    this.setData({
      playMusic: !this.data.playMusic
    })
    if (this.data.playMusic){
      wx.playBackgroundAudio({
        dataUrl: 'http://www.ytmp3.cn/down/48414.mp3'
      })
    }else{
      wx.stopBackgroundAudio()
    }
  },
  toIndex(){
    wx.switchTab({
      url: '/pages/home/home',
    })
  },
  getUserInfo(e){
    const db = wx.cloud.database();
    if (e.detail.errMsg == "getUserInfo:ok"){
      let userinfo = e.detail.userInfo;
      db.collection('userInfo').add({
        data: userinfo
      }).then(() => {
        wx.showToast({
          title: '授权成功',
          icon: 'none'
        })
        this.toIndex()
      })
    }else{
      wx.showToast({
        title: '请先授权',
        icon: 'none'
      })
    }
  },
  onGetOpenid: function() {
    const db = wx.cloud.database();
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        app.globalData.openid = res.result.openid
        let openId = res.result.openid
        db.collection('userInfo').where({
          '_openid': openId
        }).get().then(res => {
          if(res.data.length){
            this.setData({
              hasUserInfo: true
            })
          }
          wx.hideLoading()
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
  },
  onShareAppMessage() {
    return {
      title: '凭兰秋思',
      path: '/pages/index/index',
      imageUrl: '/images/share.jpg'
    }
  },
  

})
