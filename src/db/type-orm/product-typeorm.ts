import { Entity, Column, PrimaryColumn, CreateDateColumn, Repository } from "typeorm"
import { v4 as uuid } from "uuid";
import { RepositoryInterface } from "../../repository/repository-contracts";
import { PostgresDataSource } from "./db";

@Entity({ schema: "store", name: "products" })
export class ProductModel {

    @PrimaryColumn('uuid')
    id?: string;

    @Column('varchar', { nullable: false })
    name: string

    @Column('numeric', { nullable: false })
    price: number

    @Column('varchar', { nullable: true })
    description: string

    @CreateDateColumn()
    created_at?: Date

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}

export class ProductRepository implements RepositoryInterface<ProductModel> {

    constructor(private repo: Repository<ProductModel>) { }

    async insert(entity: ProductModel): Promise<void> {
        await PostgresDataSource.initialize()
        const p = this.repo.create(entity)
        await this.repo.save(p)
    }
    async findById(id: string): Promise<ProductModel> {
        const p = this.repo.findOneBy({ id })
        return p
    }
    async findAll(): Promise<ProductModel[]> {
        const items = await this.repo.find()
        return items
    }
    async update(entity: ProductModel): Promise<void> {
        await this.repo.update({ id: entity.id }, { ...entity })
    }
    async delete(id: string): Promise<void> {
        await this.repo.delete(id)
    }

}