import {request} from './request'

export function getOrderList(params) {
  return request({
    method: 'get',
    url: '/orders',
    params
  })
}