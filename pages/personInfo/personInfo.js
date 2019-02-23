// pages/personInfo/personInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    applyDate: "",
    timeSlot: "",
    classroomName: "",
    activityName: "",
    stateOfFirstTrial: "",
    opinionOfFirstTrial: "",
    stateOfLastTrial: "",
    opinionOfLastTrial: "",
    stateOfFeedback: "",

    record: {},

    name: "",
    Score: "",

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.queryRecord();
    this.queryScore();

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.queryRecord();
    this.queryScore();

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  //renderTime：function (date) {
  // var da = new Date(parseInt(date.replace("/Date(", "").replace(")/", "").split("+")[0]));
  // var weekdays = { 0: "星期日", 1: "星期一", 2: "星期二", 3: "星期三", 4: "星期四", 5: "星期五", 6: "星期六" }[da.getDay()];
  //  return da.getFullYear() + "/" + (da.getMonth() + 1) + "/" + da.getDate() + " " + weekdays + " " + da.getHours() + ":" + da.getMinutes() + ":" + da.getSeconds();
  //},

  //转换时间
  renderDatetime: function (date) {
    var da = new Date(parseInt(date.replace("/Date(", "").replace(")/", "").split("+")[0]));
    return da.getFullYear() + "-" + (da.getMonth() + 1) + "-" + da.getDate();
  },
  //转换状态
  state: function (num) {
    switch (num) {
      case 0: return "未审"
        break;
      case 1: return "批准"
        break;
      case 2: return "拒绝"
        break;
    }

  },
  //转换状态
  stateFeedback: function (num) {
    switch (num) {
      case 0: return "未反馈"
        break;
      case 1: return "已反馈"
        break;
    }

  },
  //转换状态
  timeslotConvert: function (num) {
    switch (num) {
      case 0: return "上午"
        break;
      case 1: return "下午"
        break;
      case 2: return "晚上"
        break;
    }

  },

  //根据教室UID查询教室名称

  classroomId2lassroomName: function (classroomUID) {
    var that = this;
    wx.request({
      url: getApp().globalData.interfaceUrl + 'Home/classroomName',
      header: {
        'content-type': 'application/json'
      },
      data: { uid: classroomUID },
      method: "POST",
      success: function (res) {
        console.log("---教室名：--")
        console.log(res.data);
        that.setData({
          name: res.data
        })
        console.log(that.data.name);
      }
    })
  },

  queryRecord: function () {

    var that = this;
    wx.request({
      url: getApp().globalData.interfaceUrl + 'Home/classroomRecord',
      header: {
        'content-type': 'application/json'
      },
      data: {
        openid: getApp().globalData.userOpenid
      },
      method: "POST",
      success: function (res) {
        console.log(res.data);
        var arr = res.data;
        for (var i = 0; i < arr.length; i++) {
          arr[i].DBClassroomApplicationRecord_ApplyDate = that.renderDatetime(arr[i].DBClassroomApplicationRecord_ApplyDate);
          arr[i].DBClassroomApplicationRecord_StateOfFirstTrial = that.state(arr[i].DBClassroomApplicationRecord_StateOfFirstTrial);
          arr[i].DBClassroomApplicationRecord_StateOfLastTrial = that.state(arr[i].DBClassroomApplicationRecord_StateOfLastTrial);
          arr[i].DBClassroomApplicationRecord_StateOfFeedback = that.stateFeedback(arr[i].DBClassroomApplicationRecord_StateOfFeedback);
          arr[i].DBClassroomApplicationRecord_TimeSlot = that.timeslotConvert(arr[i].DBClassroomApplicationRecord_TimeSlot);

        }

        that.setData({
          record: res.data
        });
        getApp().globalData.myrecord = that.data.record;
        console.log("---")
        console.log(getApp().globalData.myrecord);

      }

    })
  },


  queryScore: function () {
    var that = this;

    wx.request({
      url: getApp().globalData.interfaceUrl + 'Home/personInfo',
      method: 'POST',
      data: {
        openid: getApp().globalData.userOpenid,
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
            url: getApp().globalData.interfaceUrl + 'Home/getUnitScore',
            header: {
              'content-type': 'application/json'
            },
            data: {
              openid: getApp().globalData.userOpenid
            },
            method: "POST",
            success: function (res) {
              that.setData({
                Score: res.data
              })
            }
          })
        } else {
          that.setData({
            Score: "未查到你所在单位或你积分为0"
          })
        }
      }
    })
  },



  feedback: function (e) {

    getApp().globalData.myrecord_index = e.currentTarget.id;
    console.log(getApp().globalData.myrecord_index);

    wx.navigateTo({
      url: '../feedback/feedback',
    })
  },




})