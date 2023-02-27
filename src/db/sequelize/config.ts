import { config as readEnv } from "dotenv"
import { join } from "path";

type Config = {
    db: {
        vendor: any,
        host: string,
        password?: string,
        port?: number,
        user?: string,
        logging: boolean
    }
}

function makeConfig(envFile): Config {
    const output = readEnv({ path: envFile })

    console.log('ENV:', process.env);
    
    if (process.env?.STAGE_NAME == 'Dev') {
        return {
            db: {
                vendor: process.env.DB_VENDOR as any,
                password: process.env.PASSWORD as any,
                host: process.env.DB_HOST,
                port: 5441,
                user: process.env.USER,
                logging: process.env.DB_LOGGING === "true",
            }
        }

    } else {
        return {
            db: {
                vendor: output.parsed.DB_VENDOR as any,
                password: output.parsed.PASSWORD as any,
                host: output.parsed.DB_HOST,
                port: 5441,
                user: output.parsed.USER,
                logging: output.parsed.DB_LOGGING === "true",
            }
        }
    }
}


const envTestingFile = join(__dirname, "../../../.env")
export const configDB = makeConfig(envTestingFile)