import "dotenv/config"
export default {
    databaseUserName: process.env.DATABASE_USERNAME ?? 'root',
    databasePassword: process.env.DATABASE_PASSWORD ?? '',
    databaseName: process.env.DATABASE_NAME ?? 'database',
    databaseHost: process.env.DATABASE_HOST ?? '127.0.0.1',
    databasePort: Number(process.env.DATABASE_PORT) ?? 3306,
    jwtSecretKey: process.env.JWT_SECRET_KEY ?? 'secret' 
 }