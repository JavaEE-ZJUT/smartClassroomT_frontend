const nodemailer = require('nodemailer');


module.exports = function(util) {

  let transporter = nodemailer.createTransport({
    service: '163',
    port: 25, // 163邮箱
    secureConnection: true, // 使用了 SSL
    auth: {
      user: 'zjgydxyxydxb@163.com',
      pass: '2019zjgydxyxydxb', // 授权码
    }
  });


  return async function(meeting) {

    let html = `
    <h3>${meeting.dp.dpName}</h3>
    <p><b>发布时间：</b>${new Date().toLocaleString()}</p>
    <p><b>副书记：</b>${meeting.dp.dpDirector}</p>
    <p><b>会议时间：</b>${meeting.date.toLocaleString()}</p>
    <p><b>会议地点：</b>${meeting.place}</p>
    <p><b>督会人员：</b>${meeting.supervisor}</p>
    <p><b>会议内容：</b>${meeting.content}</p>
    `;

    let mailOptions = {
      from: '会议小程序<zjgydxyxydxb@163.com>', // sender address
      to: '<zjgydxyxydxb@163.com>', // list of receivers
      subject: '会议小程序', // Subject line
      html // html body
    };


    // send mail with defined transport object
    await transporter.sendMail(mailOptions)
      .then(res => {
        console.log(res);
        console.log('邮件发送成功');
      })
      .catch(err => {
        console.error(err);
        console.error('邮件发送失败');
      });

  }
}