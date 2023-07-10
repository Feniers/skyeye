import request from '@/utils/request'

export function register(data) {
    return request({
        url: '/user/add',
        // url:'',
        method: 'post',
        data
    })
}

