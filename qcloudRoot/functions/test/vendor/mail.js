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


  return async function (meeting) {
    
    let mailOptions = {
      from: "'党支部会议小程序' <zjgydxyxydxb@163.com>", // sender address
      to: '2472329526@qq.com', // list of receivers
      subject: '党支部会议小程序', // Subject line
      // 发送text或者html格式
      html: JSON.stringify(meeting) // html body
    };

    // send mail with defined transport object
    return await transporter.sendMail(mailOptions)
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