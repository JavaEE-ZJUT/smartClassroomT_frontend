// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

// 数据库引用
const
  db = cloud.database();


// 云函数入口函数
exports.main = async (event, context) => {
  try {

    return await db.collection('feedback')
    
    .add({
      data: {
        openId: event.userInfo.openId,
        message: event.message,
        creatAt: db.serverDate()
      }
    })

    .then(res => {
      return {
        code: 0
      };
    })

    .catch(async err => {
      return {
        code: 1,
        err
      };
    })

  } catch(e) {
    return {
      code: 1,
      err
    }
  }
}