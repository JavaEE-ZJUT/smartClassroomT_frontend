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
    gotoCourseDetail: function(key) {
      console.log(key.currentTarget.dataset.courseid);
      // wx.setStorageSync("courseId", key.currentTarget.dataset.courseid);
      wx.redirectTo({
        url: "/pages/homework/detail/detail?courseId=" +  key.currentTarget.dataset.courseid
      })
    },
  },



  lifetimes: {
    attached() {
      rq({
        path: '/course/returnCourseDetailByTeacherId?teacherId=' + wx.getStorageSync("teacherId")
        // path: '/course/returnCourseDetailByStudentId?studentId=1'
      })
      .then(res => {
        if (res.status == 'success') {
          console.log(res.data)
          this.setData({
            course: res.data
          })
          wx.setStorageSync("courseList", res.data);
        }
      })
        .catch(Util.requestFail);
    }
  }

})
