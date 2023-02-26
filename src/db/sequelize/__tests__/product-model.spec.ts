import { setupSequelize } from "../db";
import { ProductSequelize } from "../product-sequelize";

const { ProductModel } = ProductSequelize
describe('Product Model Unit Test', () => {

    const {sequelize} = setupSequelize({ models: [ProductModel] });

    beforeEach(async () => await sequelize.sync());

    it('should create product', async() => {
        const product_values = {
            name: 'Mouse-Usb-03',
            price: 50,
            description: "Mouse para jogos"
        }

        const patient = await ProductModel.create(product_values)

        console.log(patient);
        
        //expect(patient.toJSON()).toStrictEqual(product_values)
    });
});