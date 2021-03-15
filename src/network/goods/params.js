import {request} from '../request'

// 权限菜单请求
export function getCateList() {
  return request({
    method: 'get',
    url: '/categories',
  })
}

// 获取参数列表
export function getParamsList(id,params) {
  return request({
    method: 'get',
    url: '/categories/'+ id + '/attributes',
    params
  })
}

// 添加动态参数或者静态参数
export function addParams(id,data) {
  return request({
    method: 'post',
    url: '/categories/'+ id + '/attributes',
    data
  })
}

// 根据id查询参数
export function getParamsById(id,attrId,params) {
  return request({
    method: 'get',
    url: '/categories/'+ id + '/attributes/' + attrId,
    params
  })
}

// 编辑提交参数
export function putParams(id,attrId,data) {
  return request({
    method: 'put',
    url: '/categories/'+ id + '/attributes/' + attrId,
    data
  })
}

// 删除参数
export function deleteParams(id,attrId) {
  return request({
    method: 'delete',
    url: '/categories/'+ id + '/attributes/' + attrId,
  })
}