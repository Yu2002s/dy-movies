import request from '@/utils/request.js'

export const reqLogin = (data) => request.post('/users/login', data)

export const reqUserInfo = () => request.get(`/users`)

export const reqGetUserList = (data) => request.get('/users/list', { params: data })
