import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class createCategories {
  @ApiProperty({
    description: 'Category name',
    nullable: false,
    minLength: 4,
    example: 'Java',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;
}
