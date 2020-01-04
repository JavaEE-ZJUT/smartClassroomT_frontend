// pages/homework/addPaper/addPaper.js
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
    papers: []
  },

  lifetimes: {

    attached() {
      var that = this;
      wx.request({
        url: 'https://www.xuyuyan.cn/paper/getAllPaperInfo',
        header: {
          'content-encoding': 'gzip',
          'vary': 'accept-encoding',
          'content-type': 'application/json',
          'charset': 'UTF-8'
        },
        method: "GET",
        success: function (res) {
          console.log(res);
          if (res.data.status === "success") {
            // 读取paper信息
            that.setData({
              papers: res.data.data
            })
          }
        },
        fail: function (err) { },//请求失败
        complete: function () { }//请求完成后执行的函数
      })

    }

  },

  methods: {
    back: function (param) {
      wx.reLaunch({
        url: '/pages/index/index',
      })
    },

    gotoPaper1: function (param) {
      console.log(param);
      console.log(param.currentTarget.dataset.paperid);
      wx.redirectTo({
        url: "/pages/homework/paper_problem_detail/paper_problem_detail?paperId=" + param.currentTarget.dataset.paperid
          + "&paperName=" + param.currentTarget.dataset.papername
      })
    },

    add:function(e) {
      console.log("触发添加练习操作")
      console.log(e)
      console.log(e.currentTarget.dataset.id);
      wx.request({
        url: 'https://www.xuyuyan.cn/course/addPaperToCourseByCourceId?courseId=' + wx.getStorageSync("courseId") + '&paperId=' + e.currentTarget.dataset.id + '&teacherId='+ wx.getStorageSync("teacherId"),
        header: {
          'content-encoding': 'gzip',
          'vary': 'accept-encoding',
          'content-type': 'application/json',
          'charset': 'UTF-8'
        },
        method: "GET",
        success: function (res) {
          console.log(res);
          if (res.data.status === "success") {
            // 读取paper信息
            wx.showToast({
              title: '添加成功！',
            })
            wx.reLaunch({
              url: '/pages/index/index',
            })
          }
        },
        fail: function (err) { },//请求失败
        complete: function () { }//请求完成后执行的函数
      })
    }
  },

  // pageLifetimes: {
  //   show() {
  //     this.getData();
  //   }
  // }

})
