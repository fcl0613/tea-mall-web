import request from '@/utils/request'

export default {
    addCart(id) {
        return request({
            url: '/cart/add',
            method: 'post',
            params: {
                id
            }
        })
    },
    deleteCart(id) {
        return request({
            url: '/cart/delete',
            method: 'post',
            params: {
                id
            }
        })
    },
    updateCart(id, count) {
        return request({
            url: '/cart/update/count',
            method: 'post',
            params: {
                id, count
            }
        })
    },
    getCartList() {
        return request({
            url: '/cart/list',
            method: 'get'
        })
    },
    deleteCartBatch(obj) {
        return request({
            url: '/cart/delete/batch',
            method: 'post',
            data: obj
        })
    },
}