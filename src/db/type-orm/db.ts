import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm"
import { configDB as config } from "./config";

const dataSourceOptions: DataSourceOptions = config.db

export function setupPostgres (options: {}) {

    return new DataSource({
        ...dataSourceOptions,
        ...options
    })
}