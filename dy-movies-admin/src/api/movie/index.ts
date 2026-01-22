import request from '@/utils/request.js'
import { Movie, QueryParams } from './type'
import { PageResult, Result } from '@/api/common'

export const reqGetMoviesList = (data: QueryParams) =>
  request.get<any, PageResult<Movie>, any>('/movies/list', {
    params: data
  })

export const reqUpdateMovie = (data: Movie) => request.put<any, Result<any>, any>('/movies', data)

export const reqDeleteMovie = (id: number) => request.delete<any, Result<any>, any>(`/movies/${id}`)
