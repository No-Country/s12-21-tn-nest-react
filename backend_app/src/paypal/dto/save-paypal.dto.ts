import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SavePaypalOrderDto {
  @ApiProperty({
    description: 'paypal_id id',
    nullable: false,
    example: '10D568937W586635G',
  })
  @IsNotEmpty({ message: 'paypal_id is required' })
  @IsString()
  paypal_id: string;

  @ApiProperty({
    description: 'Order status',
    nullable: false,
    example: 'COMPLETED',
  })
  @IsNotEmpty({ message: 'status is required' })
  @IsString()
  status: string;

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
