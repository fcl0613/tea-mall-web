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
}