import { PagedData } from './pagination/paged-data';
import { PaginationRequest } from './pagination/request';

export interface Repository<T> {
  findAll(pagination?: PaginationRequest): Promise<PagedData<T>>;
  create(document: T): Promise<T>;
  update(document: T): Promise<T>;
}
