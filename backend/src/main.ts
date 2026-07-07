import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestFastifyApplication, FastifyAdapter } from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import fastifyCookie from "@fastify/cookie";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true
  }));
  await app.register(fastifyCookie);
  const config_service: ConfigService = app.get(ConfigService);
  const port: number = config_service.get<number>('server.port') ?? 3000;
  const host: string = config_service.get<string>('server.host') ?? '0.0.0.0';

  await app.listen(port, host);
}
bootstrap();
