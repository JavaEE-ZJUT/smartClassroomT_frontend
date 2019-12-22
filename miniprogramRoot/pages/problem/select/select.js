const {
  globalData
} = getApp();


const Util = require('../../../utils/util.js');
const rq = require('../../../utils/rq.js');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: globalData.StatusBar,
    CustomBar: globalData.CustomBar,

    paper: [],

    idList: {
      1: 1
    },
    fold: -1,

    ts: [{
        title: '下列动画作品中，那一部是由京都动画公司制作的',
        options: ['幸运星', '灼眼的夏娜']
      }, {
        title: '下列动画作品中，那一部是由京都动画公司制作的画作品中，那一部是由京都动画公司制作的',
        options: ['幸运星', '灼眼的夏娜', 'AngelBeats!', '魔法少女小圆', 
        '幸运星', '灼眼的夏娜']
      },
      {
        title: '下列动画作品中，那一部是由京都动画公司制作的',
        options: ['幸运星', '灼眼的夏娜', 'AngelBeats!', '魔法少女小圆']
      }, {
        title: '下列动画作品中，那一部是由京都动画公司制作的',
        options: ['幸运星', '灼眼的夏娜', 'AngelBeats!', '魔法少女小圆']
      }

    ]
  },


  select(evt) {
    let idList = this.data.idList;
    let id = evt.currentTarget.dataset.id;
    
    if(idList[id]) {
      idList[id] = 0;
    } else {
      idList[id] = 1;
    }
    
    this.setData({
      idList
    })
  },

  fold(evt) {
    let id = evt.currentTarget.dataset.id;

    if(id == this.data.fold) {
      id = -1;
    }


    this.setData({
      fold: id
    });
  },





  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

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