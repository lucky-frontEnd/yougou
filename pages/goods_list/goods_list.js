// pages/goods_list/goods_list.js
import { getGoodsData } from '../../request/goods'

Page({
  data: {
    tabs: [
      {
        id: 0,
        value: "综合",
        isActive: true
      },
      {
        id: 1,
        value: "销量",
        isActive: false
      },
      {
        id: 2,
        value: "价格",
        isActive: false
      }
    ],
    goodsList: []
  },
  // 接口要的参数
  QueryParams: {
    query: "",
    cid: "",
    pagenum: "",
    pagesize: 10
  },
  totalPages: 1,
  onLoad: function (options) {
    this.QueryParams.cid = options.cid;

    this._getGoodsList()

  },
  // 获取商品列表数据
  _getGoodsList() {
    getGoodsData().then(res => {
      // 获取 总条数
      const total = res.total
      // 计算总页数
      this.totalPages = Math.ceil(total/this.QueryParams.pagesize)
      this.setData({
        goodsList: [...this.data.goodsList, ... res.goods]
      })
    })

    // 关闭下拉按钮
    wx.stopPullDownRefresh()
  },
  handleTabsItemChange(e) {
    const {index} = e.detail
    let {tabs} = this.data
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false)
    this.setData({
      tabs
    })
  },
  onReachBottom() {
    // 判断有没有下页数据
    if(this.QueryParams.pagenum >= this.totalPages) {
      wx.showToast({ title: '没有下一页数据了' })
    }else {
      this.QueryParams.pagenum++;
      this._getGoodsList()
    }
  },
  // 下拉刷新
  onPullDownRefresh() {
    // 重置数组
    this.setData({
      goodsList: []
    })
    // 重置页码
    this.QueryParams.pagenum = 1
    // 发送请求
    this._getGoodsList()
  }
})