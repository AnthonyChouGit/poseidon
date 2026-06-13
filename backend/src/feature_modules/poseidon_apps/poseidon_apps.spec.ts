import { PoseidonAppsController } from "./private/poseidon_apps.controller";
import { PoseidonAppsService } from "./public/poseidon_apps.service";
import { Test, TestingModule } from "@nestjs/testing";
import { PoseidonAppsModule } from "./poseidon_apps.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { InternalResponse } from "src/utils/response";


describe("PoseidonAppsTest", () => {
    let controller: PoseidonAppsController;
    let service: PoseidonAppsService;
    let moduleRef: TestingModule;

    beforeEach(async () => {
        moduleRef = await Test.createTestingModule({
            imports: [
                PoseidonAppsModule,
                TypeOrmModule.forRoot({
                    type: "postgres",
                    host: "db",
                    port: 5432,
                    username: "db_dev_root",
                    password: "970928",
                    database: "db_dev",
                    synchronize: false,
                    autoLoadEntities: true
                })
            ],
            controllers: [],
            providers: [],
        }).compile();

        controller = moduleRef.get<PoseidonAppsController>(PoseidonAppsController);
        service = moduleRef.get<PoseidonAppsService>(PoseidonAppsService);
    });

    afterEach(async () => {
        await moduleRef.close();
    });

    it("TestPoseidonAppsModule", async () => {
        const res: InternalResponse = await service.getAllApps();
        console.log(JSON.stringify(res));
        const res2: InternalResponse = await service.getAppByID(2);
        console.log(JSON.stringify(res2));
        expect(res.success).toBe(true);
        expect(res2.success).toBe(true);
    })

})