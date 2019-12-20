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
    console.log(e);
    let title = '';
    const value = e.detail.value;

    value.classOpenyear = parseInt(value.classOpenyear);

    title = value.classOpenyear ? title : '开课学年未填写';
    title = value.classClassroom ? title : '教室未填写';
    title = value.className ? title : '班级名未填写';

    if (title) {
      Util.showToast(title);
      return;
    }

    let {classInfo} = this.data;

    if (value.classClassroom == classInfo.classClassroom &&
      value.className == classInfo.className && 
      value.classOpenyear == classInfo.classOpenyear) {
      return;
    }


    console.log(this.data.classInfo);

    console.log(value);

    wx.showLoading({
      title: '修改中',
      mask: true
    });

    value.classId = classInfo.classId;
    value.courseId = classInfo.courseId;
    value.teacherId = classInfo.teacherId;

    rq({
      path: '/class/updateClass',
      method: 'post',
      data: value
    })
    
    .then(res => {
        this.setData({
          classInfo: res.data
        });
        wx.hideLoading();
        Util.showToast({
          title: '修改成功',
          s: 1
        });
    })
    .catch(Util.requestFail)

    

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      classInfo: globalData.classInfo
    })
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