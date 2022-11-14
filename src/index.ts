import { AppDataSource } from "./data-source"

AppDataSource.initialize().then(async () => {
    console.log("initializing migrations...");
    await AppDataSource.runMigrations();
    console.log("Done!");

}).catch(error => console.log(error))
