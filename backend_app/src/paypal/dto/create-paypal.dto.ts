import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePaypalOrderDto {
  @ApiProperty({
    description: 'Mentorship id',
    nullable: false,
    example: 'd9f80740-38f0-11e8-b467-0ed5f89f718b',
  })
  @IsNotEmpty({ message: 'reference_id is required' })
  @IsString()
  reference_id: string;

  @ApiProperty({
    description: 'Currency code',
    nullable: false,
    example: 'USD',
  })
  @IsNotEmpty({ message: 'currency_code is required' })
  @IsString()
  currency_code: string;

  @ApiProperty({
    description: 'Mentorship value',
    nullable: false,
    example: '15.00',
  })
  @IsNotEmpty({ message: 'Mentorship value is required' })
  @IsString()
  value: string;

  @ApiProperty({
    description: 'Mentorship name or mentor name',
    nullable: false,
    example: 'Javi at MentorSphere',
  })
  @IsNotEmpty({ message: 'brand_name is required' })
  @IsString()
  brand_name: string;

  @ApiProperty({
    description: 'Mentorship or mentor id/profile',
    nullable: false,
    example: 'A database id or profile link',
  })
  @IsNotEmpty({ message: 'cancel_url is required' })
  @IsString()
  cancel_url: 'http://localhost:8080/api/paypal';
}
