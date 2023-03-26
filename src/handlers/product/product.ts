import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { setupPostgres } from '../../db/type-orm/db';
import { ProductTypeorm } from '../../db/type-orm/product-typeorm';


const {ProductModel, ProductRepository} = ProductTypeorm 
const dataSource = setupPostgres({ entities: [ProductModel]})

class Repository extends ProductRepository{}

export const post_product = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    let response: APIGatewayProxyResult;

    if (event.httpMethod.toLocaleUpperCase() !== 'POST') {
        throw new Error(`getMethod only accept POST method, you tried: ${event.httpMethod}`);
    }

    await dataSource.initialize()
    
    const repo: Repository = new ProductRepository(dataSource.getRepository(ProductModel))

    console.info('received:', event);

    const body = JSON.parse(event.body);

    try {
        await repo.insert(body.product)
        response = {
            statusCode: 200,
            body: JSON.stringify({
                product: {
                    ...body.product,
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

    await dataSource.initialize() 
    const repo: Repository = new ProductRepository(dataSource.getRepository(ProductModel))

    let response: APIGatewayProxyResult;

    if (event.httpMethod.toLocaleUpperCase() !== 'GET') {
        throw new Error(`getMethod only accept GET method, you tried: ${event.httpMethod}`);
    }

    console.info('received:', event);

    try {
        const products = await repo.findAll()

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

    await dataSource.initialize() 
    const repo: Repository = new ProductRepository(dataSource.getRepository(ProductModel))

    console.info('received:', event);

    try {
        const product = await repo.findById(product_id)

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
    
    await dataSource.initialize() 
    const repo: Repository = new ProductRepository(dataSource.getRepository(ProductModel))

    if (event.httpMethod.toLocaleUpperCase() !== 'PUT') {
        throw new Error(`getMethod only accept PUT method, you tried: ${event.httpMethod}`);
    }
    
    console.info('received:', event);

    const body = JSON.parse(event.body);

    try {
        await repo.update(body.product)
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
    await dataSource.initialize() 
    const repo: Repository = new ProductRepository(dataSource.getRepository(ProductModel))

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