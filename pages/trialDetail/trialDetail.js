// pages/trialDetail/trialDetail.js
Page({

  /**
   * 页面的初始数据
   */
 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    that.setData({
      classroomRecord: JSON.parse(options.classroomRecord)
    })    
    this.test();
    this.convert();
  },

  data: {
    classroomRecord: {},
    index_classroomRecord: "",
    date:"",
    timeslot:"",
    username:"",
    opinion:"",
    state:"",
  },

  convert:function(){
    var that=this;
    that.setData({
      date: that.data.classroomRecord.DBClassroomApplicationRecord_ApplyDate,
      timeslot: that.timeslotConvert(that.data.classroomRecord.DBClassroomApplicationRecord_TimeSlot),
      state: that.state(that.data.classroomRecord.DBClassroomApplicationRecord_StateOfFirstTrial),

    });
    that.userID2userName(that.data.classroomRecord.DBClassroomApplicationRecord_UserID);
    

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



  test:function(e){
    
    console.log(this.data.classroomRecord);
    console.log(this.data.classroomRecord.DBClassroomApplicationRecord_ActivityDetail);
    this.data.detail=this.data.classroomRecord.DBClassroomApplicationRecord_ActivityDetail;
    

  },
  //转换时间
  renderDatetime: function (date) {
    var da = new Date(parseInt(date.replace("/Date(", "").replace(")/", "").split("+")[0]));
    return da.getFullYear() + "-" + (da.getMonth() + 1) + "-" + da.getDate();
  },
  //转换状态
  state: function (num) {
    switch (num) {
      case 0: return "未审核"
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
  

  //根据用户UID查询用户姓名
  userID2userName:function(userid)
  {
    var that=this;
    wx.request({
      url: getApp().globalData.interfaceUrl+'Home/realName',
      header:{
        'content-type':'application/json'
      },
      data:{uid:userid},
      method:"POST",
      success(res){
        that.setData({
          username:res.data
        })
      }
    })
  },

  opinionInput:function(e)
  {
    this.setData({
      opinion:e.detail.value
    })

  },
  agreeApply:function()
  {
    var that=this;
    console.log(that.data.opinion);
    wx.request({
      url: getApp().globalData.interfaceUrl+'Home/trialClassroomApplyAgree',
      header: {
        'content-type': 'application/json'
      },
      data: {
        classroomApplicationRecordID: that.data.classroomRecord.DBClassroomApplicationRecord_ID,
        opinion: that.data.opinion,
        openid: getApp().globalData.userOpenid,
      },
      method: "POST",
      success(res){

        console.log(" 我同意教室申请了");
        wx.switchTab({
          url: '../trial/trial',
          success: function(res) {},
          fail: function(res) {},
          complete: function(res) {},
        })

      }
    })
    

  },
  refuseApply:function()
  {
    var that = this;
    console.log(that.data.opinion);
    wx.request({
      url: getApp().globalData.interfaceUrl+'Home/trialClassroomApplyRefuse',
      header: {
        'content-type': 'application/json'
      },
      data: {
        classroomApplicationRecordID: that.data.classroomRecord.DBClassroomApplicationRecord_ID,
        opinion: that.data.opinion,
        openid: getApp().globalData.userOpenid,
      },
      method: "POST",
      success(res) {

        console.log(" 我拒绝教室申请了");
        wx.switchTab({
          url: '../trial/trial',
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        })

      }
    })

  }
})