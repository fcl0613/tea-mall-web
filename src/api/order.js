import request from '@/utils/request'

export default {
    confirmOrder(obj) {
        return request({
            url: '/order/confirm',
            method: 'post',
            data: obj
        })
    },
    createOrder(obj) {
        return request({
            url: '/order/create',
            method: 'post',
            data: obj
        })
    },
    directConfirm(id, count) {
        return request({
            url: '/order/direct/confirm',
            method: 'post',
            params: {
                id, count
            }
        })
    },
    directBuy(goodsId, count, addressId) {
        return request({
            url: '/order/direct/buy',
            method: 'post',
            params: {
                goodsId, count, addressId
            }
        })
    },
    getOrderList(obj) {
        return request({
            url: 'order/list',
            method: 'post',
            data: obj
        })
    },
    cancelOrder(id) {
        return request({
            url: 'order/cancel',
            method: 'post',
            params: {
                id
            }
        })
    },
    determineOrder(id) {
        return request({
            url: 'order/determine',
            method: 'post',
            params: {
                id
            }
        })
    },
    getDetail(id) {
        return request({
            url: '/order/detail',
            method: 'get',
            params: {
                id
            }
        })
    },
    getCommentGoods() {
        return request({
            url: '/order/detail/list',
            method: 'get'
        })
    }
}