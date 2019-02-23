// pages/trial/trial.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classroomRecord:{},
    index_classroomRecord:"",
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.trialClassroomList();
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
    this.trialClassroomList();
  
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

  //转换时间
  renderDatetime: function (date) {
    var da = new Date(parseInt(date.replace("/Date(", "").replace(")/", "").split("+")[0]));
    return da.getFullYear() + "-" + (da.getMonth() + 1) + "-" + da.getDate();
  },

  

  trialClassroomList:function(){
    var that=this;
    wx.request({
      url: getApp().globalData.interfaceUrl+'Home/trialClassroomApplyList',
      header:{
        'Content-type':'application/json'
      },
      method:"POST",
      data:{
        openid: getApp().globalData.userOpenid
      },
      success(res){
        console.log(res.data);
        
        var arr=res.data;
        for (var i = 0; i < arr.length;i++)
        {
          arr[i].DBClassroomApplicationRecord_ApplyDate = that.renderDatetime(arr[i].DBClassroomApplicationRecord_ApplyDate);          
        }
        that.setData({
          classroomRecord:res.data

        })
      }
    })
  },
  trailClassroomDetail:function(e){
    var that=this;
    console.log("有没有ID");
    console.log(e);
    that.data.index_classroomRecord = e.currentTarget.id;
    console.log("有没有输出");
    console.log(that.data.index_classroomRecord);
    var ClassroomRecordDetail = that.data.classroomRecord[that.data.index_classroomRecord];
    wx.navigateTo({
      url: '../trialDetail/trialDetail?classroomRecord=' + JSON.stringify(ClassroomRecordDetail),
      success(res){
        console.log("有没有结果");
        console.log(JSON.stringify(ClassroomRecordDetail));
      }
    })

    

  }


})