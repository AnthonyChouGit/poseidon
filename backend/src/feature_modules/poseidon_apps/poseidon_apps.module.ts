import { Module } from '@nestjs/common';
import { PoseidonApp } from './public/app.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PoseidonAppsService } from './public/poseidon_apps.service';
import { PoseidonAppsController } from './private/poseidon_apps.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([PoseidonApp]),
    ],
    controllers: [PoseidonAppsController],
    providers: [PoseidonAppsService],
    exports: [PoseidonAppsService],
})
export class PoseidonAppsModule { }