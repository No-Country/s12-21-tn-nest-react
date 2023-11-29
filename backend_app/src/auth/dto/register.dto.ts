import { CreateUserDto } from "../user/dto";
import { IsArray, IsDateString, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export default class RegisterDto extends CreateUserDto {

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @MinLength(200)
    @MaxLength(500)
    mentorDescription?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    price?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @MinLength(400)
    @MaxLength(10000)
    aboutMe?: string;

    @IsOptional()
    @IsDateString()
    birthDate?: string;

    @IsOptional()
    @IsArray()
    @IsNotEmpty()
    categories?: string[]; 

    @IsString()
    speciality?: string;

}