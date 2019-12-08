const
  app = getApp(),
  util = require('../../../utils/util.js');

let
  dateArray = util.getDate(),

  date = dateArray.join('-');

  ++dateArray[0];

Page({

  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    time: util.getTime().join(':'),
    dateStart: date,
    dateEnd: dateArray.join('-'),
    date: date,
  },

  // 生命周期函数
  onLoad() {
    this.setData({
      userInfo: app.globalData.userInfo
    });
  },

  TimeChange(e) {
    this.setData({
      time: e.detail.value
    })
  },

  DateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },

  formSubmit(e) {

    let title = '';
    const value = e.detail.value;

    value.date = value.date + ' ' + value.time;
    delete value.time;

    // title = new Date() < new Date(value.date) ? title : '时间不正确';
    title = value.content ? title : '会议内容未填写';
    // title = value.supervisor ? title : '督会人员未填写';
    title = value.place ? title : '地点未填写';

    if (title) {
      util.showToast(title);
      return;
    }

    value.dp_id = this.data.userInfo.dp._id;

    console.log(value);
    
    wx.showLoading({
      title: '发布中',
      mask: true
    });

    wx.cloud.callFunction({
        name: 'addMeeting',
        data: value
      })

      .then(({
        result: res
      }) => {
        wx.hideLoading();

        console.log(res);

        if (res.code === 0) {
          util.showToast('发布成功', 'success');
          // 重置表单
          this.setData({
            input: ''
          });
        } else {
          util.showToast('发布失败');
        }
      })

      .catch(err => {
        wx.hideLoading();
        util.showToast('系统错误');
        console.error(err);
      })
  },
})