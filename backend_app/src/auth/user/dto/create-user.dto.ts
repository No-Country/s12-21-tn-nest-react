import {
  IsString,
  MinLength,
  IsEmail,
  IsEnum,
  MaxLength,
} from 'class-validator';

import { ERole } from '../../../common/enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(25)
  firstName: string = '';

  @ApiProperty()
  @IsString()
  @MinLength(3)
  @MaxLength(25)
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty()
  @IsString()
  phone?: string;

  @ApiProperty()
  @IsEnum(ERole)
  role: ERole;
}
