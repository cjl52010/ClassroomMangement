//app.js
var mydate=new Date();
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs) 
  },

  
  globalData: {
    userInfo: null,
    userOpenid:null,
    date:'',
    timeslot: [], 
    classroom: {},
    index_time:'',
    classroomNames:[],
    index_classroomNames:'',
    unit:{},
    myrecord:{},
    myrecord_index:"",
    interfaceUrl:"https://www.qimingclassroom.com/",
  }
})