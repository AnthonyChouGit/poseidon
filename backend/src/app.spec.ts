import { AppModule } from "./app.module";
import { Test, TestingModule } from "@nestjs/testing";
import { PoseidonAppsController } from "./feature_modules/poseidon_apps/private/poseidon_apps.controller";
import { PoseidonApp } from "./feature_modules/poseidon_apps/public/app.entity";

describe("AppTest", () => {
    let controller: PoseidonAppsController;
    let moduleRef: TestingModule;

    beforeEach(async () => {
        moduleRef = await Test.createTestingModule({
            imports: [AppModule]
        }).compile();
        controller = moduleRef.get<PoseidonAppsController>(PoseidonAppsController);
    })

    afterAll(async () => {
        await moduleRef.close();
    })

    it("TestApp", async () => {
        const apps: Array<PoseidonApp> = await controller.findAll();
        console.log(`Apps: ${JSON.stringify(apps)}`);
        expect(apps.length).toBeGreaterThan(0);

        const app: PoseidonApp = await controller.findById(1);
        console.log(`App: ${JSON.stringify(app)}`);
        expect(app).not.toBeNull();
    })
})