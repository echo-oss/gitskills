// components/spu-preview/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: Object,
    type: String,
  },

  /**
   * 组件的初始数据
   */
  data: {
    tags: Array,
    data: null,
    baseUrl: null,

  },
  /**
   * 属性监听器
   */
  observers: {
    data: function (data) {
      if (!data) {
        return
      }

      if (!data.tags) {
        return;
      }
      const tags = data.tags.split('$'); //将标签字符串转换成数组

      this.setData({
        tags
      })

    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onImgLoad(event) {
      const {
        width,
        height
      } = event.detail
      this.setData({
        w: 340,
        h: 340 * height / width
      })
    },
    onItemTap(event) {
      // const pcode = event.currentTarget.dataset.pcode
      let pid = event.currentTarget.dataset.pid
      let pcode = event.currentTarget.dataset.pcode

      wx.navigateTo({
        url: `/pages/subpackages/mall/product/productDetail1/index?pid=${pid}&pcode=${pcode}&pagePath=HotProduct`
      })

    },

  }
})