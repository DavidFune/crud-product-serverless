const pg = require('pg');
import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import { configDB as config } from "./config";

const sequelizeOptions: SequelizeOptions = {
    dialect: config.db.vendor,
    dialectModule: pg,
    host: config.db.host,
    password: config.db.password,
    port: config.db.port,
    username: config.db.user,
    logging: config.db.logging,
}

export function setupSequelize(options: SequelizeOptions = {}) {
    let _sequelize: Sequelize
    
    _sequelize = new Sequelize({
        ...sequelizeOptions,
        ...options,
    })
    
    _sequelize.sync()
    return {
        get sequelize() {
            return _sequelize
        }
    };
}