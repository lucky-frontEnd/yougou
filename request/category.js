import request from './request'

export function getCategoryData() {
  return request({
    url: '/categories'
  })
}
