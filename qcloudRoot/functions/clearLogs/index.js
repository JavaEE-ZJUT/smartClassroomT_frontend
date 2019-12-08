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


  return await db.collection('logs')

    .get()

    .then(async res => {
      
      let data = res.data;

      for(let i = 0; i < data.length; i++) {
        await db.collection('logs')
          .doc(data[i]._id)
          .remove()
      }

      return {
        meesage: '成功'
      }
    })


    .catch(err => {
      return {
        message: '失败',
        err
      }
    })
}