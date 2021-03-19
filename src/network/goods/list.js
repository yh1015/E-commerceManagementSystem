import {request} from '../request'

// 获取商品列表数据
export function getGoodsList(params) {
  return request({
    method: 'get',
    url: '/goods',
    params
  })
}

// 删除商品
export function deleteGoods(id) {
  return request({
    method: 'delete',
    url: '/goods/' + id,
  })
}

// 根据ID查询商品
export function getGoodsListById(id) {
  return request({
    method: 'get',
    url: '/goods/' + id,
  })
}