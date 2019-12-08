const
  util = require('../../../utils/util.js'),
  app = getApp();

Page({

  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    // meeting: app.globalData.historyMeeting,
    // loading: 1,
  },



  /* ------------------
      选择图片
    -------------------- */

  chooseImg() {

    let 
        dpName = this.data.userInfo.dp.dpName,
        meeting = this.data.meeting;



    wx.chooseImage({


      count: 9 - meeting.picList.length,
      success: function(res) {
        console.log('图片选择成功');
        console.log(res);


        wx.showLoading({
          title: '上传中',
          mask: true
        });


        let promises = [];

        res.tempFilePaths.forEach(function(item) {
          let type = item.split('.').pop();

          promises.push(wx.cloud.uploadFile({
            cloudPath: `meetingPic/${dpName}/${util.getDate().join('/')}/${new Date().getTime()}.${type}`,
            filePath: item
          }))

        })

        Promise.all(promises)

          .then(res => {
            let fileID = [];
            res.forEach(function(item) {
              fileID.push(item.fileID);
            });

            return wx.cloud.callFunction({
              name: 'addPicList',
              data: {
                fileID,
                mt_id: meeting._id
              }
            })
          
          })

          .then(res => {
            this.refreshMeeting();
            wx.hideLoading();
            util.showToast('上传完成', 'success');
          })


          .catch(err => {
            console.log(err);
            wx.hideLoading();
            util.showToast('上传失败');
          })

      }.bind(this),
    });

  },



  /* ----------------------
      预览图片
    ----------------------- */
preview(e) {

  let urls = this.data.meeting.picList;

  if(urls.length === 0) {
    util.showToast('没有图片');
  } else {

    wx.previewImage({
      urls 
    })
  }
},



/* ---------------------
    切换底部选择栏
  ---------------------- */

  toggleBottom(e) {
    let 
        selectAnim = null,
        bottomAnim = null;

    if(this.data.bottom) {
      selectAnim = this.Anim.rotate().step().export();
    } else {
      selectAnim = this.Anim.rotate(45).step().export();
    }



    this.setData({
      selectAnim,
      bottom: !this.data.bottom
    })
  },


/* ---------------------
    刷新会议信息
  ---------------------- */
refreshMeeting() {
  wx.cloud.callFunction({
    name: 'getMeeting',
    data: {
      mt_id: this.data.meeting._id
    }
  })

  .then(({result: res}) => {
    console.log(res);

    if(res.code === 0){
      let meeting = res.data;

      meeting.date = util.getDate(meeting.date).join('-') +
        ' ' + util.getWeek(meeting.date) + ' ' +
        util.getTime(meeting.date).join(':');

      this.setData({
        meeting
      })

    } else {
      util.showToast('系统错误');
    }
  })

  .catch(err => {
    console.error(err);
    util.showToast('网络请求失败');
  })
},


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

    this.data.userInfo = app.globalData.userInfo;

    this.Anim = wx.createAnimation({
      duration: 100,
      timingFunction: 'linear'
    })

    let {...meeting} = app.globalData.historyMeeting;

    meeting.date = util.getDate(meeting.date).join('-') +
      ' ' + util.getWeek(meeting.date) + ' ' +
      util.getTime(meeting.date).join(':');
    
    this.setData({
      meeting
    });

    console.log(this.data.meeting);
  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.refreshMeeting();
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