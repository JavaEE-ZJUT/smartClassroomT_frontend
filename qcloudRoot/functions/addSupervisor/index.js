// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

// 数据库引用
const
  db = cloud.database(),
  _ = db.command;



exports.main = async (event, context) => {
  try {
    return await db.collection('meeting')

      .doc(event.mtId)


      .update({
        data: {
          supervisor: event.spName
        }
      })


      .then(res => {
        return {
          code: 0
        }
      })


      .catch(err => {
        return {
          code: 1,
          err
        }
      })


  } catch (e) {
    return {
      code: 1
    }
  }



}