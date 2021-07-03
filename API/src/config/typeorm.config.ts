import { createConnection } from "typeorm";
import path = require("path")
import  enviroment   from "./enviroments.config";

export async function connect(){
    await createConnection({
        type: 'mysql',
        host: enviroment.databaseHost,
        port: enviroment.databasePort,
        username: 'root',
        password: '',
        database: 'database',
        entities: [
            path.join(__dirname, '../entities/**/**.ts')
        ], 
        synchronize:true
    });
    console.log('Database is connected');
}