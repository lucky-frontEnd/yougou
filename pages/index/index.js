// pages/index/index.js
import { 
        getSwiperData,
        getCatesData,
        getFloorData
} from '../../request/index'

Page({
  data: {    
    swiperList: [], // 轮播图
    catesList: [],  // 导航数组
    floorList: []   // 楼层数组
  },
  onLoad: function(options) {
    // 1.发送异步请求获取轮播图数据
    this._getSwiperData()

    // 2. 获取导航数据
    this._getCatesData()

    // 3. 楼层数据
    this._getFloorData()
  },

  // -------------------------网络请求相关函数---------------------
  _getSwiperData() {    
    getSwiperData().then(res => {
      this.setData({
        swiperList: res
      })
    })
  },
  _getCatesData() {
    getCatesData().then(res => {
      this.setData({
        catesList: res
      })
    })
  },
  _getFloorData() {
    getFloorData().then(res => {
      this.setData({
        floorList: res
      })
    })
  }
})