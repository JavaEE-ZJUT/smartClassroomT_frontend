const 
    app = getApp(),
    Util = require('../../../utils/util.js');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    currentIndex: -1
  },


  /* -------------------
      事件函数
    -------------------- */

  toggleForm(e) {
    let
      currentIndex = -1, 
      index = e.currentTarget.dataset.index;

    if(index !== this.data.currentIndex) {
      currentIndex = index;
    }

    this.setData({
      currentIndex
    })

  },

  fromSubmit(e) {
    wx.showLoading({
      title: '提交中',
      mask: true
    });

    let 
      spName = e.detail.value.supervisor,
      mtId = this.data.meetingList[e.currentTarget.dataset.index]._id;

    this.addSupervisor(mtId, spName)

    .then(({result : res}) => {
      if(res.code === 0) {
        wx.hideLoading();
        this.getSupervisorList();
        wx.showToast({
          title: '成功',
          icon: 'success'
        })
      } else {
        wx.hideLoading();
        console.log(res);
        wx.showToast({
          title: '添加失败',
          icon: 'none'
        })
      }
    })

    .catch(Util.requestFail)
  },


  /* ----------------
      公共函数
    ----------------- */

  // 获取要添加督会的会议列表
  getSupervisorList() {
    wx.cloud.callFunction({
      name: 'supervisorList'
    })

      .then(({ result: res }) => {
        if(res.code === 0) {
          
          let meetingList = res.data;

          meetingList.forEach(function(item, index) {
            let date = new Date(item.date);

            item.dateString = Util.getDate(date).join('-') + ' ' 
              + Util.getWeek(date) + ' ' + Util.getTime(date).join(':');
          })


          this.setData({
            meetingList
          });



        } else {
          wx.showToast({
            title: '获取失败',
          });
        }
      })

      .catch(Util.requestFail)
  },


  // 添加督会
  addSupervisor(meetingId, supervisorName) {
    return wx.cloud.callFunction({
      name: 'addSupervisor',
      data: {
        mtId: meetingId,
        spName: supervisorName
      }
    })
  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSupervisorList();
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