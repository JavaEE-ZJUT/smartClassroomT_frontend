const {
  globalData
} = getApp();


const Util = require('../../../utils/util.js');
const rq = require('../../../utils/rq.js');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: globalData.StatusBar,
    CustomBar: globalData.CustomBar,
    picker: ['A', 'B', 'C', 'D'],
    index: -1,
  },

  PickerChange(evt) {
    console.log(evt);
    this.setData({
      index: evt.detail.value
    })
  },

  // 新建题目
  formSubmit(e) {
    var that = this;
    wx.request({
      url: 'https://www.xuyuyan.cn/problem/addProblem',
      data: {
        problemInfo: e.detail.value.Info,
        problemChoose1: e.detail.value.a,
        problemChoose2: e.detail.value.b,
        problemChoose3: e.detail.value.c,
        problemChoose4: e.detail.value.d,
        problemAns: this.data.index + 1,
        problemExplain: e.detail.value.content
      },
      header: {
        'content-encoding': 'gzip',
        'vary': 'accept-encoding',
        'content-type': 'application/json',
        'charset': 'UTF-8'
      },
      method: "POST",
      success: function (res) {
        var e = this;
        console.log(res);
        if (res.data.status == "success") {
          wx.showToast({
            title: '题目上传成功',
            icon: 'succes',
            duration: 1000,
            mask: true
          })
          wx.reLaunch({
            url: '/pages/index/index',
          })
        } else {
          wx.showToast({
            title: '上传失败！请检查输入是否正确！',
            icon: 'none',
            duration: 1000,
            mask: true
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
