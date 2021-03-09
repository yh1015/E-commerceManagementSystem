import { request } from './request'

// 获取权限列表
export function getRolesList() {
  return request({
    method: 'get',
    url: '/roles',
  })
}