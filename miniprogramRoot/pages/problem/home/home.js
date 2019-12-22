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

  methods: {

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

  }
})