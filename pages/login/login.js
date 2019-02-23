
Page({

  data:{
    canIUse: wx.canIUse('button.open-type.getUserInfo')

  },


  onLoad: function () {
    
    wx.login({//login流程
      success: function (res) {//登录成功
        if (res.code) {
          var code = res.code;

          wx.getSetting({
            success: res2 => {
              console.log("你什么时候运行？")



              if (res2.authSetting['scope.userInfo']) {
                // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                console.log("你什么时候gmf运行？")
                wx.getUserInfo({
                  success: res2 => {
                    console.log(res2);

                    
                    // 可以将 res 发送给后台解码出 unionId
                    getApp().globalData.userInfo = res2.userInfo;
                    // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                    // 所以此处加入 callback 以防止这种情况
                    
                    // if (this.userInfoReadyCallback) {
                    //   this.userInfoReadyCallback(res)
                    // }
                    if (code) {
                      wx.request({
                        url: getApp().globalData.interfaceUrl + 'Home/getOpenid?js_code=' + code + "&User_Name=" + res2.userInfo.nickName,
                        header: { 'Content-Type': 'application/json' },
                        success(res3) {                          
                          

                          console.log("获取openid:" + res3.data.Result);

                          console.log("获取用户：" + res2.userInfo.nickName);

                        }
                      })

                    }

                    wx.navigateTo({
                      url: '../borrowNotes/borrowNotes',
                    })
                  }
                })
              }
            }
          })
        

        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });

    


  },
  tosys:function(){
    wx.navigateTo({
      url: '../borrowNotes/borrowNotes',
    })
  }
})













