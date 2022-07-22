import "reflect-metadata"
import { DataSource } from "typeorm"

export const db = new DataSource({
  type: "postgres",
  host: process.env.HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: false,
})
