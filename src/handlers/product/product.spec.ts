import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { get_by_id_product, post_product } from './product';
const res = require("../../../events/event.json");

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

    it('should get by id product', async () => {

        const event = { 
            httpMethod: 'GET', 
            pathParameters: { 
                product_id: '3c653ebe-d8e9-4ec6-977a-4d25d3d8b20d' 
            } 
        } 
        const result = await get_by_id_product(event as any);
        expect(result.statusCode).toEqual(200);
    });
});