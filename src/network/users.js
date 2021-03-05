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
export function editUserInfo(data,params) {
  return request({
    method: 'put',
    url: '/users/'+data,
    params
  })
}