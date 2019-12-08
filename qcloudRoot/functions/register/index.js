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

  try {

    let {userInfo} = event;

    console.log(event);


    // 如果是副部长更改部门的部长信息
    if (event.dp.dpDirector !== undefined && event.pt.permissions === 1) {
      await db.collection('department')

        .doc(event.dp._id)
      
        .update({
          data: {
            dpDirector: event.dp.dpDirector
          }
        })
    
    }


    // 插入用户信息
    return await db.collection('user')

      .add({
        data: {
          openId: userInfo.openId,
          dp:{
            _id: event.dp._id
          },
          pt: {
            permissions: event.pt.permissions
          },
          createAt: db.serverDate(),
          updateAt: db.serverDate(),
        }
      })

      .then(() => {
        return {
          code: 0
        }
      })

      .catch(async err => {
        // openId已存在的情况下，变更部门，职位信息
        if (err.errCode === -502001) {

          return await db.collection('user')

            .where({
              openId: userInfo.openId
            })

            .update({
              data: {
                dp: {
                  _id: event.dp._id
                },
                pt: {
                  permissions: event.pt.permissions
                },
                updateAt: db.serverDate(),
              }
            })

            .then(() => {
              return {
                code: 0,
                msg: '用户信息已更新'
              }
            })

            .catch(err => {
              return {
                code: 1,
                msg: '用户信息更新失败',
                err
              }
            })

        } else {
            throw err;
          }
        }
      )

      .catch(err => {
        return {
          code: 1,
          msg: '用户信息添加失败-1',
          err
        }
      })




  } catch (err) {
    return {
      code: 1,
      msg: '用户信息添加失败-2',
      err
    }
  }

}