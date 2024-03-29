import axios from 'axios'
// 导入nprogress 添加进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

export function request(config) {
  // 创建axios实例
  const instance = axios.create({
    // baseURL: 'https://www.liulongbin.top:8888/api/private/v1/',
    baseURL: 'http://www.ysqorz.top:8888/api/private/v1/',
    timeout: 5000
  })

  //请求拦截器 添加token,保证拥有获取数据的权限
  instance.interceptors.request.use(config => {
    NProgress.start();
    // 为请求头添加token验证Authorization字段
    config.headers.Authorization = window.sessionStorage.getItem('token');
    return config;
  })

  // 响应拦截器
  instance.interceptors.response.use(res =>{
    NProgress.done();
    return res.data
  }, err =>{
    console.log(err) 
  })
  return instance(config)
}
