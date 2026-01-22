export interface Result<T> {
  data: T
  code: number
  msg: string
}

export interface PageResult<T> {
  data: {
    result: T[]
    total: number
  }
  code: number
  msg: string
}

export interface PageParams {
  pageNo: number
  pageSize: number
}
