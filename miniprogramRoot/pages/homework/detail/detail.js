// pages/homework/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseName: null,
    courseDetail: null,
    courseCredit: null,
    coursePicUrl: null,
    courseMethod: null,
    ppts: [],
    url: null,
    papers: null,
    tabNav:["课程详情", "课程资料", "练习"],
    index:0,
    TabCur:0
  },

  tabSelect(e) {
    console.log(e);
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },

  //上传////////////////////////////////////
  uploadPic: function () {
    wx.chooseImage({
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        //启动上传等待中...
        wx.showLoading({
          title: '正在上传...',
        })
        wx.uploadFile({
          url: 'https://www.xuyuyan.cn/upload/uploadFile',
          filePath: tempFilePaths[0],
          name: "upfile",
          header: {
            'content-encoding': 'gzip',
            'content-type': 'multipart/form-data',
            'charset': 'UTF-8',
            'vary': 'accept-encoding'
          },
          formData: {
          },
          success: function (res) {
            setTimeout(function () {
              wx.hideLoading()
            }, 2000)
            if (res.statusCode == 200) {
              wx.showToast({
                title: '上传成功',
                icon: 'success',
                duration: 2000
              })
              var obj = JSON.parse(res.data);
              wx.setStorageSync("pptUrl", obj.url);
              console.log(wx.getStorageSync("pptUrl"))
            } else {
              wx.showToast({
                title: '上传失败',
                icon: 'none',
                duration: 2000
              })
            }
          }
        });
      }
    })
  },



  updateCourse:function(e) {
    console.log("触发更新课程");
    console.log(e)
    var courseName = e.detail.value.courseName;
    console.log(courseName);
    var courseDetail = e.detail.value.courseDetail;
    console.log(courseDetail);
    var courseCredit = e.detail.value.courseCredit;
    console.log(courseCredit);

    wx.request({
      url: 'https://www.xuyuyan.cn/course/updateCourse',
      data: {
        courseName: courseName,
        courseDetail: courseDetail,
        courseCredit: courseCredit,
        courseId: wx.getStorageSync("course").courseId
      },
      header: {
        'content-encoding': 'gzip',
        'vary': 'accept-encoding',
        'content-type': 'application/json',
        'charset': 'UTF-8'
      },
      method: "POST",
      success: function (res) {
        var e = this;
        console.log(res);
        if (res.data.status == "success") {
          wx.showToast({
            title: '修改成功',
            icon: 'succes',
            duration: 1000,
            mask: true
          })
        }
      },
      fail: function (err) { },//请求失败
      complete: function () { }//请求完成后执行的函数
    })
  },

  addPPT:function(e) {
    console.log("触发添加ppt");
    var pptName = e.detail.value.pptName;
    console.log(pptName);
    var that = this;
    wx.request({
      url: 'https://www.xuyuyan.cn/course/addPPT_ToCourse',
      data: {
        courseId: wx.getStorageSync("course").courseId,
        pptName: pptName,
        pptUrl: wx.getStorageSync("pptUrl"),
        teacherId: wx.getStorageSync("teacherId")
      },
      header: {
        'content-encoding': 'gzip',
        'vary': 'accept-encoding',
        'content-type': 'application/json',
        'charset': 'UTF-8'
      },
      method: "POST",
      success: function (res) {
        var e = this;
        console.log(res);
        if (res.data.status == "success") {
          wx.showToast({
            title: '添加成功',
            icon: 'succes',
            duration: 1000,
            mask: true
          })
          // 获取PPT列表
          wx.request({
            url: 'https://www.xuyuyan.cn/course/getPPTsByCourseId?courseId=' + options.courseId,
            header: {
              'content-encoding': 'gzip',
              'vary': 'accept-encoding',
              'content-type': 'application/json',
              'charset': 'UTF-8'
            },
            method: "GET",
            success: function (res) {
              console.log(res);
              wx.setStorageSync("ppts", res.data.data);
              if (res.data.status === "success") {
                // 读取课程信息
                that.setData({
                  ppts: wx.getStorageSync("ppts")
                })
              }
            },
            fail: function (err) { },//请求失败
            complete: function () { }//请求完成后执行的函数
          })
        }
      },
      fail: function (err) { },//请求失败
      complete: function () { }//请求完成后执行的函数
    })
  },

  addpaper: function () {
    console.log("触发添加paper");
    wx.redirectTo({
      url: '/pages/homework/addPaper/addPaper',
    })
  },

  changetext:function(e) {
    console.log(e);
    console.log(e.detail.value);
  },

  back: function (param) {
    wx.reLaunch({
      url: '/pages/index/index',
    })
  },

  gotoPaper1: function(param) {
    console.log(param);
    console.log(param.currentTarget.dataset.paperid);
    wx.redirectTo({
      url: "/pages/homework/paper_problem_detail/paper_problem_detail?paperId=" + param.currentTarget.dataset.paperid
          + "&paperName=" + param.currentTarget.dataset.papername
    })
  },

  download:function(param) {
    console.log(1);
    console.log(param);
    wx.showLoading({
      title: '正在下载...',
    })
    wx.downloadFile({
      url: param.currentTarget.dataset.url,
      header: {},
      success: function(res) {
        wx.hideLoading();
        wx.showToast("文件下载成功！");
        var tempFilePath = res.tempFilePath;
        //console.log('临时文件地址是：' + tempFilePath)
        wx.openDocument({//打开
          filePath: tempFilePath,
          success: function (res) {}
        })
      },
      fail: function(res) {
        wx.showModal({
          title: '下载失败',
          content: '请联系管理员',
        })
      },
      complete: function(res) {},
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    wx.setStorageSync("courseId", options.courseId)
    // 查询课程信息
    var that = this;
    wx.request({
      url: 'https://www.xuyuyan.cn/course/getCourseDetailByCourseId?courseId=' + options.courseId,
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
          wx.setStorageSync("course", res.data.data);
          wx.setStorageSync("courseDetail", res.data.data.courseDetail)
          wx.setStorageSync("courseCredit", res.data.data.courseCredit)
          wx.setStorageSync("coursePicUrl", res.data.data.coursePicUrl)
          wx.setStorageSync("courseMethod", res.data.data.courseMethod)
          wx.setStorageSync("courseName", res.data.data.courseName)
          // 读取课程信息
          that.setData({
            courseName: wx.getStorageSync("courseName"),
            courseDetail: wx.getStorageSync("courseDetail"),
            courseCredit: wx.getStorageSync("courseCredit"),
            coursePicUrl: wx.getStorageSync("coursePicUrl"),
            courseMethod: wx.getStorageSync("courseMethod")
          })
        }
      },
      fail: function (err) { },//请求失败
      complete: function () { }//请求完成后执行的函数
    })
    // 获取PPT列表
    wx.request({
      url: 'https://www.xuyuyan.cn/course/getPPTsByCourseId?courseId=' + options.courseId,
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
          // 读取课程信息
          that.setData({
            ppts: res.data.data
          })
        }
      },
      fail: function (err) { },//请求失败
      complete: function () { }//请求完成后执行的函数
    })
    // 获取课程下的paper
    wx.request({
      url: 'https://www.xuyuyan.cn/paper/getPaperListByCourseId?courseId=' + options.courseId,
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
          wx.setStorageSync("papers", res.data.data)
          // 读取paper信息
          that.setData({
            papers: wx.getStorageSync("papers")
          })
        }
      },
      fail: function (err) { },//请求失败
      complete: function () { }//请求完成后执行的函数
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      courseName: wx.getStorageSync("courseName"),
      courseDetail: wx.getStorageSync("courseDetail"),
      courseCredit: wx.getStorageSync("courseCredit"),
      coursePicUrl: wx.getStorageSync("coursePicUrl"),
      courseMethod: wx.getStorageSync("courseMethod"),
      papers: wx.getStorageSync("papers"),
      ppts: wx.getStorageSync("ppts")
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
