import { setupPostgres } from "../db";
import { ProductTypeorm } from "../product-typeorm";

const {ProductModel} = ProductTypeorm

describe('Product Model Unit Test TypeOrm',() => {
     
    let dataSource = null
    let repo = null

    beforeEach( async () => {
        dataSource = setupPostgres({ entities: [ProductModel]})
        await dataSource.initialize()
        repo = dataSource.getRepository(ProductModel)
    })
    
    it('should create product', async() => {
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
        const products = await repo.find()
        expect(products?.length).not.toBe(0)
    });
});