// pages/mood-poster/mood-poster.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: 0,
    moodDetail: {},
    canvasImg: '', //从云存储下载下来的图片，需要绘制的图片
    imgUrl: ''  //canvas绘制完成的图片
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { id } = options
    this.setData({
      //获取屏幕高度 - 60
      height: wx.getSystemInfoSync().windowHeight - 60  
    })
    const that = this;
    wx.showLoading({
      title: '生成图片中',
      mask: true
    })
    const db = wx.cloud.database();
    //获取指定id的信息
    db.collection('moodList').where({
      _id: id
    }).get().then(res => {
      //获取信息成功后，下载云图片到临时路径 (云存储路径无法直接绘制，需要先下载)
      wx.cloud.downloadFile({
        fileID: res.data[0].src,
        success(res) {
          that.setData({
            canvasImg: res.tempFilePath
          })
          //获取信息成功后开始绘制图片
          that.canvasImage()
        },
        fail(err){
          wx.showToast({
            title: '图片下载失败',
            icon: 'none'
          })
        }
      })
      this.setData({
        moodDetail: res.data[0]
      })
    })
    
  },
  //绘制图片
  canvasImage(){
    let moodDetail = this.data.moodDetail;
    //处理日期 yy-mm-dd
    const year = moodDetail.time.getFullYear()
    const month = moodDetail.time.getMonth() + 1
    const day = moodDetail.time.getDate()
    const date = `${year}/${month}/${day}`
    //处理title，已逗号分隔成数组
    const titleArr = moodDetail.title.split('，')
    let posterInfo = {   //绘制图片所需信息
      text1: titleArr[0],
      text2: titleArr[1],
      imgSrc: this.data.canvasImg,
      time: date,
      posterBg: '/images/poster-bg.jpg',
      code: '/images/code.jpg'
    }
    //开始绘制
    let context = wx.createCanvasContext('mood-canvas')
    context.drawImage(posterInfo.posterBg, 0, 0, 320, 320)  //背景
    context.drawImage(posterInfo.imgSrc, 0, 0, 320, 220)    //主图
    context.setFontSize(16)
    context.fillText(posterInfo.text1, 20, 250)
    context.fillText(posterInfo.text2, 20, 276)
    context.setFontSize(12)
    context.fillText(posterInfo.time, 20, 300)
    context.drawImage(posterInfo.code, 220, 230, 80, 80)    //二维码
    context.draw(false, this.canvasToTempFilePath())
  },
  //绘制完成生成图片
  canvasToTempFilePath(){
    let that = this;
    setTimeout(() => {
      wx.canvasToTempFilePath({
        canvasId: 'mood-canvas',
        x: 0,
        y: 0,
        width: 320,
        height: 320,
        destWidth: 640,
        destHeight: 640,
        fileType: 'jpg',
        quality: 1,
        success: function (res) {
          that.setData({
            imgUrl: res.tempFilePath
          })
          wx.hideLoading()
        },
        fail: function () {
          wx.hideLoading()
          wx.showToast({
            title: '生成图片失败，请重试',
          })
        }
      }, this)
    }, 1000)
      
  },
  //保存到相册
  savePoster(){
    wx.saveImageToPhotosAlbum({
      filePath: this.data.imgUrl,
      success(res) {
        wx.showToast({
          title: '保存成功',
          icon: 'none'
        })
      },
      fail() {
        wx.showToast({
          title: '保存失败',
          icon: 'none'
        })
      }
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