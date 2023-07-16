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

export function getIRs(data) {
    return request({
        url: '/record/all',
        method: 'post',
        data
    })
}

export function uploadUrl(data) {
    return request({
        url: '/save',
        method: 'post',
        data
    })
}

export function deleteUrl(data) {
    return request({
        url: '/delete',
        method: 'post',
        data
    })
}