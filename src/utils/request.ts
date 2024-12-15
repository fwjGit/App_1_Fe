import axios from 'axios'
import router from '@/router/index'
import { apiKey } from '@/utils/utils'

let request = axios.create({
  timeout: 6000,
  headers: {},
  // adapter: ['fetch', 'xhr', 'http'],
})

// 请求拦截器封装
request.interceptors.request.use(
  (config) => {
    let { headers, url } = config

    // AI请求需要设置特定的请求头
    headers['Authorization'] =
      url?.search('AI') === -1 ? localStorage.getItem('token') : `Bearer ${apiKey}`
    headers['Content-Type'] =
      url?.search('AI') === -1 ? headers['Content-Type'] : 'application/json'

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    let { status, data } = response
    let { code, msg } = data
    if (status === 200) {
      switch (code) {
        case 200:
          return data
        case 401:
          location.href = 'http://localhost:5173'
          break
        default:
          // 其他状态码，可自行添加
          return data
      }
    } else {
      return response
    }
  },
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          location.href = 'http://localhost:5173'
          break
        case 404:
          // 跳转到 404 页面
          router.push('/404')
          break
        case 500:
          alert('服务器出现故障，请重试')
          break
        default:
          // 其他状态码，可自行添加
          break
      }
    } else {
      // 断网等情况
      // 例如在设置请求时使用了baseURL 而实际上并未联通，此时会进入此分支
      console.log('Please check your network!')
    }
    return Promise.reject(error)
  },
)

export default request
