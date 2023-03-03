import { Entity, Column, PrimaryColumn,  } from "typeorm"

export namespace ProductSequelize {
    type ProductModelProps = {
        id?: number;
        name: string
        price: number
        description: string | null
    }

    @Entity({ name: "products"})
    export class ProductModel <ProductModelProps>{
        @PrimaryColumn()
        @Column({nullable: false})
        declare id?: number;
        
        @Column({nullable: false})
        declare name: string
        
        @Column({nullable: false})
        declare price: number
        
        @Column({nullable: true})
        declare description: string

    }
}