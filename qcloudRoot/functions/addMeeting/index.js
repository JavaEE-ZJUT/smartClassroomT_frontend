// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

// 数据库引用
const
  db = cloud.database(),
  util = require('./vendor/util.js')(db, 'addMeeting'),
  mail = require('./vendor/mail.js')(util);


// 云函数入口函数
exports.main = async(event, context) => {
  try {

    event.date = new Date(event.date + ' GMT+0800');

    delete event.userInfo;

    let meeting = event;


    return await db.collection('department')

      .doc(meeting.dp_id)

      .get()

      .then(async (res) => {
        let department = res.data;
        
        delete meeting.dp_id;

        meeting.dp = {
          _id: department._id,
          dpDirector: department.dpDirector,
        };

        meeting.picList = [];

        meeting.createAt = db.serverDate();
        meeting.updateAt = db.serverDate();

        await db.collection('meeting')

          .add({
            data: meeting
          })

        meeting.dp.dpName = department.dpName;

        await mail(meeting);

        return {
          code: 0
        }

      })

      .catch(async e => {
        console.error(e);
        await util.error(e);
        return {
          code: 1
        }
      })




  } catch (e) {
    console.error(e);
    await util.error(e);
    return {
      code: 1
    }
  }
}