// 配置项
const config = {
  /** 正式地址*/
  // "apiBaseUrl": 'https://qy.gzchinaunion.com/',
  // "EnterpriseID": "2645",//金朵正式 wxadb9c5292f70762a
  // "EnterpriseID": "4981",//益清正式 wxdc90f597804fb320
  // "EnterpriseID": "3063",//融汇正式 wx9b9444c94ae8a071
  // "EnterpriseID": "8343",//婚庆公司 wxf857e7c332c7ed04
  // "EnterpriseID": "9446",//天津乖乖宠物医院 wx98e3d124373d212f
  // "EnterpriseID": "3532",//汽车美容  wx9c425df6d5ecb7ac
  // "EnterpriseID": "3478",//雅儿口腔医疗 wxf1bdc7db5abe5aea
  // "EnterpriseID": "7720",//伊美尔连锁整形美容 wx2e8e4434a39d3508
  // "EnterpriseID": "6236",//天津明朗广告传媒有限公司 wx999fb45b6c67c707
  // "EnterpriseID": "2016",//果资律师 wxbf16fb811554d7c4
  // "EnterpriseID": "1824",//杜尚美术 wxd761439fbf570705
  // "EnterpriseID": "",//杨秸秆 wx163a906af5fc7211

  /** 测试地址*/
  "apiBaseUrl": 'https://company.gzchinaunion.com/',
  "EnterpriseID": "9646", //wxa93d39f1484ac31a
  // "EnterpriseID": "6075", //wxbf16fb811554d7c4大帅
  // "EnterpriseID": "1276", //wx999fb45b6c67c707小孟
  /** test测试地址*/
  // "apiBaseUrl": 'https://test.gzchinaunion.com/',
  // "EnterpriseID": "4981", //wx2e8e4434a39d3508
}
const tips = {
  //基础Http请求码 
  "1": '服务繁忙,请稍后再试',
  "500": '内部请求出错',
  "600.1": '数据已存在',
  "600.2": '输入数据格式不正确',
  "600.3": '参数错误',
  "600.4": '输入数据大小不正确',
  "600.5": '输入数据顺序不正确',
  "600.6": '数据不可删除',
  "600.7": ' 轮播图个数超出',
  "600.8": ' 空数据',
  "660.1": ' 数据操作失败',
  "999.9": ' 请求头错误',
  //HttpLoginStateCode
  "700.1": '用户名或密码不存在',
  "700.2": '账号已被冻结',
  "700.3": '企业不存在',
  //HttpCustomersStateCode
  "800.1": '企业还未配置小程序账号',
  //HttpStaffStateCode
  "900.1": '手机号已存在',
  "900.2": '员工编码已存在',

  /// 平台类接口返回定义


  "1050.5": ' 参数有误',

  "1301.3": ' 剩余数量不足',
  "1301.4": ' 今日已领取',
  "1301.5": ' 不能重复领取',

  /// 订单和支付相关的数据校验
  "1303.0": ' 产品下架或者删除无法进行购买',
  "1303.1": ' 产品下架或者删除无法进行购买',
  "1303.2": ' 优惠券已经使用',
  "1303.3": ' 积分不足无法抵扣',
  "1303.4": ' 产品价格异常',
  "1303.5": ' 产品库存不足',
  "1303.6": ' 产品发生改变',
  "1303.7": ' 数据补偿时二次提交',
  "1303.8": ' 商家不存在物流规则',
  "1303.9": ' 单品物流数据不匹配',
  "1303.10": ' 商家物流数据不匹配',
  //logisticsShopStatus
  "1304.1": ' 校验城市是否已经存在',
}



// 配置文件es6导出
export {
  config,
  tips,
}