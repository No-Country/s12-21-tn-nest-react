import { IsEnum, MaxLength, MinLength } from 'class-validator';
import { ERole } from '../../../common/enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty()
  @IsEnum(ERole)
  @MaxLength(30)
  @MinLength(3)
  name: ERole;
}
