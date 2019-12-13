const app = getApp();
var util = require('../../../utils/util.js');


Component({

  options: {
    addGlobalClass: true,
  },


  data: {
    CustomBar: app.globalData.CustomBar,
    loading: 0,
    classes: [
      {
        name: '英语角',
        number: '20191234568'
      }, {
        name: '数学课',
        number: '20191789685'
      }, {
        name: '科学课',
        number: '20191123789'
      }
    ]
  },


  methods: {


  lifetimes: {

    attached() {


    }
  }

  

  }
})