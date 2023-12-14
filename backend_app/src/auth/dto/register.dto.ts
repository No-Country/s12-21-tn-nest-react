import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from '../user/dto';
import {
  IsArray,
  IsDateString,
  IsOptional,
  IsString,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';

export default class RegisterDto extends CreateUserDto {
  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  mentorDescription?: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  price?: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(10000)
  aboutMe?: string;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  birthDate?: Date;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  @IsNotEmpty()
  categories?: string[];

  @ApiProperty()
  @IsOptional()
  @IsString()
  speciality?: string;
}

export class RegisterAlumnDto extends CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  categories: string[];
}
