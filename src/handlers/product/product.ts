import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { setupSequelize } from '../../db/sequelize/db';
import { ProductSequelize } from '../../db/sequelize/product-sequelize';


const { ProductModel } = ProductSequelize

export const post_product = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    let response: APIGatewayProxyResult;

    if (event.httpMethod.toLocaleUpperCase() !== 'POST') {
        throw new Error(`getMethod only accept POST method, you tried: ${event.httpMethod}`);
    }

    setupSequelize({ models: [ProductModel] });

    console.info('received:', event);

    const body = JSON.parse(event.body);

    try {
        const product = await ProductModel.create(body.product)

        response = {
            statusCode: 200,
            body: JSON.stringify({
                product: {
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

export const get_product = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    let response: APIGatewayProxyResult;

    if (event.httpMethod.toLocaleUpperCase() !== 'GET') {
        throw new Error(`getMethod only accept GET method, you tried: ${event.httpMethod}`);
    }

    setupSequelize({ models: [ProductModel] });

    console.info('received:', event);

    try {
        const products = await ProductModel.findAll()

        let list_products = []

        if (products.length > 0) {
            products.forEach(product => list_products.push({
                ...product.toJSON(),
                price: parseFloat(product.toJSON().price as any)
            }))
        }

        response = {
            statusCode: 200,
            body: JSON.stringify({
                products: list_products
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

export const get_by_id_product = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    let response: APIGatewayProxyResult;

    if (event.httpMethod.toLocaleUpperCase() !== 'GET') {
        throw new Error(`getMethod only accept GET method, you tried: ${event.httpMethod}`);
    }

    if (!event.pathParameters) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                error: "Provided information not valid"
            })
        }
    }

    const product_id = event.pathParameters.product_id;


    setupSequelize({ models: [ProductModel] });

    console.info('received:', event);

    try {
        const product = await ProductModel.findOne({
            where: {
                id: product_id
            }
        })

        const _product = {
            ...product.toJSON(),
            price: parseFloat(product.toJSON().price as any)
        }

        response = {
            statusCode: 200,
            body: JSON.stringify({
                product: _product
            })
        }

    } catch (ResourceNotFoundException) {
        response = {
            statusCode: 404,
            body: "error: Provided information product id is not valid."
        };
    }

    return response;
}

export const put_product = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    let response: APIGatewayProxyResult;

    if (event.httpMethod.toLocaleUpperCase() !== 'PUT') {
        throw new Error(`getMethod only accept PUT method, you tried: ${event.httpMethod}`);
    }

    setupSequelize({ models: [ProductModel] });

    console.info('received:', event);

    const body = JSON.parse(event.body);

    try {
        const product = await ProductModel.findOne({
            where: {
                id: body.product.id
            }
        })
        product.set(body.product)
        product.save()

        const _product = {
            ...product.toJSON(),
            price: parseFloat(product.toJSON().price as any)
        }
        response = {
            statusCode: 201,
            body: JSON.stringify({ message: 'update sucess' })
        }

    } catch (ResourceNotFoundException) {
        response = {
            statusCode: 404,
            body: "Table resource not found."
        };
    }

    return response;
}

export const delete_product = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    let response: APIGatewayProxyResult;

    if (event.httpMethod.toLocaleUpperCase() !== 'DELETE') {
        throw new Error(`getMethod only accept DELETE method, you tried: ${event.httpMethod}`);
    }

    if (!event.pathParameters) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                error: "Provided information not valid"
            })
        }
    }

    const product_id = event.pathParameters.product_id;


    setupSequelize({ models: [ProductModel] });

    console.info('received:', event);

    try {
        await ProductModel.destroy({
            where: {
                id: product_id
            }
        })

        response = {
            statusCode: 201,
            body: JSON.stringify({ message: 'delete sucess' })
        }

    } catch (ResourceNotFoundException) {
        response = {
            statusCode: 404,
            body: "error: Provided information product id is not valid."
        };
    }

    return response;
}