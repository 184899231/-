// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'cloud://marco-4ce7ef.6d61-marco-4ce7ef/自拍/1551692937696.jpg',
      '/images/lunbo1.jpg',
      '/images/lunbo2.jpg',
      '/images/lunbo3.jpg'
    ],
    bigImg: 'cloud://marco-4ce7ef.6d61-marco-4ce7ef/自拍/1551692937696.jpg'
  },
  selectImg(e){
    let index = e.currentTarget.dataset.index;
    this.setData({
      bigImg: this.data.imgUrls[index]
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const db = wx.cloud.database();

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