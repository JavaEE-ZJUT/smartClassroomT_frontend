// pages/homework/paper_problem_detail/paper_problem_detail.js
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
    paper: null,
    paperName: null
  },

  

  /**
   * 生命周期函数--监听页面加载
   */
  fold(evt) {
    let id = evt.currentTarget.dataset.id;
    if (id == this.data.fold) {
      id = -1;
    }
    this.setData({
      fold: id
    });
  },

  back: function (param) {
    console.log("back");
    var pages = getCurrentPages(); //当前页面
    console.log(pages);
    var beforePage = '/' + pages[pages.length - 1].__displayReporter.showReferpagepath; //前一页
    console.log(beforePage);
    var page = beforePage.match(/(\S*).html/)[1];
    console.log(page)
    wx.redirectTo({
      url: page,
    })
  },

  onLoad: function (options) {
    console.log(options);
    this.setData({
      paperName: options.paperName
    })
    // 查询练习信息
    var that = this;
    wx.request({
      url: 'https://www.xuyuyan.cn/problem/getProblemSetStudentAnsweringDetailByProblemSetId?problemSetId=1',
      header: {
        'content-encoding': 'gzip',
        'vary': 'accept-encoding',
        'content-type': 'application/json',
        'charset': 'UTF-8'
      },
      method: "GET",
      success: function (res) {
        console.log(res);
        if (res.data.status === "success") {
          // 读取课程信息
          that.setData({
            paper: res.data.data
            // courseName: res.data.data.courseName,
            // courseDetail: res.data.data.courseDetail,
            // courseCredit: res.data.data.courseCredit,
            // coursePicUrl: res.data.data.coursePicUrl,
            // courseMethod: res.data.data.courseMethod
          })
        }
      },
      fail: function (err) { },//请求失败
      complete: function () { }//请求完成后执行的函数
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
