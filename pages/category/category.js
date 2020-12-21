// pages/category/category.js
import { getCategoryData } from '../../request/category'

Page({
  data: {
    leftMenuList: [], // 左侧的菜单数据
    rightContent: [], // 右侧的商品数据
    currentIndex: 0,
    scrollTop: 0
  },
  // 商品的返回数据
  Cates: [],
  onLoad: function (options) {
    /*
    1. 先判断一下本地存储中有没有数据
    2. 没有数据 直接发送请求
    3. 有旧的数据 同时 旧的数据耶没有过期, 就使用本地存储中的旧数据即可
    */ 
    
    // 1. 获取本地存储中的数据
    const Cates = wx.getStorageSync('cates')
    // 2.判断
    if(!Cates) {
      // 不存在 发送请求获取数据
      this._getCategoryData()
    }else {
      // 过期时间 10s
      if(Date.now() - Cates.time > 1000 * 10) {
        // 重新发送数据
        this._getCategoryData()
      }else {
        // 可以使用旧数据
        this.Cates = Cates.data;
        // 构造左侧的大菜单数据
        let leftMenuList = this.Cates.map(v => v.cat_name)
        // 构造右侧的商品数据
        let rightContent = this.Cates[0].children

        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }
  },
  _getCategoryData() {
    getCategoryData().then(res => {
      this.Cates = res

      // 把接口数据存入到本地存储中
      wx.setStorageSync('cates', {time:Date.now(), data: this.Cates})

      // 构造左侧的大菜单数据
      let leftMenuList = this.Cates.map(v => v.cat_name)
      // 构造右侧的商品数据
      let rightContent = this.Cates[0].children

      this.setData({
        leftMenuList,
        rightContent
      })
    })
  },
  leftMenuListClick(event) {
    const index = event.currentTarget.dataset.index;
    let rightContent = this.Cates[index].children
    this.setData({
      currentIndex: index,
      rightContent,
      scrollTop: 0
    })
  }
})