import request from '@/utils/request.js'

export const reqGetLiveSourceData = () => request.get('/lives')

export const reqAddOrUpdateLiveSource = (data) => request.post('/lives', data)

export const reqDeleteLiveSource = (id) => request.delete(`/lives/${id}`)