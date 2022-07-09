// 封装axios请求
import theAxios from 'axios'
// import $ from 'ajax'
const axios = theAxios.create({
  baseURL: 'http://toutiao.itheima.net', // 请求根路径
  timeout: 5000// 5秒超时时间
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
