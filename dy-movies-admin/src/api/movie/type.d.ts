import { PageParams } from '@/api/common'

export interface Movie {
  id?: number
  name: string
  status: number
  host: string
  classifyUrl: string
  searchUrl: string
  detailUrl: string
  videoUrl: string
  verifyUrl: string
  desc: string
  parseId: number
  cateOrder: number
}

export interface QueryParams extends PageParams {
  name: string
  status: string
  parseId: string
}
