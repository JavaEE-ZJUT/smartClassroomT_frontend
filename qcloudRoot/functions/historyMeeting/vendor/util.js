module.exports = function(db, fcName) {


  async function log(message) {
    await db.collection('logs')
      .add({
        data: {
          message,
          fcName,
          date: db.serverDate()
        }
      })
  }



  async function error(err) {
    await db.collection('errors')
      .add({
        data: {
          errCode: err.errCode,
          errMsg: err.errMsg,
          error: err,
          fcName,
          date: db.serverDate()
        }
      })
  }


  return {
    log,
    error
  }

}