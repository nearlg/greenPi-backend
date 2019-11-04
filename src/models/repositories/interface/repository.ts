export interface Repository<T> {
    findAll(): Promise<T[]>;
    create(document: T): Promise<T>;
    update(document: T): Promise<T>;
}
