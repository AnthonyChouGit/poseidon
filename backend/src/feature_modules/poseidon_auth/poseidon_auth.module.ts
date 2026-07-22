import { Module } from "@nestjs/common";
import { PoseidonUsersModule } from "../poseidon_users/poseidon_users.module";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Module({
    imports: [
        PoseidonUsersModule,
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>("auth.jwt_secret_key"),
                signOptions: { expiresIn: configService.get<number>("auth.jwt_expires_in") }
            })
        })
    ]
})
export class PoseidonAuthModule { }