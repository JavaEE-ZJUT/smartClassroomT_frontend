const { globalData } = getApp();

const Util = require('../../../utils/util.js');
const rq = require('../../../utils/rq.js');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    CustomBar: globalData.CustomBar,
    problems:[]
  },

  checkboxChange:function(e) {
    console.log(e.detail.value)
    wx.setStorageSync("proList", e.detail.value)
  },

  formSubmit(e) {
    wx.request({
      url: 'https://www.xuyuyan.cn/paperProblem/createNewPaper?paperName=' + e.detail.value.paperName + '&problemList=' + wx.getStorageSync("proList"),
      // data: {
      //   paperName: e.detail.value.paperName, 
      //   problemList: wx.getStorageSync("proList")
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
            title: '创建成功',
            icon: 'succes',
            duration: 1000,
            mask: true
          })
          wx.redirectTo({
            url: '/pages/index/index',
          })
        }
      },
      fail: function (err) { },//请求失败
      complete: function () { }//请求完成后执行的函数
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
    rq({
      path: '/problem/getAllProblems',
    })
    .then(res => {
      if (res.status == 'success') {

        this.setData({
          problems: res.data
        })
      }
      console.log(res);
    })
    .catch(Util.requestFail);
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