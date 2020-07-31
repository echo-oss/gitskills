// pages/navigator/text/index.js
import {Article} from "../../../models/article";

import {CompanyRotationchart} from "../../../models/companyRotationchart";
import {ArticleModule} from "../../../models/articleModule";
import {ArticleType} from "../../../models/articleType";
import {AppModel} from "../../../models/app";
import {Company} from "../../../models/company";
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TabCur:0,
    loading:true
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
    wx.showShareMenu({
      withCredentials:true,
      menus:['shareAppMessage','shareTimeline']
    })
  },
  async onLocation(){
    wx.showToast({
      title:'加载中',
      mask:true,
      icon:null
    })
    const company=await Company.SearchModelDetails(app.config.EnterpriseID)
    wx.setStorageSync('shopInfo', company)
    setTimeout(function () {
      wx.hideToast()
    },1000)
    AppModel.getSetting().then(res=>{
      return AppModel.getUserLocation()
    }).then(
        res=>{
         wx.openLocation({
            latitude:company.Latitude,
            longitude:company.Longitude,
            scale:16,
            name:company.CompanyName,
            address: company.Address,
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
          })
        }
    )
    // 用户授权
  },

  async initAllData(){
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
      nav,
      loading:false,
      shopInfo:wx.getStorageSync('shopInfo')
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
      url: `/pages/subpackages/text/swiper/index?id=${id}&pagePath=CompanyRotationchart`,
    })
  },
  onNoticeBar(e){
    let index = e.detail.index
    let notice = this.data.notice;
    let id = notice.Data[index].ID;

    wx.navigateTo({
      url: `/pages/subpackages/text/notice/index?id=${id}`,
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
          url: `/pages/subpackages/text/grid/index?ArticleType=${id}`,
        })
  },
  onCard(e){
    let id =e.currentTarget.dataset.id;
    console.log(id)
    wx.navigateTo({
      url: `/pages/subpackages/text/notice/index?id=${id}`,
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
    this.initAllData()
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
      this.initAllData()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: async function () {

    const data = await this.data.articleModel.getMoreData();
    console.log(data)
    if (!data) {
      this.setData({
        loadingType: 'end'
      })
      return
    } else {
      this.setData({
        loadingType: 'loading'
      })
    }
    this.setData({
      article: data
    })

    if (!data.moreData) {
      this.setData({
        loadingType: 'end'
      })

    }

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    let OpenID = wx.getStorageSync('OpenID')
    let url = encodeURIComponent('/pages/navigator/text/index');
    return {
      title: "详情",
      path: `/pages/navigator/text/index?url=${url}&SharOpenID=${OpenID}&SharType=index`
    }
  },
})