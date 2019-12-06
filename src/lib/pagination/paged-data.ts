import { Pagination } from '.';

export interface PagedData<T> {
  items: T[];
  pagination: Pagination;
}
