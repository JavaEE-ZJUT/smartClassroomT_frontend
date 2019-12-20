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
    CustomBar: globalData.CustomBar,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.classInfo = globalData.classInfo;
    let { classInfo } = globalData;
    rq({
      path: '/course/getPPTsByCourseId',
      query: {
        courseId: classInfo.courseId
      }
    })
    .then(res => {
      if (res.status == 'success') {
        this.setData({
          pptInfo: res.data
        })
      }
    })
    .catch(Util.requestFail)
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