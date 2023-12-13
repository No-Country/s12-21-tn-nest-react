import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { BaseEntity } from '../../common/base/entity';
import { ApiProperty } from '@nestjs/swagger';

export default class LoginDto extends BaseEntity {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  @MaxLength(16)
  password: string;
}
