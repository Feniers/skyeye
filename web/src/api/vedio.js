import request from '@/utils/request'

//文件目录显示
export function directory(data) {
    return request({
        url: '/directory',
        method: 'post',
        data
    })
}

//url获取
export function getUrl(data) {
    return request({
        url: '/url',
        method: 'post',
        data
    })
}