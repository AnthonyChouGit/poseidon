import { Controller, Get, NotFoundException, Param, ParseIntPipe } from "@nestjs/common";
import { PoseidonAppsService } from "../public/poseidon_apps.service";
import { PoseidonApp } from "../public/app.entity";
import { InternalResponse } from "src/utils/response";

@Controller('api/apps')
export class PoseidonAppController {
    constructor(private readonly poseidonAppsService: PoseidonAppsService) { }

    @Get()
    async findAll(): Promise<Array<PoseidonApp>> {
        const res: InternalResponse = await this.poseidonAppsService.getAllApps();

        if (!res.success) {
            throw new NotFoundException(res.message);
        }
        return res.data;
    }

    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number): Promise<PoseidonApp> {
        const res: InternalResponse = await this.poseidonAppsService.getAppByID(id);

        if (!res.success) {
            throw new NotFoundException(res.message);
        }
        return res.data;
    }
}