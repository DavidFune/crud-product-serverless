import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { setupSequelize } from '../../db/sequelize/db';
import { ProductSequelize } from '../../db/sequelize/product-sequelize';


const { ProductModel } = ProductSequelize

export const post_product = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    
    let response: APIGatewayProxyResult;

    if (event.httpMethod.toLocaleUpperCase() !== 'POST') {
        throw new Error(`getMethod only accept GET method, you tried: ${event.httpMethod}`);
    }

    setupSequelize({ models: [ProductModel] });

    console.info('received:', event);

    const body = JSON.parse(event.body);

    try {
        const product = await ProductModel.create(body.product)
        
        response = {
            statusCode: 200,
            body: JSON.stringify({
                product:{
                    ...product.toJSON(), 
                    price: parseFloat(product.toJSON().price as any)
                }
            })
        }
        
    } catch (ResourceNotFoundException) {
        response = {
            statusCode: 404,
            body: "Table resource not found."
        };
    }

    return response;
}