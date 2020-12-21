import { requestPayment } from "../../utils/asyncWx.js";
import request from "../../request/request";
import regeneratorRuntime from "../../lib/runtime/runtime";

Page({
  data: {
    address: {},
    cart: [],
    totalPrice: 0,
    totalNum: 0,
  },
  onShow() {
    // 1 获取缓存中的收货地址信息
    const address = wx.getStorageSync("address");
    // 1 获取缓存中的购物车数据
    let cart = wx.getStorageSync("cart") || [];

    // 过滤后的购物车数组
    cart = cart.filter((v) => v.checked);
    this.setData({ address });

    // 1 总价格 总数量
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach((v) => {
      totalPrice += v.num * v.goods_price;
      totalNum += v.num;
    });
    this.setData({
      cart,
      totalPrice,
      totalNum,
      address,
    });
    // let pages=getCurrentPages()
    // let currentpage=pages[pages.length-1].options
    // console.log(currentpage)
    // const {type}=currentpage
    // this.handleOrderPay(type)
    // wx.setStorageSync('token', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo')
    // const token=wx.getStorageSync("token")
    // if(!token){wx.navigateTo({
    //   url: '/pages/auth/index',
    // });return}
  },
  async handleOrderPay(e) {
    // // 判断缓存中是否有token
    // const token = wx.getStorageSync("token")
    wx.setStorageSync(
      "token",
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"
    );
    const token = wx.getStorageSync("token");
    if (!token) {
      wx.navigateTo({
        url: "/pages/auth/auth",
      });
      return;
    }
    // console.log(token)
    // if(!token) {
    //   wx.navigateTo({
    //     url: '/pages/auth/auth'
    //   });
    //   return
    // }
    // 创建订单
    const header = { Authorization: token };
    const order_price = this.data.totalPrice;
    const consignee_addr = this.data.address.all;
    const cart = this.data.cart;
    let goods = [];
    cart.forEach((v) =>
      goods.push({
        goods_id: v.goods_id,
        goods_number: v.num,
        goods_price: v.goods_price,
      })
    );
    const orderParams = { order_price, consignee_addr, goods };
    // 准备发送请求 创建订单 获取订单编号
    const order_number = await request({
      url: "/my/orders/create",
      methods: "POST",
      data: orderParams,
      header,
    });
    console.log(order_number);
    // 发起 预支付的接口
    // const {pay} = await request({
    //       url: '/my/orders/req_unifiedorder',
    //       methods: "POST",
    //       data: {order_number}
    // })
    //   // 发起微信支付
    // const res = await requestPayment(pay)
    // console.log(res)
  },
});
