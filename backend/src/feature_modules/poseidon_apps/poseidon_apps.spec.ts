import { PoseidonAppsController } from "./private/poseidon_apps.controller";
import { PoseidonAppsService } from "./public/poseidon_apps.service";
import { Test } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PoseidonApp } from "./public/app.entity";

describe("PoseidonAppsTest", () => {
    let controller: PoseidonAppsController;
    let service: PoseidonAppsService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forFeature([PoseidonApp]),
            ],
            controllers: [],
            providers: [PoseidonAppsService],
        }).compile();

        controller = moduleRef.get<PoseidonAppsController>(PoseidonAppsController);
        service = moduleRef.get<PoseidonAppsService>(PoseidonAppsService);
    });


})