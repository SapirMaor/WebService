import { DataSource } from 'typeorm'

DataSource()
.then(async (connection) => {
    await connection.runMigrations();
}).catch(error => console.log(error))
