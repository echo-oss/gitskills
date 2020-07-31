// pages/subpackages/text/grid/index.js
import {Article} from "../../../../models/article";
const app=getApp()
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
     this.data.ArticleType=options.ArticleType
    // let obj={
    //   "EnterpriseID":app.config.EnterpriseID,
    //   ArticleType
    // }
    // const articleModel=Article.PageSearch(obj)
    // this.data.article=acticleModel
    // const article=await articleModel.getMoreData()
    //
    // this.setData({
    //   article,
    // })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: async function () {
    const ArticleType=this.data.ArticleType
    let obj={
      "EnterpriseID":app.config.EnterpriseID,
      ArticleType
    }
    const articleModel=Article.PageSearch(obj)
    this.data.articleModel=articleModel
    const article=await articleModel.getMoreData()

    this.setData({
      article,
    })

  },
  onCardItem(e) {
    let id = e.currentTarget.dataset.id;
    console.log(id)
    wx.navigateTo({
      url: `/pages/subpackages/propaganda/article/articleDetail/index?id=${id}`,
    })
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