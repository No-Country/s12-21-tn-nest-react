import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class hireMentorRequestDto {
  @IsNotEmpty()
  @ApiProperty()
  alumnId: string;

  @IsNotEmpty()
  @ApiProperty()
  mentorId: string;
}
