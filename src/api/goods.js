import request from '@/utils/request'

export default {
    getGoodsList(categoryId, keyword, pageNum, pageSize) {
        return request({
            url: '/goods/list',
            method: 'get',
            params: {
                categoryId, keyword, pageNum, pageSize
            }
        })
    },
    getGoodsInfo(id) {
        return request({
            url: '/goods/info',
            method: 'get',
            params: {
                id
            }
        })
    }
}