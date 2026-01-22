import request from '@/utils/request.js'

export const reqGetUpdateList = (data) =>
  request.get('/updates', {
    params: data
  })

export const reqAddOrUpdate = (data) => request.post('/updates', data)

export const reqDeleteUpdate = (id) => request.delete(`/updates/${id}`)
