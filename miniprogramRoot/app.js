const
  util = require('./utils/util.js');



App({

  /* -------------------------
      生命周期函数
    -------------------------- */
  onLaunch: function() {

    // wx.cloud.init();


    // 获取缓存信息
    // wx.getStorageInfo({
    //   success(res) {
    //     console.log(res.keys)
    //     console.log(res.currentSize)
    //     console.log(res.limitSize)
    //   }
    // })


    /* ---------------------
        登录
       --------------------- */

    // let userInfo = wx.getStorageSync('userInfo');

    // console.log('----------- userInfo app.js -----------------');
    // console.log(userInfo);

    // if(userInfo) {
    //   this.globalData.userInfo = userInfo;

    //   // 更新用户信息
    //   wx.cloud.callFunction({
    //     name: 'login'
    //   })

    //   .then(({result: res}) => {
    //     wx.setStorage({
    //       key: 'userInfo',
    //       data: res.data
    //     })
    //   })

    //   .catch(err => {
    //     console.error(err);
    //   })

    // } else {

    //   wx.reLaunch({
    //     url: 'pages/register/register',
    //   });

    // }


    /* ---------------------
        获取用户信息
       --------------------- */
    // 展示本地存储能力
    let logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);



    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    });


    /* ---------------------
        获取系统信息
      ----------------------- */
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
      }

    });
  },



  /* -----------------------
        全局数据
    ------------------------ */
  globalData: {

  }
})