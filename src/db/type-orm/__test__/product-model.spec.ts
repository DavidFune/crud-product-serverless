import { PostgresDataSource } from "../db";
import { ProductTypeorm } from "../product-typeorm";

const {ProductModel} = ProductTypeorm 
describe('Product Model Unit Test TypeOrm',() => {
    
    beforeEach( async() => await PostgresDataSource.initialize());

    const repo =  PostgresDataSource.getRepository(ProductModel)

    it('should create product', async() => {
        const product_values = {
            name: 'Mouse-Usb-03',
            price: 50.00,
            description: "Mouse para jogos"
        }
        
        const product = repo.create(product_values)
        await repo.save(product)
        
        console.log(product);
        
    });
});