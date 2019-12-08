const
  app = getApp(),
  util = require('../../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  textareaAInput(e) {
    this.setData({
      textareaAValue: e.detail.value
    })
  },

  formsubmit(e) {


    if (!e.detail.value.message) {
      return;
    }

    wx.showLoading({
      title: '提交中',
    });

    wx.cloud.callFunction({
        name: 'feedback',
        data: {
          message: e.detail.value.message
        }
      })

      .then(({
        result: res
      }) => {
        wx.hideLoading();
        if (res.code == 0) {
          util.showToast('提交成功', 'success');
          this.setData({
            input: ''
          });
        } else {
          util.showToast('提交失败');
        }
      })

      .catch(err => {
        wx.hideLoading();
        util.showToast('系统错误')
      })


  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})