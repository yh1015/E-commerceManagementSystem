import {request} from './request'

export function getLogin(data) {
  return request({
    method: 'post',
    url: '/login',
    data,
  })
}