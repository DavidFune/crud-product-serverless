import { PostgresDataSource } from "../db";
import { ProductModel } from "../product-typeorm";
 
describe('Product Model Unit Test TypeOrm',() => {
     
    it('should create product', async() => {

        await PostgresDataSource.initialize()
        
        const repo =  PostgresDataSource.getRepository(ProductModel)

        const product_values = {
            name: 'Mouse-Usb-04',
            price: 50.00,
            description: "Mouse para jogos"
        }
        
        const product = repo.create(product_values)
        await repo.save(product)
        
        console.log(product);
        
    });

    it('should get products', async() => {
        
        const datasource = PostgresDataSource

        console.log(datasource.options)
        /* const repo =  datasource.getRepository(ProductModel)
        
        const products = await repo.find()
        
        console.log(products); */
        
    });
});