// pages/picture_list/picture_list.js
const app = getApp()
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    note: [],  //图片所有信息列表，用于展示
    imagesList: [], //仅图片列表，同于预览图
  },
  //预览图片
  previewImage(e){
    let index = e.detail;
    wx.previewImage({
      current: this.data.imagesList[index], // 当前显示图片的http链接
      urls: this.data.imagesList // 需要预览的图片http链接列表
    })
  },
  //长按显示编辑
  showEditEvent(e){
    if (app.globalData.openid === 'o0oLx0HwxjATxR2i7vyaHhih_1XU' || app.globalData.openid === 'o0oLx0OGVOkgcUNpGD-hK_vcFP78'){
      let index = e.detail;
      let note = this.data.note;
      note.map((item) => {
        item.showEdit = false
      })
      note[index].showEdit = true;
      this.setData({
        note
      })
      wx.vibrateShort()
    }
  },
  //编辑图片
  // editImg(e){
  //   let id = e.detail;
  //   db.collection('pictureList').where({
  //     _id: id
  //   }).get().then(res => {
  //     console.log(res)
  //   })
  // },

  //删除图片
  deleteImg(e){
    wx.showModal({
      title: '确定删除这张图片？',
      success(res) {
        if (res.confirm) {
          let id = e.detail;
          db.collection('pictureList').doc(id).remove({
            success: () => {
              wx.showToast({
                title: '删除成功',
                icon: 'none'
              })
              this.getList()
            }
          })
        } else if (res.cancel) {
          
        }
      }
    })
    
  },
  hideEdit(){
    let note = this.data.note;
    note.map((item) => {
      item.showEdit = false
    })
    this.setData({
      note
    })
  },
  //获取图片列表
  getList(){
    this.setData({
      imagesList: []
    })
    //是否是本人
    if (app.globalData.openid === 'o0oLx0HwxjATxR2i7vyaHhih_1XU' || app.globalData.openid === 'o0oLx0OGVOkgcUNpGD-hK_vcFP78'){
      db.collection('pictureList').get().then(res => {
        //全部添加字段showEdit为false
        res.data.map((item) => {
          item.showEdit = false
        })
        this.setData({
          note: res.data.reverse()
        })
        //只保存图片为一个数组，方便图片预览
        let imagesList = this.data.imagesList;
        for (let i = 0; i < this.data.note.length; i++) {
          imagesList = [
            ...imagesList,
            this.data.note[i].src
          ]
          this.setData({
            imagesList
          })
        }
        wx.hideLoading()
      })
    }else{
      //不是则查询open为true的记录
      db.collection('pictureList').where({
        open: true
      }).get().then(res => {
        //全部添加字段showEdit为false
        res.data.map((item) => {
          item.showEdit = false
        })
        this.setData({
          note: res.data.reverse()
        })
        //只保存图片为一个数组，方便图片预览
        let imagesList = this.data.imagesList;
        for (let i = 0; i < this.data.note.length; i++) {
          imagesList = [
            ...imagesList,
            this.data.note[i].src
          ]
          this.setData({
            imagesList
          })
        }
        wx.hideLoading()
      })
    }
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '正在加载',
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
    this.getList()
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