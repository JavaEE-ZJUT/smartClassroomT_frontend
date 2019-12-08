// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

// 数据库引用
const
  db = cloud.database(),
  util = require('./vendor/util.js')(db, 'test'),
  mail = require('./vendor/mail.js')(util);


exports.main = async(event, context) => {

  console.log(event);

  console.log(context);

  return event;

}