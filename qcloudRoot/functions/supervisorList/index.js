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
    
    let departments = await db.collection('department')

    .get()
    
    .then(res => {
      return res.data
    });

    let map = {};

    departments.forEach(function(item, index) {
      map[item._id] = item;
    });


    return await db.collection('meeting')

      .where({
        date: _.gte(db.serverDate()),
        supervisor: _.exists(false)
      })

      .get()

      .then(res => {
        
        let meetings = res.data;

        for(let i = meetings.length; i--;) {
          meetings[i].dp.dpName = map[meetings[i].dp._id].dpName;
        }

        console.log(meetings);

        return {
          code: 0,
          data: meetings
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