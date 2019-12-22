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

    let duration = 70;
    let tabAnim = wx.createAnimation({
      duration,
      timingFunction: 'linear',
    })

    return function(event) {

      let
        cur = event.currentTarget.dataset.cur,
        pageCur = this.data.PageCur;

      if (pageCur !== cur) {

        tabAnim.scale(0.5).step();
        tabAnim.scale().step();

        let
          showed = this.data.showed,

          data = {
            PageCur: cur,
            tabAnim: tabAnim.export()
          };

        this.setData(data);

      }

    }
  })(),


  onLoad() {


  }

})