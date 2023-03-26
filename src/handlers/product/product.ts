import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { PostgresDataSource } from '../../db/type-orm/db';
import { ProductTypeorm } from '../../db/type-orm/product-typeorm';


const {ProductModel} = ProductTypeorm 


export const post_product = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    let response: APIGatewayProxyResult;

    if (event.httpMethod.toLocaleUpperCase() !== 'POST') {
        throw new Error(`getMethod only accept POST method, you tried: ${event.httpMethod}`);
    }

    await PostgresDataSource.initialize()
    const repo =  PostgresDataSource.getRepository(ProductModel)

    console.info('received:', event);

    const body = JSON.parse(event.body);

    try {
        const product = repo.create(body.product)
        await repo.save(product)

        response = {
            statusCode: 200,
            body: JSON.stringify({
                product: {
                    ...product,
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

    console.info('received:', event);

    await PostgresDataSource.initialize()
    const repo =  PostgresDataSource.getRepository(ProductModel)

    try {
        const products = await repo.find()

        let list_products = []

        if (products.length > 0) {
            list_products = list_products
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

    await PostgresDataSource.initialize()
    const repo =  PostgresDataSource.getRepository(ProductModel)

    console.info('received:', event);

    try {
        const product = await repo.findOne({
            where: {
                id: product_id
            }
        })

        response = {
            statusCode: 200,
            body: JSON.stringify({
                product: product
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

    await PostgresDataSource.initialize()
    const repo =  PostgresDataSource.getRepository(ProductModel)

    console.info('received:', event);

    const body = JSON.parse(event.body);

    const p_id = body.product.id

    try {
        const product = await repo.update({id: p_id},{...body.product})

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

    await PostgresDataSource.initialize()
    const repo =  PostgresDataSource.getRepository(ProductModel)

    console.info('received:', event);

    try {
        await repo.delete(product_id)

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