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
    isSelf: false
  },
  navigator(e){
    let url = e.currentTarget.dataset.url;
    wx.navigateTo({
      url: url,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.openid === 'o0oLx0HwxjATxR2i7vyaHhih_1XU' || app.globalData.openid === 'o0oLx0OGVOkgcUNpGD-hK_vcFP78') {
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