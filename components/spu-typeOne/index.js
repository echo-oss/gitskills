// components/spu-typeOne/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    spu: Object,
    startTime:String,
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap(event){
      let spu = this.properties.spu
      // wx.navigateTo({
      //   url: `/pages/subpackages/mall/product/productDetailTypeOne/index?id=${spu.ID}`,
      // })
      this.triggerEvent('tapping',spu)
    },
    onRight(event){
      let spu = this.properties.spu
      // wx.navigateTo({
      //   url: `/pages/subpackages/mall/product/orderTypeOne/index?id=${spu.ID}`,
      // })
      this.triggerEvent('tappingRight',spu)
    }

  }
})
