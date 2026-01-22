import request from '@/utils/request.js'

export const reqGetAdminUsers = () => request.get('/users/list')

export const reqGetRoles = (data) =>
  request.get('/users/roles', {
    params: data
  })
