import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateOkPaypalOrderResponseDto {
  @ApiProperty({
    description: 'Order id',
    nullable: false,
    example: '49H89875E00191509',
  })
  @IsString()
  id: string;

  @ApiProperty({
    description: 'url to pay',
    nullable: false,
    example:
      'https://www.sandbox.paypal.com/checkoutnow?token=49H89875E00191509',
  })
  @IsString()
  url: string;
}
