const
    util = require('../../../utils/util.js'),
    app = getApp();


Page({

  data: {

  },

  back: function (param) {
    wx.navigateBack();
  },
  /* ---------------------
      模态框控制
    -----------------------*/
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },

  hideModal(e) {
    this.setData({
      modalName: null
    })
  },

  formSubmit(e) {
    // 微信登录
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
          url: 'https://www.xuyuyan.cn/user/teacherBinding?teacherName=' + e.detail.value.name + '&teacherPassword='
              + e.detail.value.password + '&teacherAccount=' + e.detail.value.account + '&code=' + wx.getStorageSync("code"),
          // data: {
          //   teacherName: e.detail.value.name,
          //   teacherPassword: e.detail.value.password,
          //   teacherAccount: e.detail.value.account,
          //   code: wx.getStorageSync("code")
          // },
          header: {
            'content-encoding': 'gzip',
            'vary': 'accept-encoding',
            'content-type': 'application/json',
            'charset': 'UTF-8'
          },
          method: "GET",
          success: function (res) {
            var e = this;
            console.log(res);
            if (res.data.status == "success") {
              wx.showToast({
                title: '绑定成功',
                icon: 'succes',
                duration: 100000,
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
              wx.reLaunch({
                url: '/pages/index/index',
              })
            } else {
              wx.showToast({
                title: '绑定失败！请检查输入是否正确，同时请勿重复绑定！',
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
  },



  /* ---------------
      生命周期函数
    -----------------*/
  onShow() {
    wx.cloud.callFunction({
      name: 'getDepartments'
    })
        .then(({
                 result: res
               }) => {
          console.log(res);
          if (res.code === 0) {
            this.setData({
              departments: res.data
            });
          } else {
            util.showToast('系统错误');
          }

        })
        .catch(err => {
          console.error(err);
        })
  }
})
// // pages/binding/binding.js
// Page({
//
//   /**
//    * 页面的初始数据
//    */
//   data: {
//
//   },
//
//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad: function (options) {
//
//   },
//
//   /**
//    * 生命周期函数--监听页面初次渲染完成
//    */
//   onReady: function () {
//
//   },
//
//   /**
//    * 生命周期函数--监听页面显示
//    */
//   onShow: function () {
//
//   },
//
//   /**
//    * 生命周期函数--监听页面隐藏
//    */
//   onHide: function () {
//
//   },
//
//   /**
//    * 生命周期函数--监听页面卸载
//    */
//   onUnload: function () {
//
//   },
//
//   /**
//    * 页面相关事件处理函数--监听用户下拉动作
//    */
//   onPullDownRefresh: function () {
//
//   },
//
//   /**
//    * 页面上拉触底事件的处理函数
//    */
//   onReachBottom: function () {
//
//   },
//
//   /**
//    * 用户点击右上角分享
//    */
//   onShareAppMessage: function () {
//
//   }
// })
