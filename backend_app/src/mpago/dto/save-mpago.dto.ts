import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SaveMpagoDto {
  @ApiProperty({
    description: 'mpago_preference_id id',
    nullable: false,
    example: '13239157-6f7ece7b-52a5-4338-8cd2-3138bcf1d515',
  })
  @IsOptional({ message: 'mpago_preference_id is required but not mandatory' })
  @IsString()
  mpago_preference_id?: string;

  @ApiProperty({
    description: 'Order status',
    nullable: false,
    example: 'APPROVED',
    default: 'PENDING',
  })
  @IsNotEmpty({ message: 'status is required' })
  @IsString()
  status: string;

  @ApiProperty({
    description: 'Order status detail',
    nullable: false,
    example: 'ACREDITED',
    default: 'PENDING',
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
    example:
      'https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=13239157-...',
  })
  @IsNotEmpty({ message: 'url is required' })
  @IsString()
  url?: string;
}
