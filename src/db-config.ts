import "reflect-metadata"
import { DataSource } from "typeorm"

export const db = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "root",
  database: "blogsDB",
  synchronize: true,
  logging: false,
})
