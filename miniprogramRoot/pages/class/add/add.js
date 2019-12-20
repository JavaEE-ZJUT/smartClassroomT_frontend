const { globalData } = getApp();

const Util = require('../../../utils/util.js');
const rq = require('../../../utils/rq.js');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    CustomBar: globalData.CustomBar,
  },


  formSubmit(e) {

    let title = '';
    const value = e.detail.value;

    value.classOpenyear = parseInt(value.classOpenyear);

    title = value.classOpenyear ? title : '开课学年未填写';
    title = value.classClassroom ? title : '教室未填写';
    title = value.className ? title : '班级名未填写';

    if (title) {
      Util.showToast({
        title
      });
      return;
    }

    console.log(value);

    wx.showLoading({
      title: '修改中',
      mask: true
    });

    value.teacherId = 1;

    rq({
      path: '/class/addClass',
      method: 'post',
      data: value
    })

      .then(res => {
        wx.hideLoading();
        if (res.status == 'success') {
          this.setData({
            input: ''
          });
          Util.showToast({
            title: '添加成功',
            s: 1
          });
        } else {
          console.log(res);
          Util.showToast({
            title: '添加失败',
            s: 0
          });
        }
      })
      .catch(Util.requestFail)

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