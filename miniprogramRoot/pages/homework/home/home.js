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
    loading: 0,
    paper: [
    ]
  },

  methods: {

  },


  lifetimes: {

    attached() {
      rq({
        path: '/paper/getAllPaperInfo'
      })
      .then(res => {
        if (res.status == 'success') {
          this.setData({
            paper: res.data
          })
        }
      })
        .catch(Util.requestFail);
    }
  }

})