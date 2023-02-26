import { setupSequelize } from "../db";
import { ProductSequelize } from "../product-sequelize";

const { ProductModel } = ProductSequelize
describe('Product Model Unit Test', () => {

    const {sequelize} = setupSequelize({ models: [ProductModel] });

    it('should create product', async() => {
        const product_values = {
            name: 'Mouse-Usb-03',
            price: 50.00,
            description: "Mouse para jogos"
        }
        
        const product = await ProductModel.create(product_values)
        
        const productV = {
            ...product.toJSON(), 
            price: parseFloat(product.toJSON().price as any)
        }
        
        ProductModel.destroy({
            where:{
                id: productV.id 
            }
        })
        
        delete productV.id
        expect(productV).toStrictEqual(product_values)
    });
});