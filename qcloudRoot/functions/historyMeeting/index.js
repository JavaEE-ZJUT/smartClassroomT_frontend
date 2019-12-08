// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

// 数据库引用
const
  db = cloud.database(),
  _ = db.command,
  util = require('./vendor/util.js')(db, 'historyMeeting');


// 云函数入口函数
exports.main = async(event, context) => {
  try {
    let
      dp_id = event.dp_id,
      date = event.date;

      console.log(event);


    let
      start = new Date(date);
      end = new Date(date);

    end.setMonth(start.getMonth() + 1);
    end.setDate(0);


    if(end > new Date()) {
      end = new Date();
    }


    return await db.collection('meeting')

      .where({
        dp: {
          _id: dp_id
        },
        date: _.gte(start).and(_.lte(end))
      })

      .orderBy('date', 'desc')

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



  } catch (err) {
    await util.error(err);
    return {
      code: 1,
      err
    }
  }


}


 

// 8小时的时区差
function changeTimeZone(date) {
  return new Date(date.getTime() + 8 * 60 * 60 * 1000)
}