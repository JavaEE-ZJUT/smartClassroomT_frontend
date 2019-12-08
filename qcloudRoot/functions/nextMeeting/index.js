// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

// 数据库引用
const
  db = cloud.database(),
  _ = db.command,
  util = require('./vendor/util.js')(db, 'nextMeeting');

// 云函数入口函数
exports.main = async(event, context) => {
  try {

    return await db.collection('meeting')

      .where({
        dp: {
          _id: event.dp_id
        },
        date: _.gte(db.serverDate())
      })

      .orderBy('date', 'asc')

      .get()

      .then(async res => {

        if (res.data.length === 0) {
          return Promise.reject();
        }
    
        let data = res.data[0];

        // 查找部门信息
        return await db.collection('department')

        .doc(event.dp_id)
        
        .get()
        
        .then(async res => {

          data.dp.dpName = res.data.dpName;

          return {
            code: 0,
            data
          }
        });
      
      })

      .catch(async e => {
        let value = { code: 0, data: null };

        if (e !== undefined) {
          await util.error(e);
          value = { code: 1 }
        }

        return value;
      })


  } catch (e) {
    await util.error(e);
    return {
      code: 1
    }
  }

}