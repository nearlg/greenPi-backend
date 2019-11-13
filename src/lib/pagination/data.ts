export interface PaginationData<T> {
  data: T[],
  limit: number,
  page: number,
  total: number,
  pages: number
}