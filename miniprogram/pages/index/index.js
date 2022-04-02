//index.js
const app = getApp()
const db = wx.cloud.database();
Page({
  data: {
    hasUserInfo: false,
    playMusic: true,
    music_address: 'https://freetyst.nf.migu.cn/public%2FproductBe%2FproductB03%2F2019%2F10%2F0718%2F2010%E5%B9%B402%E6%9C%8823%E6%97%A5%E6%B5%B7%E8%9D%B6%E5%94%B1%E7%89%87%2F%E5%85%A8%E6%9B%B2%E8%AF%95%E5%90%AC%2FMp3_64_22_16%2F60058622750.mp3',
    videoHeight: '',
    h5_img_list: [
      {

      }
    ],
    current: 0,
    list: []
  },

  onLoad: function() {
    // wx.showLoading({
    //   mask: true,
    //   title: '正在加载',
    // })
    //this.onGetOpenid();
    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           this.setData({
    //             avatarUrl: res.userInfo.avatarUrl,
    //             userInfo: res.userInfo
    //           })
    //         }
    //       })
    //     }
    //   }
    // })
    this.onGetOpenid(); //获取openid
    //播放音乐
    // wx.playBackgroundAudio({
    //   dataUrl: this.data.music_address
    // })
    // wx.getBackgroundAudioPlayerState({
    //   success(res) {
    //     console.log(res)
    //   }
    // })
    this.setData({
      videoHeight: wx.getSystemInfoSync().windowHeight
    });
    db.collection('pictureList').where({
      index_show: true
    }).get().then(res => {
      let list = res.data;
      //index_rank排序
      if(list.length){
        list.sort(function(a, b) {
          return a.index_rank - b.index_rank
        });
      }
      this.setData({
        list
      })
    })
  },
  // playMusic(){
  //   this.setData({
  //     playMusic: !this.data.playMusic
  //   })
  //   if (this.data.playMusic){
  //     wx.playBackgroundAudio({
  //       dataUrl: this.data.music_address
  //     })
  //   }else{
  //     wx.pauseBackgroundAudio()
  //   }
  // },
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
        data: {
          ...userinfo,
          admin: false
        }
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
  currentChange(e){
    const current = e.detail.current;
    this.setData({
      current
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
