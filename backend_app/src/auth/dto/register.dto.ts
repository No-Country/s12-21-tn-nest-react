import { CreateUserDto } from '../user/dto';
import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export default class RegisterDto extends CreateUserDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  mentorDescription?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  price?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(10000)
  aboutMe?: string;

  @IsOptional()
  @IsDateString()
  birthDate?: Date;

  @IsOptional()
  @IsArray()
  @IsNotEmpty()
  categories?: string[];

  @IsOptional()
  @IsString()
  speciality?: string;
}
