import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function checkToken() {
  return request({
    url: '/user/check_token',
    method: 'post',
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post',
  })
}

//分页查询
export function index(data) {
  return request({
    url: '/user/index',
    method: 'post',
    data
  })
}

//根据id获取用户信息
export function getInfoById(data) {
  return request({
    url: '/user/update',
    method: 'post',
    data
  })
}

//修改用户信息
export function changeUser(data) {
  return request({
    url: '/user/update',
    method: 'put',
    data
  })
}

//删除
export function deleteUser(data) {
  return request({
    url: '/user/delete',
    method: 'delete',
    data
  })
}