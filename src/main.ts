import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { db } from "./ormconfig"

db.initialize()
  .then(() => console.log("DB Connected...!!"))
  .catch((error) => console.log(error))

async function bootstrap() {
  const port: number = +process.env.PORT
  const app = await NestFactory.create(AppModule)

  await app.listen(port, () => console.log(`Nest server ready at ${port}`))
}

bootstrap()
