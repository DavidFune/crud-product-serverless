import { setupPostgres } from "../db";
import { ProductTypeorm } from "../product-typeorm";

const {ProductModel, ProductRepository} = ProductTypeorm 


class StubProductRepository extends ProductRepository{}

describe('Product Repository Unit Test TypeOrm',() => {
    
    const dataSource = setupPostgres({ entities: [ProductModel]})
    let repo: StubProductRepository 
    
    beforeEach( async () => {
        await dataSource.initialize()
        repo = new ProductRepository(dataSource.getRepository(ProductModel))
    })

    it('should create product', async() => {

        const product_values = {
            name: 'Mouse-Usb-05',
            price: 50.00,
            description: "Mouse para jogos"
        }

        const response = await repo.insert(product_values)
    });

    it('should get products', async() => {

        const products = await repo.findAll()

        expect(products?.length).not.toBe(0)
    });
});