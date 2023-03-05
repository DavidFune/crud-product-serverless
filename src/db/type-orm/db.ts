import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm"
import { configDB as config } from "./config";

const dataSourceOptions: DataSourceOptions = config.db

export const PostgresDataSource = new DataSource(dataSourceOptions)