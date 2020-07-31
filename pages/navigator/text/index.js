// pages/navigator/text/index.js
import {Article} from "../../../models/article";

import {CompanyRotationchart} from "../../../models/companyRotationchart";
import {ArticleModule} from "../../../models/articleModule";
import {ArticleType} from "../../../models/articleType";
import {AppModel} from "../../../models/app";
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TabCur:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  // onBanner(e) {
  //   console.log(e)
  //   let id = e.currentTarget.dataset.id
  //   wx.navigateTo({
  //     url: `/pages/subpackages/mall/activity/activityDetail/index?id=${id}&pagePath=CompanyRotationchart`,
  //   })
  // },

  onLoad: async function (options) {
    let obj={
      "EnterpriseID": app.config.EnterpriseID,
    }
    const banner=await CompanyRotationchart.Search(obj)
    const notice = await Article.GetTopArticle(obj)
    const grid = await ArticleModule.Search(obj)
    const nav = await ArticleType.Search(obj)
    console.log("grid="+grid)
    const noticeArr=[];
    if (notice){
      if (notice.Data){
        for (let i of notice.Data) {
          noticeArr.push(i.Title)
        }
      }

    }
    this.setData({
      banner,
      notice,
      noticeArr,
      grid,
      nav
    })
    this.tabSelectGetData()
  },
  tabSelect(e) {

    this.setData({
      TabCur: e.currentTarget.dataset.index,
    })
    this.tabSelectGetData()
  },

  async tabSelectGetData(){
    let data=this.data.nav.Data
    let index =this.data.TabCur;
    if(data.length>0){
      let obj = {
        "EnterpriseID": app.config.EnterpriseID,
        ArticleType: data[index].ID,
      }
      const articleModel = Article.PageSearch(obj)
      this.data.articleModel = articleModel //类属性
      const article = await articleModel.getMoreData();//todo
      this.setData({
        article: article
      })
    }
  },
  onBanner(e){
    console.log(e)
    let id = e.currentTarget.dataset.id;

    wx.navigateTo({
      url: `/pages/subpackages/mall/activity/activityDetail/index?id=${id}&pagePath=CompanyRotationchart`,
    })
  },
  onNoticeBar(e){
    let index = e.detail.index
    let notice = this.data.notice;
    let id = notice.Data[index].ID;

    wx.navigateTo({
      url: `/pages/subpackages/propaganda/article/articleDetail/index?id=${id}`,
    })
  },
  async onGrid(e){
    // 用户授权
    await AppModel.getSetting()
    let phone = wx.getStorageSync('phoneNumber')
    if(!phone){
      wx.showModal({
        title: '提示',
        content: '您还未登录是否现在登录',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.switchTab({
              url: '/pages/navigator/mine/index',
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      return
    }

    let id = e.currentTarget.dataset.id;
        wx.navigateTo({
          url: `/pages/subpackages/propaganda/article/articleList/index?ArticleType=${id}`,
        })
  },
  onCard(e){
    let id =e.currentTarget.dataset.id;
    console.log(id)
    wx.navigateTo({
      url: `/pages/subpackages/propaganda/article/articleDetail/index?id=${id}`,
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