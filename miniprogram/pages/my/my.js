const { admin } = require("../../config/env");

// pages/my/my.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [
      // { id: 0, icon: '/images/comment.png', name: '留言', to: '/pages/message/message'}
    ],
    isSelf: false,
    openid: ''
  },
  navigator(e){
    let url = e.currentTarget.dataset.url;
    wx.navigateTo({
      url: url,
    })
  },

  // getUserInfo(e){
  //   const db = wx.cloud.database();
  //   if (e.detail.errMsg == "getUserInfo:ok"){
  //     let userinfo = e.detail.userInfo;
  //     db.collection('userInfo').add({
  //       data: {
  //         ...userinfo,
  //         admin: false
  //       }
  //     }).then(() => {
  //       this.onGetOpenid(() => {
  //         this.init();
  //       });
  //       wx.showToast({
  //         title: '登录成功',
  //         icon: 'none'
  //       })
  //       this.toIndex()
  //     })
  //   }else{
  //     wx.showToast({
  //       title: '请先授权',
  //       icon: 'none'
  //     })
  //   }
  // },
  // onGetOpenid: function(fn) {
  //   const db = wx.cloud.database();
  //   // 调用云函数
  //   wx.cloud.callFunction({
  //     name: 'login',
  //     data: {},
  //     success: res => {
  //       app.globalData.openid = res.result.openid;
  //       let openId = res.result.openid;
  //       db.collection('userInfo').where({
  //         '_openid': openId
  //       }).get().then(res => {
  //         if(res.data.length){
  //           this.setData({
  //             hasUserInfo: true
  //           })
  //         }
  //         fn();
  //         wx.hideLoading()
  //       })
  //     },
  //     fail: err => {
  //       console.error('[云函数] [login] 调用失败', err)
  //     }
  //   })
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.init();
  },
  init(){
    // if(app.globalData.openid){
    //   db.collection('userInfo').where({
    //     _openid: app.globalData.openid
    //   }).get().then(res => {
    //     console.log(res)
    //   })
    // }
    if (admin.includes(app.globalData.openid)) {
      this.setData({
        isSelf: true
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    return {
      title: '凭兰秋思',
      path: '/pages/index/index',
      imageUrl: '/images/share.jpg'
    }
  },
})