// pages/personInfoDetail/personInfoDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    realName:"",
    studentNum:"",
    unit:"",
    telephoneNum:"",
    email:"",
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.queryPersonInfodetail();
  
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
  queryPersonInfodetail:function(e){
    var that=this;
    wx.request({
      url: getApp().globalData.interfaceUrl +'Home/queryPersonInfodetail',
      data:{
        openid: getApp().globalData.userOpenid,

      },
      header: {
        'Content-Type': 'application/json'
      },
      success:function(res){
        console.log(res.data);

        that.setData({
          realName: res.data.DBUser_Name,
          studentNum: res.data.DBUser_IDNumber,
          unit: res.data.DBUser_UnitBelongTo,
          telephoneNum: res.data.DBUser_Phone,
          email: res.data.DBUser_Email,

        })


      }
    })
  },
  editInfo:function(){
    wx.navigateTo({
      url: '../editInfo/editInfo',
    })
  }
})