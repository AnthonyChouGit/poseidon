import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestFastifyApplication, FastifyAdapter } from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true
  }));
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap();
