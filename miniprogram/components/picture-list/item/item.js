// components/picture-list/item/item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    detail: Object,
    index: Number,
    showEdit: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  attached(){
    //console.log('detail', this.data.detail)
  },

  /**
   * 组件的方法列表
   */
  methods: {
    previewImage(e){
      this.triggerEvent('previewImage', e.currentTarget.dataset.index)
    },
    showEditEvent(e){
      this.triggerEvent('showEditEvent', e.currentTarget.dataset.index)
    },
    deleteImg(e){
      this.triggerEvent('deleteImg', e.currentTarget.dataset.id)
    },
    editHandle(e){
      this.triggerEvent('edit', e.currentTarget.dataset.id)
    },
    hideEdit(){
      this.triggerEvent('hideEdit', this)
    },
    recommendImg(e){
      this.triggerEvent('recommendImg', e.currentTarget.dataset.id)
    }
  }
})
