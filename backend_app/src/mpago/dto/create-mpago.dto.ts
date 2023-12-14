import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateMpagoDto {
  @ApiProperty({
    description: 'Mentorship id',
    nullable: false,
    example: 'd9f80740-38f0-11e8-b467-0ed5f89f718b',
  })
  @IsNotEmpty({ message: 'external_reference is required' })
  @IsString()
  external_reference: string;

  @ApiProperty({
    description: 'Mentorship value',
    nullable: false,
    example: '15.00',
  })
  @IsNotEmpty({ message: 'Mentorship value is required' })
  @IsString()
  value: string;

  @ApiProperty({
    description: 'Mentorship email',
    nullable: false,
    example: 'nn@mail.com',
  })
  @IsNotEmpty({ message: 'Mentorship email required' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Mentorship name or mentor name',
    nullable: false,
    example: 'Javi at MentorSphere',
  })
  @IsNotEmpty({ message: 'brand_name is required' })
  @IsString()
  brand_name: string;
}
