const app = getApp()
import {HotelRoomType} from "../../../../../models/hotelRoomType";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    StartValidityTime:null,
    EndValidityTime:null,
    selectDay:null,//选中的日期天数
    TotalRoom:1,
    OrderMoney:0,
    PayMoney:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let obj=JSON.parse(options.obj)
    this.setData({
      id:obj.ID,
      StartValidityTime:obj.StartValidityTime,
      EndValidityTime: obj.EndValidityTime,
      selectDay:obj.selectDay
    })
    this.WxValidate = app.WxValidate({
      name: {
        required: true,
      },
      phone: {
        required: true,
        tel: true
      },
      number: {
        required: true,
      },
    }, {
      name: {
        required: '请输入姓名',
      },
      phone: {
        required: '请输入手机号',
      },
      number: {
        required: '请输入房间数',
      }
    })


    this.initData()
    this.initDataAll()
  },
  async initData() {
    let StartValidityTime= app.util.tsFormatTime(this.data.StartValidityTime,'YMD')
    let EndValidityTime= app.util.tsFormatTime(this.data.EndValidityTime,'YMD')
    let obj = {
      ID: this.data.id,
      StartValidityTime,
      EndValidityTime,
      TotalDay: this.data.selectDay,
      TotalRoom: this.data.TotalRoom
    }
    const order = await HotelRoomType.PageSearchOrderWX(obj)
    this.setData({
      order,
      OrderMoney:order.TotalMoney.toFixed(2),
      PayMoney:order.TotalMoney.toFixed(2),
    })
   
  },
  async initDataAll() {
    const roomData = await HotelRoomType.PageSearchProperty(this.data.id)
    this.setData({
      roomData,
    })

  },
  onRoomNumber(e){
    console.log(e)
    let value=e.detail.value
    if(value){
      this.data.TotalRoom=value
      this.initData()
    }

  },
  async formSubmit(e) {
    const params = e.detail.value

    // 传入表单数据，调用验证方法
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0];
      wx.showToast({
        title: error.msg,
        icon: 'none',
        duration: 2000
      });
      return false
    }
    let {
      name,
      phone
    } = e.detail.value
    let OpenID = wx.getStorageSync('OpenID')

    let StartValidityTime= app.util.tsFormatTime(this.data.StartValidityTime,'YMD')
    let EndValidityTime= app.util.tsFormatTime(this.data.EndValidityTime,'YMD')
    let obj = {
      EnterpriseID: app.config.EnterpriseID,
      HotelRoomTypeId: this.data.id,
      OpenID: OpenID,
      Name: name,
      Phone: phone,
      TotalRoom: this.data.TotalRoom,
      TotalDay: this.data.selectDay,
      StartValidityTime,
      EndValidityTime,
      OrderMoney: this.data.OrderMoney,
      PayMoney: this.data.PayMoney
    }
    const order = await HotelRoomType.HotelPayOrder(obj)
    if (order){
      wx.navigateTo({
        url: '/pages/subpackages/mall/product/orderListTypeOne/index',
      })
    }

  }
})