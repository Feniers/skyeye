import request from '@/utils/request'

export function addUser(data) {
    return request({
        url: '/user/add',
        method: 'post',
        data
    })
}

