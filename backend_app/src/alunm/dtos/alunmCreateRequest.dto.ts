import { ApiProperty } from '@nestjs/swagger';

export class AlunmCreateRequestDto {
  @ApiProperty()
  userId: string;
}

export class AlunmCreateResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  userId: string;

}

