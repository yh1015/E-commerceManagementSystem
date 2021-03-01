import axios from 'axios'

export function request(config) {
  // 创建axios实例
  const instance = axios.create({
    // baseURL: 'https://www.liulongbin.top:8888/api/private/v1/',
    baseURL: 'http://www.ysqorz.top:8888/api/private/v1/',
    timeout: 5000
  })

  // 响应拦截器
  instance.interceptors.response.use(res =>{
    return res.data
  }, err =>{
    console.log(err) 
  })
  return instance(config)
}
