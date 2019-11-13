import { PaginationData } from "../../../lib/pagination/data";
import { PaginationRequest } from "../../../lib/pagination/request";

export interface Repository<T> {
    findAll(pagination?: PaginationRequest): Promise<PaginationData<T>>;
    create(document: T): Promise<T>;
    update(document: T): Promise<T>;
}
