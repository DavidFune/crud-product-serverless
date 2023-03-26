import { PostgresDataSource } from "../db";
import { ProductTypeorm } from "../product-typeorm";

const {ProductModel} = ProductTypeorm 
describe('Name of the group', () => {
    test('should connection database', async () => {
        
        const dataSource = PostgresDataSource
        
        dataSource.initialize()

        console.log(dataSource.getMetadata(ProductModel))
        
        expect(dataSource.options.type).toEqual('postgres')
    });
});