import { createConnection } from "typeorm";
import path = require("path")
import  enviroment   from "./enviroments.config";

export async function connect(){
    console.log(enviroment.databaseUserName);
    await createConnection({
        type: 'mysql',
        host: enviroment.databaseHost,
        port: enviroment.databasePort,
        username: enviroment.databaseUserName,
        password: enviroment.databasePassword,
        database: enviroment.databaseName,
        entities: [
            path.join(__dirname, '../entities/**/**.ts')
        ], 
        synchronize:true
    });
    console.log('Database is connected');
}