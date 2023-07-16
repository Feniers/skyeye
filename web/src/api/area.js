import request from '@/utils/request'

export function sendWA(data) {
    return request({
        url: '/area/setarea',
        method: 'post',
        data
    })
}

export function addArea(data) {
    return request({
        url: '/area/savearea',
        method: 'post',
        data
    })
}

export function getAllArea(data) {
    return request({
        url: '/area/getallarea',
        method: 'post',
        data
    })
}

export function deleteArea(data) {
    return request({
        url: '/area/deletearea',
        method: 'post',
        data
    })
}

export function setPhoto(data) {
    return request({
        url: '/area/setphoto',
        method: 'post',
        data
    })
}

export function getToken(data) {
    return request({
        url: '/area/gettoken',
        method: 'post',
        data
    })
}