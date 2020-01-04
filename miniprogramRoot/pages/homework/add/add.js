const { globalData } = getApp();

const Util = require('../../../utils/util.js');
const rq = require('../../../utils/rq.js');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    CustomBar: globalData.CustomBar,
  },


  // formSubmit(e) {
  //
  //   let title = '';
  //   const value = e.detail.value;
  //
  //   value.classOpenyear = parseInt(value.classOpenyear);
  //
  //   title = value.classOpenyear ? title : '开课学年未填写';
  //   title = value.classClassroom ? title : '教室未填写';
  //   title = value.className ? title : '班级名未填写';
  //
  //   if (title) {
  //     Util.showToast({
  //       title
  //     });
  //     return;
  //   }
  //
  //   console.log(value);
  //
  //   wx.showLoading({
  //     title: '修改中',
  //     mask: true
  //   });
  // },

//上传图片////////////////////////////////////
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
              wx.setStorageSync("imgUrl" , obj.url);
              console.log(wx.getStorageSync("imgUrl"))
              wx.reLaunch({
                url: '/pages/index/index',
              })
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

  formSubmitForCourse: function (e) {
    wx.request({
      url: "https://www.xuyuyan.cn/course/createCourse?coursePicUrl=" + wx.getStorageSync("imgUrl") + '&courseName=' + e.detail.value.courseName
          + '&courseDetail=' + e.detail.value.courceDetail + '&courseMethod=' + e.detail.value.courseMethod + '&credit=' + parseInt(e.detail.value.credit)
          + '&teacherId=' + wx.getStorageSync("teacherId"),
      method: "GET",
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        console.log(res.data);
        if (res.data.status == "success") {
          wx.showToast({
            title: '课程创建成功！',
            icon: 'success',
            duration: 2000
          })
        } else {
          wx.showToast({
            title: '课程创建失败！',
            icon: 'success',
            duration: 2000
          })
        }

      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
