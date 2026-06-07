import { Injectable } from "@nestjs/common";
import { PoseidonApp } from "./app.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { formInternalResponse, InternalResponse } from "../../../utils/response";

@Injectable()
export class PoseidonAppsService {
    constructor(
        @InjectRepository(PoseidonApp)
        private readonly poseidonAppsRepo: Repository<PoseidonApp>
    ) { }

    async getAllApps(): Promise<InternalResponse> {
        try {
            const data: Array<PoseidonApp> = await this.poseidonAppsRepo.find();
            if (data.length === 0)
                return formInternalResponse({
                    success: false,
                    data: null,
                    message: "No apps found",
                    code: 1
                });
            return formInternalResponse(data);
        } catch (error) {
            return formInternalResponse({
                success: false,
                data: null,
                message: `Internal server error while fetching apps. Error: ${error.message}`,
                code: 2
            });
        }
    }

    async getAppByID(appid: number): Promise<InternalResponse> {
        try {
            const data: PoseidonApp | null = await this.poseidonAppsRepo.findOneBy({ appid });
            if (data == null)
                return formInternalResponse({
                    success: false,
                    data: null,
                    message: `App not found with id: ${appid}`,
                    code: 1
                });
            return formInternalResponse(data);
        } catch (error) {
            return formInternalResponse({
                success: false,
                data: null,
                message: `Internal server error while fetching app with id: ${appid}. Error: ${error.message}`,
                code: 2
            });
        }
    }
}