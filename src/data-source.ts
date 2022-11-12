import "reflect-metadata"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "laptop-c16ghljm\sapir",
    password: null,
    database: "myDB",
    synchronize: true,
    logging: false,
    entities: ["entity/*.ts"],
    migrations: [],
    subscribers: [],
})