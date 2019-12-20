const host = 'http://www.xuyuyan.cn:8089';




module.exports = async({
  path,
  query,
  method,
  data
}) => {

  method = method || 'get';
  data = data || {};

  if (typeof query == 'object') {
    let keys = Object.keys(query);

    let par = [];

    keys.forEach(function(item) {
      par.push(`${item}=${query[item]}`);
    });

    query = '?' + par.join('&');
  } else {
    query = '';
  }


  return new Promise(function (resolve, reject) {

    wx.request({
      url: host + path + query,
      method,
      data,
      success({
        data: res
      }) {
        resolve(res);
      },
      fail(err) {
        reject(err);
      }
    })

  })


}