const
  app = getApp(),
  util = require('../../../utils/util.js');

Component({
  options: {
    addGlobalClass: true,
  },

  data: {
    loading: 1,
    modal: false
  },

  methods: {

    getMeeting() {

      this.setData({
        loading: true
      });

      wx.cloud.callFunction({
          name: 'nextMeeting',
          data: {
            dp_id: this.data.userInfo.dp._id
          }
        })

        .then(({
          result: res
        }) => {

          if (res.code === 0) {

            let meeting = res.data;

            if (meeting) {
              // 添加会议信息

              let date = util.getDate(meeting.date);

              date.shift();

              meeting.date = date.join('/') +
                ' ' + util.getWeek(meeting.date) + ' ' +
                util.getTime(meeting.date).join(':');

              this.setData({
                meeting,
                noMeeting: false,
                loading: false
              });
            } else {
              // 显示没有会议的界面
              this.setData({
                noMeeting: true,
                loading: false
              });
            }


          } else {
            util.showToast('获取会议失败');
          }

        })

        .catch(err => {
          util.showToast('系统错误');
        })
    },



/* ---------------------
    切换模态框
  ----------------------  */
    toggleModal(e) {
      this.setData({
        modal: !this.data.modal
      });
    },


/* -----------------
      删除会议
   -----------------  */
    removeMeeting() {

      wx.showLoading({
        title: '删除中',
        mask: true
      })

      wx.cloud.callFunction({
          name: 'removeMeeting',
          data: {
            _id: this.data.meeting._id
          }
        })

        .then(({
          result: res
        }) => {
          wx.hideLoading();
          if (res.code === 0) {
            util.showToast('删除成功', 'success');
          } else {
            util.showToast('删除失败');
          }
        })

        .catch(err => {

          console.error(err);
          wx.hideLoading();
          util.showToast('系统错误');
        })

        .finally(function() {
          this.toggleRemove();
          this.getMeeting();
        }.bind(this));

    }


  },


  lifetimes: {

    attached() {
      this.data.userInfo = app.globalData.userInfo;
      this.getMeeting();
    }
  }

})