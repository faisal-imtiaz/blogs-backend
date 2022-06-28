import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { db } from "./db-config"

db.initialize()
  .then(() => console.log("DB Connected...!!"))
  .catch((error) => console.log(error))

async function bootstrap() {
  const port = 3600
  const app = await NestFactory.create(AppModule)
  await app.listen(port, () => console.log(`Nest server ready at ${port}`))
}

bootstrap()
