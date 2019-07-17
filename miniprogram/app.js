//app.js
App({
  onLaunch: function () {
    let env = false;
    
    let environment = env ? 'release-82807b' : 'marco-4ce7ef';
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: environment,
        traceUser: true,
      })
    }

    this.globalData = {}
  }
})
