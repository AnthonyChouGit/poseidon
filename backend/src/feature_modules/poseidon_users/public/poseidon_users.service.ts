import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PoseidonUser } from "./user.entity";
import { Repository } from "typeorm";
import { formInternalResponse, InternalResponse } from "src/utils/response";
import { CreateUserDto } from "../private/create_user.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class PoseidonUsersService {
    constructor(
        @InjectRepository(PoseidonUser)
        private readonly userRepo: Repository<PoseidonUser>
    ) { }

    async getUserById(uid: number): Promise<InternalResponse> {
        const user: PoseidonUser | null = await this.userRepo.findOneBy({ uid });
        if (user == null) {
            return formInternalResponse({
                success: false,
                data: null,
                message: `User not found with id: ${uid}`,
                code: 1
            });
        }
        return formInternalResponse(user);
    }

    async getUserByName(username: string): Promise<InternalResponse> {
        const user: PoseidonUser | null = await this.userRepo.findOneBy({ username });
        if (user == null) {
            return formInternalResponse({
                success: false,
                data: null,
                message: `User not found with username: ${username}`,
                code: 1
            });
        }
        return formInternalResponse(user);
    }

    async createUser(createUserDto: CreateUserDto): Promise<InternalResponse> {
        const user: PoseidonUser = this.userRepo.create({
            ...createUserDto,
            hashed_password: await bcrypt.hash(createUserDto.password, 10)
        });
        try {
            const result: PoseidonUser = await this.userRepo.save(user);
            return formInternalResponse(result);
        } catch (e: any) {
            if (e.code == 23505)
                return formInternalResponse({
                    success: false,
                    data: null,
                    message: `User already exists with username: ${createUserDto.username}`,
                    code: 1
                });
            throw e;
        }
    }

    async verifyUser(username: string, password: string): Promise<InternalResponse> {
        const response: InternalResponse = await this.getUserByName(username);
        if (response.success) {
            const user: PoseidonUser = response.data as PoseidonUser;
            const isMatch: boolean = await bcrypt.compare(password, user.hashed_password);
            if (isMatch)
                return formInternalResponse(user);
            else {
                return formInternalResponse({
                    success: false,
                    data: null,
                    message: "Incorrect password",
                    code: 1
                });
            }
        }
        return formInternalResponse({
            success: false,
            data: null,
            message: `User not found with username: ${username}`,
            code: 2
        });
    }
}