// pages/home/home.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [],
    bigImg: ''
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
  onLoad: function () {
    db.collection('pictureList').where({
      home_recommend: true
    }).get().then(res => {
      let img_list = [];
      const list = res.data;
      for(let i = 0; i < list.length; i++){
        img_list.push(list[i].src)
      }
      this.setData({
        imgUrls: img_list,
        bigImg: img_list[0]
      })
    })

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