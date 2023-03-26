import { setupPostgres } from "../db";
import { ProductTypeorm } from "../product-typeorm";

const {ProductModel} = ProductTypeorm

describe('Product Model Unit Test TypeOrm',() => {
     
    it('should create product', async() => {

        const dataSource = setupPostgres({ entities: [ProductModel]})

        await dataSource.initialize() 
        
        const repo =  dataSource.getRepository(ProductModel)

        const product_values = {
            name: 'Mouse-Usb-04',
            price: 50.00,
            description: "Mouse para jogos"
        }
        
        const product = repo.create(product_values)
        const product_save = await repo.save(product)
        
        expect(product_save.name).toBe(product_values.name)
    });

    it('should get products', async() => {
        
        const dataSource = setupPostgres({ entities: [ProductModel]})

        await dataSource.initialize()

        const repo = dataSource.getRepository(ProductModel)

        const products = await repo.find()

        expect(products?.length).not.toBe(0)
    });
});