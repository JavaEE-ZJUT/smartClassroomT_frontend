const {
  globalData
} = getApp();

const Util = require('../../../utils/util.js');
const rq = require('../../../utils/rq.js');

Component({
  options: {
    addGlobalClass: true,
  },

  data: {
    paper: [],

    fold: -1,

    ts: []
  },

  




  lifetimes: {

    attached() {
      rq({
          path: '/problem/getAllProblems',
        })
        .then(res => {
          if (res.status == 'success') {

            this.setData({
              paper: res.data
            })
            wx.setStorageSync("problems", res.data)
          }
          console.log(res);
        })
        .catch(Util.requestFail);
    }

  },

  methods: {
    fold(evt) {
      let id = evt.currentTarget.dataset.id;

      if (id == this.data.fold) {
        id = -1;
      }


      this.setData({
        fold: id
      });
    },

    handleLongPress: function (e) {
      console.log("触发了长按事件")
      console.log(e);
      var id = e.currentTarget.dataset.id;
      console.log()
      wx.redirectTo({
        url: '/pages/problem/update/update?id=' + id,
      })
    }

  }
})