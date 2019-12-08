// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

// 数据库引用
const db = cloud.database();

// 云函数入口函数
exports.main = async(event, context) => {


  try {
    return await db.collection('department')
      .field({
        dpName: true,
        _id: true,
      })
      .get()
      .then(res => {
        return {
          code: 0,
          data: res.data
        }
      })

  } catch (err) {
    await db.collection('errors')
      .add({
        data: {
          message: err.message,
          functionName: 'getDepartments',
          date: db.serverDate()
        }
      })
    return {
      code: 1
    }
  }


}