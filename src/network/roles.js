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

// 添加角色
export function addRoles(data) {
  return request({
    method: 'post',
    url: '/roles',
    data
  })
}

//根据id查询角色 
export function getRolesById(id) {
  return request({
    method: 'get',
    url: '/roles/' + id,
  })
}

// 编辑角色
export function putRoles(id,data) {
  return request({
    method: 'put',
    url: '/roles/' + id,
    data
  })
}

// 删除角色
export function removeRoles(id) {
  return request({
    method: 'delete',
    url: '/roles/' + id,
  })
}