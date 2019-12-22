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
    CustomBar: globalData.CustomBar,
    loading: 0,
    classes: []
  },

  lifetimes: {

    attached() {

      this.getData();

    }

  },

  methods: {

    getData() {
      
      rq({
        path: '/class/getClassesByTeahcerid',
        query: {
          teacherId: 1
        }
      })

        .then(res => {
          if (res.status == 'success') {


            for (let i = 0; i < 10; i++) {
              res.data.push(res.data[0]);
            }



            this.setData({
              classes: res.data
            });
          }

        })

        .catch(Util.requestFail)
    },

    tapClass(evt) {

      let { dataset } = evt.currentTarget;

      globalData.classInfo = dataset.info;

      wx.navigateTo({
        url: dataset.url
      })

    }
  },

  pageLifetimes: {
    show() {
      this.getData();
    }
  }

})