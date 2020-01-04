// class Util {

//   /* ------------------
//       时间处理
//     ------------------ */

// static  getDate(dateString) {

//     let date = dateString ? new Date(dateString) : new Date();

//     return [
//       date.getFullYear(),
//       date.getMonth() + 1,
//       date.getDate()
//     ]
//   }



//   static getWeek = (function() {

//     let weekday = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];

//     return function(dateString) {
//       let date = dateString ? new Date(dateString) : new Date();

//       return weekday[date.getDay()];
//     }

//   })()



//   static  getTime(dateString) {
//     let time = dateString ? new Date(dateString) : new Date();

//     let
//       hour = time.getHours(),
//       minutes = time.getMinutes();

//     return [
//       hour < 10 ? '0' + hour : hour,
//       minutes < 10 ? '0' + minutes : minutes
//     ]
//   }



//   // -----------------------提示框--------------------------

//   /* --------------------
//       显示模态框
//      --------------------- */


//   static showModal(content) {
//     wx.showModal({
//       title: '',
//       content,
//       showCancel: false
//     });
//   }


//   /* ---------------------
//       提示信息
//     ----------------------- */

//   static showToast = (function() {

//     let types = {

//       success: {
//         title: '成功'
//       },

//       fail: {
//         title: '失败',
//         image: '/assets/tips/fail.png'
//       }

//     };

//     return function({title, s}) {
//       let target;

//       if(s) {
//         target = types.success;
//       } else {
//         target = types.fail;
//       }

//       if(title) {
//         target.title = title;
//       }

//       target.mask = true;
//       target.duration = 1500;
//       wx.showToast(target);
//     }

//   })()




//   /* -------------------
//       系统错误
//     -------------------- */

//   static systemError() {
//     wx.showModal({
//       title: '',
//       content: '系统错误',
//       showCancel: false
//     })
//   }



//   static formatTime = date => {
//     const year = date.getFullYear()
//     const month = date.getMonth() + 1
//     const day = date.getDate()
//     const hour = date.getHours()
//     const minute = date.getMinutes()
//     const second = date.getSeconds()

//     return [year, month].map(formatNumber).join('年') + '月'
//   }



//   /* -------------------
//       网络请求
//      ------------------- */

//   static requestFail(err) {
//     let tips = {
//       title: '系统错误', 
//       s: 0
//     };


//     if (err.errMsg == "request:fail ") {
//       tips.title = '网络请求失败';
//     }

//     Util.showToast(tips);

//     console.error(err);
//   }
// }


// module.exports = Util;