// pages/subpackages/text/notice/index.js
import {Article} from "../../../../models/article";

const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLoading:true,
    article:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    let scene = options.scene
    let id = 0
    let GUID = null
    if (scene) {
      scene = decodeURIComponent(scene);
      id = scene.id
      GUID = scene.GUID
    } else {
      id = options.id
    }
    const FromPerson = app.globalData.SharOpenID
    const OpenID = wx.getStorageSync('OpenID')
    let obj = {
      "ID": id,
      EnterpriseID: app.config.EnterpriseID,
      GUID,
      ReadPerson: OpenID,
      FromPerson
  
    }
    Article.UpdateReadAmount(obj)
    const articleModule = await Article.SearchModelDetails(id)
    this.setData({
      articleModel: articleModule,
      id
    })
    let result = app.towxml(articleModule.Content,"markdown",{
  
      events: { // 为元素绑定的事件方法
        tap: (e) => {
          console.log('tap1', e);
          let data = e.currentTarget.dataset.data
          if (data.tag == 'img') {
            var currentImage = data.attr.src
            var imageList = []
            imageList.push(currentImage)
  
            wx.previewImage({
              urls: imageList,
              current: currentImage
            })
          }
  
  
        }
      }
    })
    this.setData({
      article:result,
      isLoding:false
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
  onGotoHome(){

    wx.switchTab({
      url: "/pages/navigator/text/index",
    })
  },
  onGotoCart(){
    wx.navigateTo({
      url: `/pages/subpackages/mall/company/staffList/index?pagePath=article&ClassID=${this.data.articleModel.ArticleType}`,
    })
  }
})