import request from '@/utils/request'

export default {
    register(phone, password) {
        return request({
            url: '/user/register',
            method: 'post',
            params: {
                phone,
                password
            }
        })
    },
    login(username, password) {
        return request({
            url: '/user/login',
            method: 'post',
            params: {
                username,
                password
            }
        })
    },
    getInfo() {
        return request({
            url: '/user/info',
            method: 'get'
        })
    },
    updateInfo(obj) {
        return request({
            url: '/user/update',
            method: 'post',
            data: obj
        })
    },
    updateAvatar(pl) {
        return request({
            url: '/user/update/avatar',
            method: 'post',
            params: {
                pl
            }
        })
    },
    updatePassword(obj) {
        return request({
            url: '/user/update/password',
            method: 'post',
            data: obj
        })
    },
    storeApply(obj) {
        return request({
            url: '/user/seller/apply',
            method: 'post',
            data: obj
        })
    }
}