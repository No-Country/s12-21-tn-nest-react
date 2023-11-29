import { IsString, MinLength, IsEmail, IsEnum, MaxLength, IsDateString } from "class-validator";

import { ERole } from "../../../common/enum";

export class CreateUserDto {

    @IsString()
    @MinLength(3)
    @MaxLength(25)
    firstName: string;

    @IsString()
    @MinLength(3)
    @MaxLength(25)
    lastName: string;

    @IsEmail()
    email:string;

    @IsString()
    @MinLength(6)
    password: string;

    @IsString()
    phone?: string;

    @IsEnum(ERole)
    role: ERole;

}