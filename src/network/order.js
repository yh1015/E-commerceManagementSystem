import {request} from './request'

// 获取订单列表
export function getOrderList(params) {
  return request({
    method: 'get',
    url: '/orders',
    params
  })
}

// 获取物流进度信息
export function getLogisticsList() {
  return request({
    method: 'get',
    // url: '/kuaidi/804909574412544580',
    url: '/kuaidi/1106975712662',
  })
}