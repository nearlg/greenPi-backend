export interface IRepository<T> {
    findAll(): Promise<T[]>;
    findById(id: string): Promise<T|null>;

    create(document: T): Promise<T>;
    update(document: T): Promise<T>;
    remove(document: T): Promise<void>;
    removeById(id: string): Promise<void>;

    updateById(id: string, document: T): Promise<T>;
}