import { request } from './request'

// 获取用户列表
export function getUsers(params) {
  return request({
    method: 'get',
    url: '/users',
    params
  })
}
// 修改用户状态
export function updataUser(params) {
  return request({
    method: 'put',
    url: '/users'+ params,
  })
}

// 添加用户
export function addUser(data) {
  return request({
    method: 'post',
    url: '/users',
    data
  })
}

// 根据id请求用户数据
export function getUserInfo(params) {
  return request({
    method: 'get',
    url: '/users/'+params,
  })
}

// 根据修改用户数据
export function editUserInfo(params,data) {
  return request({
    method: 'put',
    url: '/users/'+ params,
    data
  })
}

// 删除用户
export function deleteUserInfo(params) {
  return request({
    method: 'delete',
    url: '/users/'+ params,
  })
}

// 展示角色列表
export function getRoles() {
  return request({
    method: 'get',
    url: '/roles',
  })
}

// 分配用户角色
export function putRoles(id,data) {
  return request({
    method: 'put',
    url: '/users/' + id + '/role',
    data
  })
}