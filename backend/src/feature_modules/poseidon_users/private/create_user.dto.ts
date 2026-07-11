import { IsString, IsEmail, IsNotEmpty, Length } from "class-validator";

export class CreateUserDto {
    @IsString({ message: "Username must be a string" })
    @Length(1, 20, { message: "Username must be between 1 and 20 characters long" })
    @IsNotEmpty({ message: "Username is required" })
    username!: string;

    @IsString({ message: "Password must be a string" })
    @Length(8, 60, { message: "Password must be between 8 and 60 characters long" })
    @IsNotEmpty({ message: "Password is required" })
    password!: string;

    @IsEmail({}, { message: "Email must be a valid email address" })
    email?: string;
}