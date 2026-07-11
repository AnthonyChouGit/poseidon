import { Injectable } from "@nestjs/common";
import { PoseidonApp } from "./app.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { formInternalResponse, InternalResponse } from "src/utils/response";

@Injectable()
export class PoseidonAppsService {
    constructor(
        @InjectRepository(PoseidonApp)
        private readonly poseidonAppsRepo: Repository<PoseidonApp>
    ) { }

    async getAllApps(): Promise<InternalResponse> {
        const data: Array<PoseidonApp> = await this.poseidonAppsRepo.find();
        if (data.length === 0)
            return formInternalResponse({
                success: false,
                data: null,
                message: "No apps found",
                code: 1
            });
        return formInternalResponse(data);
    }

    async getAppByID(appid: number): Promise<InternalResponse> {
        const data: PoseidonApp | null = await this.poseidonAppsRepo.findOneBy({ appid });
        if (data == null)
            return formInternalResponse({
                success: false,
                data: null,
                message: `App not found with id: ${appid}`,
                code: 1
            });
        return formInternalResponse(data);
    }
}