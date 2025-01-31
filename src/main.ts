import * as express from 'express'
import { join } from 'path'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.use('/uploads', express.static(join(__dirname, '..', 'static')))

  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
