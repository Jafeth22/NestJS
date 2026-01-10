import { DataSource } from "typeorm";
import { config } from "dotenv";
import { expand } from "dotenv-expand";

expand(config());

const appDataSource = new DataSource({
    type: "postgres",
    url: process.env.POSTGRES_URL,
    entities: ["src/**/*.entity.ts"],
    migrations: ["src/migrations/*.ts"],
    synchronize: false
});

export default appDataSource;