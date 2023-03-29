import request from '@/utils/request'

export default {
    addAddress(obj) {
        return request({
            url: '/address/add',
            method: 'post',
            data: obj
        })
    },
    updateAddress(obj) {
        return request({
            url: '/address/update',
            method: 'post',
            data: obj
        })
    },
    removeAddress(id) {
        return request({
            url: 'address/delete',
            method: 'post',
            params: {
                id
            }
        })
    },
    getDetail(id) {
        return request({
            url: '/address/detail',
            method: 'get',
            params: {
                id
            }
        })
    },
    getAddressList() {
        return request({
            url: '/address/list',
            method: 'get'
        })
    }
}