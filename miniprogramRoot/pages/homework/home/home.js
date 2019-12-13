const
  app = getApp(),
  util = require('../../../utils/util.js');

Component({
  options: {
    addGlobalClass: true,
  },

  data: {
    loading: 0,
    test: [
      {
        title: '第一次作业',
        'class': '一年级二班',
        total: 10,
        subs: 9,
        rrate: 0.7
      }, {
        title: '第二次作业',
        'class': '二年级二班',
        total: 20,
        subs: 9,
        rrate: 0.5
      }, {
        title: '第三次作业',
        'class': '三年级二班',
        total: 30,
        subs: 23,
        rrate: 0.83
      }, {
        title: '第三次作业',
        'class': '三年级二班',
        total: 30,
        subs: 23,
        rrate: 0.83
      }, {
        title: '第三次作业',
        'class': '三年级二班',
        total: 30,
        subs: 23,
        rrate: 0.83
      }, {
        title: '第三次作业',
        'class': '三年级二班',
        total: 30,
        subs: 23,
        rrate: 0.83
      }, {
        title: '第三次作业',
        'class': '三年级二班',
        total: 30,
        subs: 23,
        rrate: 0.83
      }
    ]
  },

  methods: {

  },


  lifetimes: {

    attached() {
      this.data.userInfo = app.globalData.userInfo;
    }
  }

})