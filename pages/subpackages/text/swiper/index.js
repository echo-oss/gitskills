// pages/subpackages/text/swiper/index.js
import {CompanyRotationchart} from "../../../../models/companyRotationchart";
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
  let id = options.id
    let pagePath=options.pagePath
    switch (pagePath) {
      case 'CompanyRotationchart':
      {var Model = await CompanyRotationchart.SearchModelDetails(id) };break;
      case 'CompanyRotationchart':
      {var Model = await CompanyRotationchart.SearchModelDetails(id)};break;
      case 'CompanyRotationchart':
        {var Model = await CompanyRotationchart.SearchModelDetails(id)};break;
      default:
        wx.showToast({
          title: '即将开放尽情期待',
          icon:'none'
        })
    }
    this.setData({
      ModelData:Model,
    })
    let result = app.towxml(Model.Content, 'markdown', {
      // base: 'https://xxx.com',             // 相对资源的base路径
      // theme: 'dark',                   // 主题，默认`light`
      events: {                    // 为元素绑定的事件方法
        tap: (e) => {
          console.log('tap', e);
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
    // 更新解析数据
    this.setData({
      article: result,
      isLoading: false
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

  }
})