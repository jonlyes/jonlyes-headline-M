// 封装axios请求
import theAxios from 'axios'
import router from '@/router'
import { Notify } from 'vant'
import { getToken } from '@/utils/token'
// import $ from 'ajax'
const axios = theAxios.create({
  baseURL: 'http://toutiao.itheima.net/', // 请求根路径
  timeout: 10000// 10秒超时时间
})

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 注意：使用可选链，如果谷歌的版本低于80或者要做兼容，需要安装 @babel/plugin-proposal-optional-chaining 这个依赖包
  if (getToken()?.length > 0 && config.headers.Authorization === undefined) {
    config.headers.Authorization = `Bearer ${getToken()}`
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  if (error.response.status === 401) {
    Notify({
      type: 'warning',
      message: '您的身份已过期，请重新登录'
    })
    router.replace('/login')
  }
  return Promise.reject(error)
})

export default ({ url, method = 'GET', data = {}, params = {}, headers = {} }) => {
  return axios({
    url,
    method,
    data,
    params,
    headers
  })
//  ajax的封装
//   return new Promise((resolve, reject) => {
//     $.ajax({
//       url,
//       method,
//       // 判断params是否有值，有值就进行url拼接,目前用axios,以后用到Ajax需要再封装
//       data,
//       headers,
//       success: (res) => { resolve(res) },
//       error: (err) => { reject(err) }
//     })
//   })
}
