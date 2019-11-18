export interface PaginationData<T> {
  items: T[];
  limit: number;
  page: number;
  total: number;
  pages: number;
}
