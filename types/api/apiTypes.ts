export type ApiErrorData = {
  status: number
  title: string
  errors?: {
    [s: string]: string[]
  }
  subErrors?: string[]
  message: string
}

export type Pagination = {
  pageIndex: number | undefined
  totalPages: number | undefined
  totalCount: number | undefined
  hasPreviousPage: boolean | undefined
  hasNextPage: boolean | undefined
}

export type ApiPaginatedResponse<T> = Pagination & {
  items: T[]
}

export type ApiQueryParamsType = Record<
  string,
  string | number | string[] | undefined
>

export type API_ID_Response = {
  id: string
}
