// pages/query/query.js
var mydate=new Date();
var mth = mydate.getMonth();
var myday=mydate.getDate();

if (mth>=0&&mth<=8)
{
  if(myday>=0&&myday<=9)
  { mydate = mydate.getFullYear() + "-0" + (mydate.getMonth() + 1) + "-0" + mydate.getDate()}
  else
  {
    mydate = mydate.getFullYear() + "-0" + (mydate.getMonth() + 1) + "-" + mydate.getDate()
  }
  
}else
{
  if (myday >= 0 && myday <= 9)
  { mydate = mydate.getFullYear() + "-" + (mydate.getMonth() + 1) + "-0" + mydate.getDate() }
  else {
    mydate = mydate.getFullYear() + "-" + (mydate.getMonth() + 1) + "-" + mydate.getDate()
  }
}

var app=getApp();


Page({


  onLoad: function (options) {
    console.log("---你是第一个页面就运行吗？----");
     


    wx.login({
      success: res => {
        var code = res.code;
        if (code) {
          console.log("获取用户登录凭证：" + code);
          wx.request({
            url: getApp().globalData.interfaceUrl+'Home/getOpenidOnly?js_code=' + code,
            header: { 'Content-Type': 'application/json' },
            success(res) {
              app.globalData.userOpenid = res.data.Result.substr(res.data.Result.length - 30, 28);
              console.log("我的OPENID:" + app.globalData.userOpenid);
            },
          })
        }
      }
    })

    wx.request({
      url: getApp().globalData.interfaceUrl+'Home/getUnitName',
      header: { 'Content-Type': 'application/json' },
      success(res){
        
        app.globalData.unit=res.data;
        
      }
    })


  },

  /**
   * 页面的初始数据
   */
  data: {
    date:mydate,
    timeslot: ['上午', '下午', '晚上'],    
    index_time:0,    
    classroom: {},   
  },

  binddatechange:function(e){
    console.log(e);
    this.setData({
      date:e.detail.value            
    })
    
  },
  bindtimechange: function (e) {
      this.setData({
      index_time: e.detail.value
    })
  },
  


  queryclassroom:function(res){
    var that=this;
    wx.request({      
      url: getApp().globalData.interfaceUrl+'Home/QueryClassroom', 
      header:{
        'content-type':'application/json'
      } ,    
      data: { datestr: that.data.date, timeslot: that.data.timeslot[that.data.index_time]},     
      method:"POST",
      success:function(res){         

        app.globalData.classroom=res.data;
        app.globalData.date = that.data.date;
        app.globalData.timeslot = that.data.timeslot;
        app.globalData.index_time = that.data.index_time;

        var arr = app.globalData.classroom;
        for (var i = 0, len = arr.length; i < len; i++) {
          console.log(arr[i].DBClassroom_Name);//遍历输出
          app.globalData.classroomNames[i] = arr[i].DBClassroom_Name;

        }

        that.setData({
          classroom: res.data
        })
        
      },

    })

  },
  query2appplyclassroomBtn: function (e) {        
    
    app.globalData.index_classroomNames=e.currentTarget.id;    

    wx.navigateTo({
      
      url: '../apply/apply',


    })

  },
  onShow:function(){
    this.queryclassroom();
  }




})