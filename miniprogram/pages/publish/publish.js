// pages/publish/publish.js
const app = getApp();
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgList: [],
    items: [
      { name: 'open', value: '公开', checked: 'true' },
      { name: 'privacy', value: '仅自己可见' },
    ],
    open: true,
    array: ['请选择分类', '合照', '自拍', '婚纱照', '宝贝照'],
    classIndex: 0
  },
  bindPickerChange: function(e) {
    this.setData({
      classIndex: e.detail.value
    })
  },
  radioChange(e) {
    let value = e.detail.value;
    if (value === 'open'){
      this.setData({
        open: true
      })
    } else if (value === 'privacy'){
      this.setData({
        open: false
      })
    }
  },
  //提交表单信息
  formSubmit(e){
    console.log(e.detail.value)
    let val = e.detail.value;
    if (!val.classify && val.classify !== 0){
      return wx.showToast({
        icon: 'none',
        title: '请选择分类',
      })
    }
    if (!this.data.imgList.length){
      return wx.showToast({
        icon: 'none',
        title: '请上传图片',
      })
    }
    let obj = {
      type: this.data.array[val.classify],
      city: val.city
    }
    wx.showLoading({
      title: '正在上传',
    })
    let that = this;
    const db = wx.cloud.database();
    let date = new Date().getTime();
    wx.cloud.uploadFile({
      cloudPath: this.data.array[Number(val.classify)] + '/' + date + that.data.imgList[0].match(/\.[^.]+?$/)[0],  //上传云路径
      filePath: that.data.imgList[0],  //图片路径
      success: res => {
        let fileID = res.fileID  //成功后返回的云图片路径
        let data = {
          src: fileID,
          time: db.serverDate(),
          open: that.data.open,
          praise: 0,
          home_recommend: false,
          ...obj
        }
        db.collection('pictureList').add({   //存入数据库pictureList
          data: data, 
        }).then(() => {
          wx.hideLoading()
          that.setData({  //成功后清空imgList
            imgList: []
          })
          wx.showToast({
            title: '保存成功',
            duration: 2000,
            icon: 'none'
          })
          })
          .catch((err) => {
            wx.hideLoading()
            wx.showToast({
              title: '上传失败，请重新上传',
              duration: 2000,
              icon: 'none'
            })
        })
      },
    })
  },
  //选择图片
  chooseImage() {
    let that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        that.setData({
          imgList: res.tempFilePaths
        })
      },
    })
  },
  //预览图片
  previewImage(){
    wx.previewImage({
      current: this.data.imgList[0], // 当前显示图片的http链接
      urls: this.data.imgList // 需要预览的图片http链接列表
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu()
    db.collection('userInfo').where({
      _openid: app.globalData.openid
    }).get().then(res => {
      const { admin } = res.data[0];
      if(admin){
        this.setData({
          showMain: true
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
  onShareAppMessage: function () {

  }
})