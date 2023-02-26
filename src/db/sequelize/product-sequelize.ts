import { Table, Model, PrimaryKey, Column, DataType } from "sequelize-typescript";
export namespace ProductSequelize {
    type ProductModelProps = {
        id?: number;
        name: string
        price: number
        description: string | null
    }

    @Table({ tableName: "products", timestamps: false })
    export class ProductModel extends Model<ProductModelProps>{
        @PrimaryKey
        @Column({ type: DataType.INTEGER, autoIncrement: true, allowNull: false})
        declare id?: number;
        
        @Column({ type: DataType.STRING, allowNull: false})
        declare name: string
        
        @Column({ type: DataType.DECIMAL, allowNull: false})
        declare price: number
        
        @Column({ type: DataType.STRING, allowNull: true})
        declare description: string

    }
}