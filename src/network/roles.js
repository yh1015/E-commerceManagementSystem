import { request } from './request'

// 获取权限列表
export function getRolesList() {
  return request({
    method: 'get',
    url: '/roles',
  })
}

// 删除用户权限
export function deleteRoles(data,id) {
  return request({
    method: 'delete',
    url: '/roles/' + data + '/rights/' + id,
  })
} 

// 获取所有权限列表
export function getRightsList() {
  return request({
    method: 'get',
    url: '/rights/tree',
  })
}

// 角色授权
export function putRights(params,data) {
  return request({
    method: 'post',
    url: '/roles/' + params + '/rights',
    data
  })
}