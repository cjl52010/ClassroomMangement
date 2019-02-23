var mydate = new Date();
var app = new getApp();
// pages/apply/apply.js
Page({

  onLoad: function (options) {
    console.log("---你到底什么时候运行----");
    var that = this;
    that.setData({
      date: app.globalData.date,
      timeslot: app.globalData.timeslot,
      classroom: app.globalData.classroom,
      index_time: app.globalData.index_time,
      classroomNames: app.globalData.classroomNames,
      index_classroomNames: app.globalData.index_classroomNames
    });
  },

  /**
   * 页面的初始数据
   */
  data: {
    date: '',
    timeslot: [],
    classroom: {},
    classroomNames: [],
    index_time: '',
    index_classroomNames: '',


    index: 0,
    toast1Hidden: true,
    modalHidden: true,
    modalHidden2: true,
    notice_str: "",
  },
  toast1Change: function (e) {
    this.setData({ toast1Hidden: true });
  },
  //弹出确认框
  modalTap: function (e) {
    this.setData({ modalHidden: false });
  },
  confirm_one: function (e) {
    console.log(e);
    this.setData({
      modalHidden: true,
      toast1Hidden: false,
      notice_str: '提交成功'
    });
  },
  cancel_one: function (e) {
    console.log(e);
    this.setData({
      modalHidden: true,
      toast1Hidden: false,
      notice_str: '取消成功'
    })
  },
  //弹出提示框  
  modalTap2: function (e) {
    this.setData({
      modalHidden2: false
    })
  },
  modalChange2: function (e) {
    this.setData({
      modalHidden2: true
    })
  },


  binddatechange: function (e) {
    console.log(e);
    this.setData({
      date: e.detail.value
    })
  },
  bindtimechange: function (e) {
    console.log(e);
    this.setData({
      index_time: e.detail.value
    })
  },

  bindclassroomNumchange: function (e) {
    this.setData({
      index_classroomNames: e.detail.value
    });
    console.log("---教室号没变咧---")
    console.log(e);
  },//增加改变后的查询冲突功能

  /**
   * 生命周期函数--监听页面加载
   */

  formSubmit: function (e) {
    var that = this;
    var formData = e.detail.value;

    wx.request({
      url: app.globalData.interfaceUrl + 'Home/personInfo',
      method: 'POST',
      data: {
        openid: app.globalData.userOpenid,
      },
      header: {
        'Content-type': 'application/json'
      },
      success: function (res) {
        console.log("----------")
        console.log(res);
        console.log("----------")
        var boolData;
        switch (res.data) {
          case "True":
            boolData = true;
            break;
          case "False":
            boolData = false;
            break;
        }

        console.log(boolData);
        if (boolData) {
          wx.request({
            url: app.globalData.interfaceUrl + 'Home/applyClassroom',
            method: 'POST',
            data: {
              activityDate: that.data.date,
              timeslot: that.data.timeslot[that.data.index_time],
              classroomName: that.data.classroomNames[that.data.index_classroomNames],
              activityName: formData.activityName,
              activityPersonNum: formData.activityPersonNum,
              activityDetail: formData.activityDetail,
              openid: app.globalData.userOpenid,
              activityPublic: formData.activityPublic
            },
            header: {
              'Content-type': 'application/json'
            },
            success: function (res) {

              wx.switchTab({
                url: '../personInfo/personInfo',
              })

            }
          })

        } else {

          wx.navigateTo({
            url: '../personInfoDetail/personInfoDetail',
          })


        }

      }

    })







  },




})