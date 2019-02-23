// pages/feedback/feedback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productInfo:{},
  
  },
  //添加Banner  
  bindChooiceProduct: function () {
    var that = this;

    wx.chooseImage({
      count: 3,  //最多可以选择的图片总数  
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
        var tempFilePaths = res.tempFilePaths;
        //启动上传等待中...  
        wx.showToast({
          title: '正在上传...',
          icon: 'loading',
          mask: true,
          duration: 10000
        })

        var uploadImgCount = 0;

        for (var i = 0, h = tempFilePaths.length; i < h; i++) {
          wx.uploadFile({
            url: getApp().globalData.interfaceUrl+'Home/UploadFileNew',
            filePath: tempFilePaths[i],
            name: 'uploadfile_ant',
            formData: {
              recordUID: getApp().globalData.myrecord[getApp().globalData.myrecord_index].DBClassroomApplicationRecord_ID              
            },
            header: {
              "Content-Type": "multipart/form-data"
            },
            success: function (res) {
              console.log("你没有运行咧");
              console.log(res.data);
              uploadImgCount++;
              var data = JSON.parse(res.data);
              
              //服务器返回格式: { "Catalog": "testFolder", "FileName": "1.jpg", "Url": "https://test.com/1.jpg" }  
              var productInfo = that.data.productInfo;
              if (productInfo.bannerInfo == null) {
                productInfo.bannerInfo = [];
              }
              productInfo.bannerInfo.push({
                "catalog": data.Catalog,
                "fileName": data.FileName,
                "url": data.Url
              });
              that.setData({
                productInfo: productInfo
              });
              console.log(that.data.productInfo);
              console.log("我要地址：");
              console.log(that.data.productInfo.bannerInfo)

              //如果是最后一张,则隐藏等待中  
              if (uploadImgCount == tempFilePaths.length) {
                wx.hideToast();
              }
            },
            fail: function (res) {
              wx.hideToast();
              wx.showModal({
                title: '错误提示',
                content: '上传图片失败',
                showCancel: false,
                success: function (res) { }
              })
            }
          });
        }
      }
    });
  },

  backtopersoninfo:function(){
    wx.switchTab({
      url: '../personInfo/personInfo',
    })
  }  


  
})