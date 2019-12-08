// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

// 数据库引用
const
  db = cloud.database(),
  _ = db.command,
  util = require('./vendor/util.js')(db, 'removeMeeting');

// 云函数入口函数
exports.main = async (event, context) => {

  try {

    return await db.collection('meeting')

    .doc(event._id)

    .remove()

    .then(() => {
      return {
        code: 0
      }
    })

    .catch(err => {
      return {
        code: 1,
        message: err
      }
    })

  } catch(e) {
    await util.error(e);
    return {
      code: 1
    }
  }


}