import {request} from '../request'

// 获取商品列表数据
export function getCateList() {
  return request({
    method: 'get',
    url: '/categories',
  })
}

// 获取商品动态参数列表
export function getParamsList(id,params) {
  return request({
    method: 'get',
    url: '/categories/' + id + '/attributes',
    params
  })
}

// 添加商品
export function addCommodity(data) {
  return request({
    method: 'post',
    url: '/goods',
    data
  })
}