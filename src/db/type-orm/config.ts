import { config as readEnv } from "dotenv"
import { join } from "path";

type Config = {
    db: {
        type: any,
        host: string,
        port?: number,
        database: string,
        schema?: string,
        username?: string,
        password?: string,
        migrations?: any
        entities?: any
    }
}

function makeConfig(envFile): Config {
    const output = readEnv({ path: envFile })
    
    if (process.env?.STAGE_NAME == 'Dev') {
        return {
            db: {
                type: process.env.TYPEORM_CONNECTION,
                database: process.env.TYPEORM_DATABASE,
                host: process.env.TYPEORM__HOST,
                password: process.env.TYPEORM_PASSWORD,
                port: process.env.TYPEORM_PORT as any,
                username: process.env.TYPEORM_USERNAME,
                schema: process.env.TYPEORM_SCHEMA,
                migrations: [process.env.TYPEORM_MIGRATIONS],
                entities: [process.env.TYPEORM_ENTITIES]
            }
        }

    } else {
        return {
            db: {
                type: output.parsed.TYPEORM_CONNECTION,
                database: output.parsed.TYPEORM_DATABASE,
                host: output.parsed.TYPEORM__HOST,
                password: output.parsed.TYPEORM_PASSWORD,
                port: output.parsed.TYPEORM_PORT as any,
                username: output.parsed.TYPEORM_USERNAME,
                schema: output.parsed.TYPEORM_SCHEMA,
                migrations: [output.parsed.TYPEORM_MIGRATIONS],
                entities: [output.parsed.TYPEORM_ENTITIES]
            }
        }
    }
}


const envTestingFile = join(__dirname, "../../../.env")
export const configDB = makeConfig(envTestingFile)