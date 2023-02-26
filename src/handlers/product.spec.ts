import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { post_product } from './product/product';
const res = require("../../events/event.json");

describe('Product test the http methodos', () => {
    
    let event: APIGatewayProxyEvent;
    const product_values = {
        name: 'Mouse-Usb-03',
        price: 50.00,
        description: "Mouse para jogos"
    }

    beforeEach( async () => {
        event = res
    })

    it('should post product', async () => {

        event = {
            ...event,
            httpMethod: "POST",
            body: JSON.stringify({product: product_values})
        }

        const result = await post_product(event);
        expect(result.statusCode).toEqual(200);
    });
});