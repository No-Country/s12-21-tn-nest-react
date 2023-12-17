import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Max, Min } from 'class-validator';

export class CalificationDto {
  @ApiProperty()
  @IsNotEmpty()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  msg: string;

  @ApiProperty()
  @IsNotEmpty()
  @Max(5)
  @Min(1)
  calification: number;
}
