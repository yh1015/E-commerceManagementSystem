import {request} from './request'

// 权限菜单请求
export function getPermissionMenus() {
  return request({
    method: 'get',
    url: 'menus',
  })
}
 