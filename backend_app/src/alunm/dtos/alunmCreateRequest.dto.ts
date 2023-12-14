import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CreateUserDto } from 'src/auth/user/dto';
import { User } from 'src/auth/user/entities/user.entity';

export class AlunmCreateRequestDto extends CreateUserDto {
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
