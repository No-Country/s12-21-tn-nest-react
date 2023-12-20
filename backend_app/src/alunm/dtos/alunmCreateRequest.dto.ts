import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { User } from 'src/auth/user/entities/user.entity';

export class AlunmCreateRequestDto {
  @IsOptional()
  user?: User;
  @IsNotEmpty()
  @ApiProperty()
  categoriesId?: string[];

  @ApiProperty()
  @IsOptional()
  userId?: string;
}

export class AlunmCreateResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  userId: string;
}
