// components/spu-preview/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

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
    onImgLoad(event){
      const {width,height}=event.detail
      this.setData({
        w:340,
        h:340*height/width
      })
    }

  }
})