import { Module } from "@nestjs/common";
import { PoseidonUsersService } from "./public/poseidon_users.service";
import { PoseidonUser } from "./public/user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [
        TypeOrmModule.forFeature([PoseidonUser])
    ],
    providers: [PoseidonUsersService],
    exports: [PoseidonUsersService]
})
export class PoseidonUsersModule { }