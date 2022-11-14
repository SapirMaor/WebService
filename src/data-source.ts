import "reflect-metadata"
import { DataSource, Migration } from "typeorm"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "shoham",
    password: "12345678",
    database: "myDB",
    synchronize: false,
    logging: false,
    entities: ["src/entity/*.ts"],
    migrations: ["src/migration/*.ts"],
    subscribers: [],
})
