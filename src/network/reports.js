import {request} from './request'

export function getReportsList(data) {
  return request({
    method: 'get',
    url: '/reports/type/1',
    data,
  })
}