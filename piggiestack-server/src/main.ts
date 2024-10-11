import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log(`Running on Node.js version: ${process.version}`);
  const app = await NestFactory.create(AppModule);
  await app.listen(5050);
}
bootstrap();