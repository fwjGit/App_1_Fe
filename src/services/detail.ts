import request from '../utils/request'

// 查询用户名
export const queryUserName = function () {
  return request.get('/api/queryUserName')
}

// 退出登录
export const logout = function () {
  return request.get('/api/logout')
}

// 查询路由表
export const getRoutes = function () {
  return request.get('/api/getRoutes')
}
