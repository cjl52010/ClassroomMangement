var app=getApp(); 
// pages/editInfo/editInfo.js
Page({

  onLoad: function (options) {
    console.log("我运行没？")
    console.log(app.globalData.unit);
    this.setData({
      unit: app.globalData.unit
    })

  },
  /**
   * 页面的初始数据
   */
  data: {
    unit: getApp().globalData.unit,
    index:0,
    toast1Hidden: true,
    modalHidden: true,
    modalHidden2: true,
    notice_str: ''
  
  },

  PickerUnitChange:function(e)
  {
    this.setData({
      
      index:e.detail.value,
      
    })  

  },

  toast1Change:function(e){
    this.setData({toast1Hidden:true});
  },
  modalTap: function (e) {
    this.setData({
      modalHidden: false
    })
  },  

  modalTap2: function (e) {
    this.setData({
      modalHidden2: false
    })
  },  
//TODO :修改URL
  formSubmit: function (e) {
    var that = this;
    var formData = e.detail.value;
    wx.request({
      url: getApp().globalData.interfaceUrl+'Home/completeUserInfo',
      data: {
        openid: getApp().globalData.userOpenid,
        realName: formData.realName,
        studentNum: formData.studentNum,
        telephoneNum: formData.telephoneNum,
        email: formData.email,
        unit: that.data.unit[that.data.index],
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        wx.switchTab({
          url: '../personInfo/personInfo',
        })
        
      }
    })
  },
  formReset: function () {
    console.log('form发生了reset事件');
    
  },
  /**
   * 生命周期函数--监听页面加载
   */

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
    });
  },  

  modalChange2: function (e) {
    this.setData({
      modalHidden2: true
    })
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


  
// 手机验证
PhoneNumber: function(e) {
    var phone = e.detail.value;
    if (!(/^1[34578]\d{9}$/.test(phone))) {
      this.setData({
        ajxtrue: false
      })
      if (phone.length != 11) {
        wx.showToast({
          title: '手机号有误',
          icon: 'success',
          duration: 2000
        })
      }
    } else {
      this.setData({
        ajxtrue: true
      })
    }
  },

  //邮箱验证
  Mail:function(e){
    var mail=e.detail.value;
    if (!(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(mail)))
    {
      wx.showToast({
        title: '邮箱格式有误',
        icon:'success',
        duration:2000
      })
    }
  }

})