const app = getApp();

Page({
  data: {
    PageCur: 'homeWork',
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    showed: {
    }
  },

  // tabbar改变页面
  changeCur: (function() {

    let duration = 70;
    let tabAnim = wx.createAnimation({
      duration,
      timingFunction: 'linear',
    })

    return function(event) {

      let
        cur = event.currentTarget.dataset.cur,
        pageCur = this.data.PageCur;

      if (pageCur !== cur) {

        tabAnim.scale(0.5).step();
        tabAnim.scale().step();

        let
          showed = this.data.showed,

          data = {
            PageCur: cur,
            tabAnim: tabAnim.export()
          };

        this.setData(data);

      }

    }
  })(),


  onLoad() {
    // 微信登录，获取code
    wx.login({
      success: function (res) {
        if (res.code) {
          console.log(res)
          // 获取到js_code
          var code = res.code;
          wx.setStorageSync("code", code);
        }

        // 服务器登录
        var that = this;
        wx.request({
          url: 'https://www.xuyuyan.cn/user/teacherLogin?code=' + wx.getStorageSync("code"),
          header: {
            'content-encoding': 'gzip',
            'vary': 'accept-encoding',
            'content-type': 'application/json',
            'charset': 'UTF-8'
          },
          method: "GET",
          success: function (res) {
            const e = this;
            console.log(res);
            if (res.data.status === "success" && res.data.data != null) {
              wx.showToast({
                title: '登录成功',
                icon: 'succes',
                duration: 1000,
                mask: true
              })
              // 读取教师信息
              wx.setStorageSync("code", res.data.data.code);
              wx.setStorageSync("openid", res.data.data.openid);
              wx.setStorageSync("teacherAccount", res.data.data.teacherAccount);
              wx.setStorageSync("teacherId", res.data.data.teacherId);
              wx.setStorageSync("teacherName", res.data.data.teacherName);
              wx.setStorageSync("teacherPassword", res.data.data.teacherPassword);
              wx.setStorageSync("teacherPhone", res.data.data.teacherPhone);
              wx.setStorageSync("teacherSex", res.data.data.teacherSex);
            } else {
              wx.showToast({
                title: '登录失败！请先绑定工号！',
                icon: 'none',
                duration: 1000,
                mask: true
              })
            }
          },
          fail: function (err) { },//请求失败
          complete: function () { }//请求完成后执行的函数
        })
      }
    })
  }
})
