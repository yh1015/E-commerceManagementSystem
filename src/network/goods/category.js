import {request} from '../request'

// 权限菜单请求
export function getCategory(params) {
  return request({
    method: 'get',
    url: '/categories',
    params
  })
}

// 获取父级分类的数据列表
export function getParentCategory() {
  return request({
    method: 'get',
    url: '/categories',
    params: {type: 2}
  })
}

// 添加用户商品
export function addParentCategory(data) {
  return request({
    method: 'post',
    url: '/categories',
    data
  })
}

// 根据id获取商品
export function getCategoryById(id) {
  return request({
    method: 'get',
    url: '/categories/' + id,
  })
}

// 编辑商品分类
export function putCategoryById(id,data) {
  return request({
    method: 'put',
    url: '/categories/' + id,
    data
  })
}

// 删除商品分类
export function deleteCategoryById(id) {
  return request({
    method: 'delete',
    url: '/categories/' + id,
  })
}