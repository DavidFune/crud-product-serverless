
export interface RepositoryInterface<E> {
    insert(entity: E): Promise<void>;
    findById(id: string): Promise<E>;
    findAll(): Promise<E[]>;
    update(entity: E): Promise<void>;
    delete(id: string): Promise<void>;
}