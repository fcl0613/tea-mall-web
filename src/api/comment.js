import request from '@/utils/request'

export default {
    createComment(obj) {
        return request({
            url: '/comment/create',
            method: 'post',
            data: obj
        })
    },
    getCommentList(pageNum, pageSize, goodsId) {
        return request({
            url: '/comment/list',
            method: 'get',
            params: {
                pageNum, pageSize, goodsId
            }
        })
    }
}