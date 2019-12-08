const
  util = require('../../utils/util.js'),
  app = getApp();


Page({

  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    // 部门
    dp: {},
    // 职位
    pt: {},
    // 职位列表
    positions: [{
        name: '副书记',
        permissions: 1
      },
      {
        name: '部员',
        permissions: 2
      }
    ],
    // 部门列表
    departments: []
  },


  /* ---------------------
      模态框控制
    -----------------------*/
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },

  hideModal(e) {
    this.setData({
      modalName: null
    })
  },


  /* ------------------
      部门选择
    -------------------*/
  departmentTap(e) {
    this.setData({
      dpIndex: e.currentTarget.dataset.index
    })
  },


  /* ------------------
      职位选择
    -------------------*/
  positionTap(e) {
    this.setData({
      ptIndex: e.currentTarget.dataset.index,
    })
  },


  /* ----------------
      确认选择
    ------------------ */
  confirm(e) {
    let 
        index = 0,
        target = e.target.dataset.target;
    

    if(target === 'dp') {
      index = this.data.dpIndex;
      
      this.setData({
        dp: this.data.departments[index],
        lastDpIndex: index
      })
    } else {
      index = this.data.ptIndex;

      this.setData({
        pt: this.data.positions[index],
        lastPtIndex: index
      })
    }

    this.hideModal();
  },


  /* --------------------
      取消选择
    --------------------- */
  cancel(e) {
    let target = e.target.dataset.target;

    if (target === 'dp') {
      this.setData({
        dpIndex: this.data.lastDpIndex || -1
      })
    } else {
      this.setData({
        ptIndex: this.data.lastPtIndex || -1
      })
    }

    this.hideModal();
  },


  /* --------------------
      用户注册函数
    ---------------------*/
  register(event) {
    let
      data = this.data,
      dtName = event.detail.value.dtName,
      title = '';


    title = data.pt.permissions !== 1 || dtName ? title : '必须填写姓名';
    title = Object.keys(data.pt).length === 0 ? '职位未选择' : title;
    title = Object.keys(data.dp).length === 0 ? '部门未选择' : title;

    if (title) {

      wx.showToast({
        title: title,
        icon: 'none',
        mask: true,
        duration: 1000
      });
      
      return;
    }

    let value = {
      dp: this.data.dp,
      pt: this.data.pt
    }

    if (dtName) {
      value.dp.dpDirector = dtName;
    }

    wx.cloud.callFunction({
        name: 'register',
        data: value
      })

      .then(({result: res}) => {

        if (res.code === 0) {

          wx.redirectTo({
            url: '/pages/index/index',
          });

        } else {

          util.showToast('注册失败');
          console.log(res);
        }
      })

      .catch(err => {
        util.requestFail(err);
      });
  },



  /* ---------------
      生命周期函数
    -----------------*/
  onShow() {
    wx.cloud.callFunction({
        name: 'getDepartments'
      })
      .then(({
        result: res
      }) => {
        console.log(res);
        if (res.code === 0) {
          this.setData({
            departments: res.data
          });
        } else {
          util.showToast('系统错误');
        }

      })
      .catch(err => {
        console.error(err);
      })
  }



})