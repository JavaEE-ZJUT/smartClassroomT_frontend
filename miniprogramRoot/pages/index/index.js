const app = getApp();

Page({
  data: {
    PageCur: 'homeWork',
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    showed: {
    }
  },

  // tabbar改变页面
  changeCur: (function() {

    let duration = 100;
    let tabAnim = wx.createAnimation({
      duration,
      timingFunction: 'linear',
    })

    return function(event) {

      let
        cur = event.currentTarget.dataset.cur,
        pageCur = this.data.PageCur;

      if (pageCur !== cur) {

        tabAnim.scale(0.6).step();
        tabAnim.scale().step();

        let
          showed = this.data.showed,

          data = {
            PageCur: cur,
            tabAnim: tabAnim.export()
          };

        if (!showed[cur]) {
          showed[cur] = 1;
          data.showed = showed;
        }

        this.setData(data);

      }

    }
  })(),


  onLoad() {

    // wx.showLoading({
    //   title: '登录中',
    //   mask: true
    // });

    // wx.cloud.callFunction({
    //     name: 'login'
    //   })

    //   .then(({
    //     result: res
    //   }) => {

    //     if (res.code === 0) {

    //       this.data.userInfo = res.data;
    //       app.globalData.userInfo = res.data;

    //       console.log('----------userInfo----------');
    //       console.log(res.data);

    //       wx.hideLoading();
    //       wx.showToast({
    //         title: '登录成功',
    //         icon: 'success'
    //       });

    //       this.setData({
    //         "showed.meeting" : 1
    //       })

    //     } else {
    //       wx.reLaunch({
    //         url: '/pages/register/register'
    //       });
    //     }

    //   })

    //   .catch(e => {
    //     wx.hideLoading();

    //     wx.showToast({
    //       title: '登录失败',
    //       icon: 'none'
    //     });
    //   })



  }

})