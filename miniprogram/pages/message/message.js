// pages/message/message.js
const app = getApp()
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showMessage: false,
    message: '',
    messageContent: '',
    messageList: [],
    userInfo: {}
  },
  messageHandler(){ //点击留言按钮，唤起留言框
    this.setData({
      showMessage: true
    })
  },

  //留言确定按钮
  formSubmit(e){
    this.setData({  //获取用户留言内容，留言框内容设置空
      messageContent: e.detail.value.textarea,
      message: ''
    })
    wx.showLoading()
    const uid = app.globalData.openid;  //获取用户openid
    db.collection('userInfo').where({  //通过用户openid筛选出用户信息
      _openid: uid
    }).get().then(res => {
      this.setData({   //成功后获取用户信息
        userInfo: res.data[0]
      })
    }).then(() => {
      this.setData({   //成功后隐藏留言框
        showMessage: false
      })
      let userMessageInfo = {   //需要存入后台信息
        content: this.data.messageContent,
        avatar: this.data.userInfo.avatarUrl,
        nikeName: this.data.userInfo.nickName,
        time: db.serverDate()
      }
      // this.setData({
      //   messageList: [userMessageInfo, ...this.data.messageList]
      // })
      db.collection('messageList').add({  //把数据存入后台
        data: userMessageInfo
      }).then(() => {
        this.getMessageList()
        wx.hideLoading()
      })
      .catch((err) => {
        console.log(err)
        wx.hideLoading()
        wx.showToast({
          title: '存入数据失败',
          icon: 'none'
        })
      })
    })
  },
  //获取列表信息
  getMessageList(){
    db.collection('messageList').get().then(res => {
      const { data } = res;
      let messageList = data.map((item, index) => {   //格式化日期
        let time = item.time;
        let year = time.getFullYear();
        let month = time.getMonth();
        let day = time.getDate();
        let hours = time.getHours();
        let minutes = time.getMinutes();
        let seconds = time.getSeconds();
        month = month < 10 ? '0' + month : month
        day = day < 10 ? '0' + day : day
        hours = hours < 10 ? '0' + hours : hours
        minutes = minutes < 10 ? '0' + minutes : minutes
        seconds = seconds < 10 ? '0' + seconds : seconds
        let formatTime = year + '/' + month + '/' + day + ' ' + hours + ':' + minutes + ':' + seconds;
        data[index].time = formatTime
      })
      this.setData({
        messageList: data.reverse()
      })
      wx.hideLoading()
    }).catch(err => {
      wx.hideLoading()
      wx.showToast({
        title: '获取留言信息失败',
        icon: 'none'
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading()
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
    this.getMessageList()
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