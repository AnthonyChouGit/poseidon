import { Module } from '@nestjs/common';
import { PoseidonApp } from './public/app.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PoseidonAppsService } from './public/poseidon_apps.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([PoseidonApp]),
    ],
    controllers: [],
    providers: [PoseidonAppsService],
    exports: [PoseidonAppsService],
})
export class PoseidonAppsModule { }