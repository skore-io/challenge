import * as express from 'express'
import * as cors from 'cors'
import { join } from 'path'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // Configura o CORS
  app.use(
    cors({
      origin: 'http://localhost:3001', // Permite apenas o frontend nessa porta
      credentials: true, // libera auth cookies e headers
    }),
  )

  app.use('/uploads', express.static(join(__dirname, '..', 'static')))

  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
