import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { User } from 'src/auth/user/entities/user.entity';

export class AlunmCreateRequestDto {
  user: User;
  @IsNotEmpty()
  @ApiProperty()
  categoriesId?: string[];
}

export class AlunmCreateResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  userId: string;
}
