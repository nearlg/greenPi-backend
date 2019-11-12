import { PaginatedData } from "./paginated-data";

export interface Repository<T> {
    findAll(limit: number, page: number): Promise<PaginatedData<T>>;
    create(document: T): Promise<T>;
    update(document: T): Promise<T>;
}
