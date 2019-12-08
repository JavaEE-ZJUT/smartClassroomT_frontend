// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

// 数据库引用
const
  db = cloud.database();

// 云函数入口函数
exports.main = async(event, context) => {

  try {

    let { userInfo } = event;


    return await db.collection('user')

    .where({
      openId: userInfo.openId
    })

    .get()

    .then(async res => {
      
      let user = res.data[0];

      let dp = await db.collection('department')

      .doc(user.dp._id)

      .get()

      user.dp = dp.data;

      return user 
    })

    .then(user => {

      return {
        code: 0,
        data: user
      }
    })

    .catch(err => {

      return {
        code: 1,
        err
      }

    })



  } catch (err) {

    return {
      code: 1,
      err
    }
  }

}