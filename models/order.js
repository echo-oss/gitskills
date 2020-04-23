import {
  Http
} from "../utils/http-a";
import {
  Paging
} from "../utils/paging";

class Order extends Http {

  /**产品接口 */
  // 添加(小程序)
  static Add({
    OpenId,
    EnterpriseID,
    ProductCount,
    RealName,
    TelPhone,
    Address,
    OrderPrice,
    PayPrice,
    Integra,
    IntegraPrice,
    LogisticsFee,
    Remark,
    DeliveryModel,
    OrderDetailListModel,
    OrderCouponListModel,
  }) {
    return Http.request({
      url: "api/V1/Order/Add",
      data: {
        OpenId,
        EnterpriseID,
        ProductCount,
        RealName,
        TelPhone,
        Address,
        OrderPrice,
        PayPrice,
        Integra,
        IntegraPrice,
        LogisticsFee,
        Remark,
        DeliveryModel,
        OrderDetailListModel,
        OrderCouponListModel,
      }
    })
  }
/**
 * 4. 查询
 * Status	是	int	订单状态（0:未付款,1:已付款,2:已发货,3:已签收,4:退货申请,5:退货中,6:已退货,7:后台关闭,8:用户取消,:-1:全部）
 */
  static QueryForWx({ OpenId, EnterpriseId, OrderNo, Status,Page,Limit}) {
    return new Paging({
      url: `api/V1/Order/QueryForWx`,
      data: {
        OpenId,
        EnterpriseId,
        OrderNo,
        Status
      }
    }, Page, Limit)
  }

  //根据订单id查询详情（小程序）
  static DetailByOrderIdForWx({ID}) {
    return Http.request({
      url: "api/V1/Order/DetailByOrderIdForWx",
      data: {
        ID
      }
    })
  }

  //修改地址信息（小程序）
  static SearchRotationChart({ ID, RealName, TelPhone, Address}) {
    return Http.request({
      url: "api/V1/Order/ChangeAddress",
      data: {
        ID,
        RealName,
        TelPhone,
        Address
      }
    })
  }
  //取消订单(小程序)
  static CancelOrder({ ID }) {
    return Http.request({
      url: "api/V1/Order/CancelOrder",
      data: {
        ID
      }
    })
  }
  //修改支付信息(小程序)
  static EditPayInfo({ OrderNo, PayChannel, TradeNo}) {
    return Http.request({
      url: "api/V1/Order/EditPayInfo",
      data: {
        OrderNo,
        PayChannel,
        TradeNo
      }
    })
  }
  //确认收货(小程序)
  static Receipt({ OrderNo }) {
    return Http.request({
      url: "api/V1/Order/Receipt",
      data: {
        OrderNo
      }
    })
  }
  //删除订单（小程序）
  static Delete({ OrderNo }) {
    return Http.request({
      url: "api/V1/Order/Delete",
      data: {
        OrderNo
      }
    })
  }
  //核销订单（小程序）
  static WriteOff({ OrderNo, OperatPerson, OperatPersonName}) {
    return Http.request({
      url: "api/V1/Order/WriteOff",
      data: {
        OrderNo,
        OperatPerson,
        OperatPersonName
      }
    })
  }

}

export {
  Order
}