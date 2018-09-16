import axios from 'axios'
import qs from 'qs';
import {address} from 'api/config'
//建立一个单独的fetch.js封装axios请求并作为方法暴露出来
// 创建axios实例
const service = axios.create({
  // baseURL: process.env.API_HOST,
  baseURL: address,
  timeout: 10000,
  withCredentials: true
})

// request拦截器
service.interceptors.request.use(
  config => {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    if(config.method === 'post' || config.method === 'delete' || config.method === 'put') {
        config.data = qs.stringify({
          ...config.data
        })
    }
    return config
  },
  error => {
    // 错误处理代码
    return Promise.reject(error)
  }
)

// response拦截器
service.interceptors.response.use(
  response => {
    // 数据响应之后，要做的业务
    return response
  },
  error => {
    return Promise.reject(error)
  }
)

export default service