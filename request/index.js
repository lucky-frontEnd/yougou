import request from './request'

// 1.轮播图数据
export function getSwiperData() {
  return request({
    url: '/home/swiperdata'
  })
}

// 2. 导航数据
export function getCatesData() {
  return request({
    url: '/home/catitems'
  })
}

// 3. 楼层数据
export function getFloorData(goods_id) {
  return request({
    url: '/home/floordata',
    data: goods_id
  })
}