import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AlunmCreateRequestDto {
  @IsNotEmpty()
  @ApiProperty()
  userId: string;

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
