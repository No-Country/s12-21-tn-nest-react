import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SaveMpagoDto {
  @ApiProperty({
    description: 'mpago_preference_id id',
    nullable: false,
    example: '10D568937W586635G',
  })
  @IsNotEmpty({ message: 'mpago_preference_id is required' })
  @IsString()
  mpago_preference_id: string;

  @ApiProperty({
    description: 'Order status',
    nullable: false,
    example: 'APPROVED',
  })
  @IsNotEmpty({ message: 'status is required' })
  @IsString()
  status: string;

  @ApiProperty({
    description: 'Order status detail',
    nullable: false,
    example: 'ACREDITED',
  })
  @IsNotEmpty({ message: 'status_detail is required' })
  @IsString()
  status_detail: string;

  @ApiProperty({
    description: 'Mentorship id',
    nullable: false,
    example: 'd9f80740-38f0-11e8-b467-0ed5f89f718b',
  })
  @IsNotEmpty({ message: 'mentorship ID is required' })
  @IsString()
  mentorship: string;

  @ApiProperty({
    description: 'paypal payment url',
    nullable: true,
    example: 'https://www.sandbox.paypal.com/checkoutnow?token=...',
  })
  @IsNotEmpty({ message: 'url is required' })
  @IsString()
  url?: string;
}
