const
  app = getApp(),
  util = require('../../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    CustomBar: app.globalData.CustomBar,
    rotate: 0,
    index: 0,
    playing: true,
    transition: true,
    music: [
      {
        pic: {
          src: 'cloud://dzb-mybkj.647a-dzb-mybkj/music/pic/1.png',
          color: '#ff7889'
        },
        mus: 'cloud://dzb-mybkj.647a-dzb-mybkj-1257739713/music/mus/DJ OKAWARI - Nightfall.mp3',
        name: 'DJ Okawari - Nightfall',
      }, {
        pic: {
          src: 'cloud://dzb-mybkj.647a-dzb-mybkj/music/pic/1.png',
          color: '#ff7889'
        },
        mus: 'cloud://dzb-mybkj.647a-dzb-mybkj/music/mus/DJ OKAWARI - Spectrum.mp3',
        name: 'DJ-Okawari-Spectrum',
      }, {
        pic: {
          src: 'cloud://dzb-mybkj.647a-dzb-mybkj-1257739713/music/pic/3.png',
          color: '#fcc04d'
        },
        mus: 'cloud://dzb-mybkj.647a-dzb-mybkj-1257739713/music/mus/DJ OKAWARI _ Emily Styler - Flower Dance Pt.2.mp3',
        name: 'J OKAWARI _ Emily Styler - Flower Dance Pt.2'
      }, {
        pic: {
          src: 'cloud://dzb-mybkj.647a-dzb-mybkj-1257739713/music/pic/3.png',
          color: '#fcc04d'
        },
        mus: 'cloud://dzb-mybkj.647a-dzb-mybkj-1257739713/music/mus/DJ OKAWARI _ Emily Styler - Engage Ring.mp3',
        name: 'DJ OKAWARI _ Emily Styler - Engage Ring'
      }, {
        pic: {
          src: 'cloud://dzb-mybkj.647a-dzb-mybkj-1257739713/music/pic/2.png',
          color: '#31bfd7'
        },
        mus: 'cloud://dzb-mybkj.647a-dzb-mybkj-1257739713/music/mus/DJ-Okawari-Yours.mp3',
        name: 'DJ-Okawari-Yours'
      },
      {
        pic: {
          src: 'cloud://dzb-mybkj.647a-dzb-mybkj/music/pic/4.png',
          color: '#3401cc'
        },
        mus: 'cloud://dzb-mybkj.647a-dzb-mybkj-1257739713/music/mus/DJ OKAWARI - Perfect Blue.mp3',
        name: 'DJ Okawari - Perfect Blue'
      }
    ]
  },


  toggle() {

    if (this.data.playing) {
      this.context.pause();
    } else {
      this.context.play();
    }

    this.setData({
      playing: !this.data.playing
    });
  },

// 下一首
  next() {
    let index = this.data.index;
    ++index;
    if(index > this.data.music.length - 1) {
      index = 0
    }
    this.setData({
      transition: false,
      index,
      rotate: 0
    }),
    this.context.src = this.data.music[index].mus;
  },

// 上一首
  last() {
    let index = this.data.index;
    --index;
    if (index < 0) {
      index = this.data.music.length - 1;
    }
    this.setData({
      transition: false,
      index,
      rotate: 0
    });
    this.context.src = this.data.music[index].mus;
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: (function() {

    const context = wx.createInnerAudioContext();

    return function(options) {
      this.context = context;
      context.src = this.data.music[this.data.index].mus;
      context.autoplay = true;


      context.onTimeUpdate((function() {
        
        let times = 0;

        return function() {
          ++times;
          if (times === 2) {
            times = 0;
            let rotate = this.data.rotate;
            rotate += 7;
            this.setData({
              transition: true,
              rotate,
              bar: (context.currentTime / context.duration) * 100
            })
          }
        }

      })().bind(this));
    }

    context.offStop(function() {
      this.next();
    }.bind(this))



  })(),


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    this.context.stop();
    clearTimeout();
    clearInterval();
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})