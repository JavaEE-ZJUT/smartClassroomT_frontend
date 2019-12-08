// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

// 数据库引用
const
  db = cloud.database(),
  _ = db.command,
  util = require('./vendor/util.js')(db, 'getMeeting');

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db.collection('meeting')

    .doc(event.mt_id)

    .get()

    .then(res => {
      return {
        code: 0,
        data: res.data
      }
    })

    .catch(err => {
      return {
        code: 1,
        err
      }
    })


  } catch(err) {
    return {
      code: 1,
      err
    }
  }

}