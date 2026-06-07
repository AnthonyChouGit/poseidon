import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { loadConfig } from './utils/config'
import { join } from 'node:path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PoseidonAppsModule } from './feature_modules/poseidon_apps/poseidon_apps.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [() => loadConfig(process.env.CONFIG_PATH || join(process.cwd(), "config.yaml"))],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get("database.host"),
        port: config.get("database.port"),
        username: config.get("database.username"),
        password: config.get("database.password"),
        database: config.get("database.database"),
        synchronize: false,
        autoLoadEntities: true,
      })
    }),
    PoseidonAppsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
