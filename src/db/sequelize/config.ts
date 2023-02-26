import {config as readEnv} from "dotenv"
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
    const output = readEnv({path: envFile})
    return{
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

const envTestingFile = join(__dirname, "../../../.env")
export const configDB = makeConfig(envTestingFile)