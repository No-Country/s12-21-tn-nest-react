import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateOkMpagoOrderResponseDto {
  @ApiProperty({
    description: 'Order preference id',
    nullable: false,
    example: '13239157-bea57950-6a99-4f8b-9f22-cbe5d08cc044',
  })
  @IsString()
  id: string;

  @ApiProperty({
    description: 'url to pay',
    nullable: false,
    example:
      'https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=13239157-bea57950-6a99-4f8b-9f22-cbe5d08cc044',
  })
  @IsString()
  url: string;
}
