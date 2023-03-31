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
    }
}