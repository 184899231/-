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
    const that = this;
    let index = e.detail;
    wx.previewImage({
      current: that.data.imagesList[index], // 当前显示图片的http链接
      urls: that.data.imagesList // 需要预览的图片http链接列表
    })
  },
  //长按显示编辑
  showEditEvent(e){
    //如果是管理员才能编辑
    if(this.data.userInfo.admin){
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
    const that = this;
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
              //删除后重新获取图片列表
              that.getList()
            },
            fail: (err) => {
              console.log(err)
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
  recommendImg(e){
    wx.showLoading();
    //设置成首页推荐
    db.collection('pictureList').doc(e.detail).update({
      data: {
        home_recommend: true
      }
    }).then(() => {
      wx.hideLoading();
      this.hideEdit();
      wx.showToast({
        title: '推荐成功',
        icon: 'none'
      })
    })
  },
  //获取图片列表
  getList(){
    this.setData({
      imagesList: []
    })
    db.collection('userInfo').get().then(user => {
      //调用云函数获取图片列表
      wx.cloud.callFunction({
        name: 'get_picture_info'
      }).then(res => {
        //这里获取的是所有图片
        this.setData({
          userInfo: user.data[0],
          note: res.result.data.reverse()
        }, () => {
          //只保存图片为一个数组，提供图片预览
          let imagesList = this.data.imagesList;
          for (let i = 0; i < this.data.note.length; i++) {
            imagesList = [
              ...imagesList,
              this.data.note[i].src
            ]
          }
          this.setData({
            imagesList
          })
        });
        wx.hideLoading();
      }).catch(err => {
        wx.showToast({
          title: '获取图片的云函数出错',
          icon: 'none'
        })
        wx.hideLoading();
      })
      
    })
    
    
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    wx.showLoading({
      title: '正在加载',
    })
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