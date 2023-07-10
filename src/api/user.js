import request from '@/utils/request'

export function login(data) {
  return request({
    // url: '/uer/login',
    url: '',
    method: 'post',
    data
  })
}