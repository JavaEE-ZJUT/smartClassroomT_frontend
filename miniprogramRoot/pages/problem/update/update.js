// pages/problem/update/update.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    problem:null,
    radioValue:null
  },
  
  radiochange:function(e) {
    console.log(e);
    console.log(e.detail.value)
    wx.setStorageSync("problemAns", e.detail.value)
  },

  updateProblem:function(e) {
    console.log("触发修改")
    var problemInfo = e.detail.value.problemInfo;
    console.log(problemInfo);
    var problemChoose1 = e.detail.value.problemChoose1;
    console.log(problemChoose1);
    var problemChoose2 = e.detail.value.problemChoose2;
    console.log(problemChoose2);
    var problemChoose3 = e.detail.value.problemChoose3;
    console.log(problemChoose3);
    var problemChoose4 = e.detail.value.problemChoose4;
    console.log(problemChoose4);
    var problemExplain = e.detail.value.problemExplain;
    console.log(problemExplain);
    var that = this;
    wx.request({
      url: 'https://www.xuyuyan.cn/problem/updateProblemById',
      header: {
        'content-encoding': 'gzip',
        'vary': 'accept-encoding',
        'content-type': 'application/json',
        'charset': 'UTF-8'
      },
      data: {
        problemId: wx.getStorageSync("problemId"),
        problemInfo: problemInfo,
        problemChoose1: problemChoose1,
        problemChoose2: problemChoose2,
        problemChoose3: problemChoose3,
        problemChoose4: problemChoose4,
        problemExplain: problemExplain,
        problemAns: wx.getStorageSync("problemAns")
      },
      method: "POST",
      success: function (res) {
        console.log(res);
        if (res.data.status === "success") {
          wx.showToast({
            title: '修改成功！',
          })
          wx.reLaunch({
            url: '/pages/index/index',
          })
        }
      },
      fail: function (err) { },//请求失败
      complete: function () { }//请求完成后执行的函数
    })
  },

  back: function (param) {
    wx.reLaunch({
      url: "/pages/index/index",
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var problems = wx.getStorageSync("problems");
    console.log(problems);

    var t = typeof problems;
    if (t == 'string') {
      return problems.length;
    } else if (t == 'object') {
      n = 0;
      for (var i in problems) {
        n++;
      }
    }

    console.log(n)
    for (var i = 0; i < n; i ++) {
      console.log(problems[i].problemId);
      console.log(options.id)
      wx.setStorageSync("problemId", options.id)
      if (problems[i].problemId == options.id) {
        console.log(problems[i]);
        this.setData({
          problem: problems[i]
        })
      }
    }
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