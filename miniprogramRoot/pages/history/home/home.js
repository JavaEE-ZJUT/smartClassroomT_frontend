const app = getApp();
var util = require('../../../utils/util.js');


Component({
  options: {
    addGlobalClass: true,
  },


  data: {
    CustomBar: app.globalData.CustomBar,

    timeList: {
      list: [],
      months: [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
    },

    loading: 0
  },

  methods: {

    // 查看会议
    showMeeting(e) {
      app.globalData.historyMeeting = this.data.meetingList[e.currentTarget.dataset.index];

      wx.navigateTo({
        url: '/pages/history/meeting/meeting'
      });
    },




    selectMonth(e) {

      let date = e.currentTarget.dataset.date;

      if (this.data.date !== date) {
        let dateShow = date.substr(0, 4) + '年' + date.substr(5, 2) + '月';


        this.setData({
          date,
          dateShow,
          loading: 1
        });

        this.getHistory();

      }


    },


    addYear(e) {
      let list = this.data.timeList.list;


      if (list[list.length - 1].year > 2019) {

        list.push({
          year: list[list.length - 1].year - 1,
          months: this.data.timeList.months
        })

        this.setData({
          "timeList.list": list
        });

        console.log('addYear');


      }

    },



    getHistory() {

      wx.cloud.callFunction({
          name: 'historyMeeting',
          data: {
            dp_id: this.data.userInfo.dp._id,
            date: this.data.date
          }
        })

        .then(({
          result: res
        }) => {

          console.log(res);

          if (res.code === 0) {

            let meetingList = res.data ? res.data : [];

            meetingList.forEach(function(item) {
              let date = new Date(item.date);

              item.day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();

              item.time = util.getTime(date).join(':');
            });

            this.setData({
              meetingList
            });

          } else {

            util.showToast('系统错误');

          }

          this.setData({
            loading: 0
          });

        })

        .catch(err => {
          console.log(err);
        })

    }
  },

  lifetimes: {
    attached() {
      
      this.data.userInfo = app.globalData.userInfo;

      //  初始化
      let date = util.getDate();

      this.setData({
        "timeList.list[0]": {
          year: date[0],
          months: this.data.timeList.months.slice(12 - date[1], 12)
        },
        dateShow: date[0] + '年' + date[1] + '月',
        date: date[0] + '-' + date[1]
      })

      this.getHistory();

    }
  }
})