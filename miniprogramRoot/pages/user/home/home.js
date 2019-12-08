const app = getApp();


Component({
  options: {
    addGlobalClass: true,
  },
  properties: {

  },

  data: {
  },
  lifetimes: {
    attached() {

      let userInfo = app.globalData.userInfo;

      if (userInfo.pt.permissions === 2) {
        userInfo.pt.name = '部员';
      } else {
        userInfo.pt.name = '副书记';
      }

      this.setData({
        userInfo
      });
    }
  },
  methods: {}
})