import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateOkStripeIntentResponseDto {
  @ApiProperty({
    description: 'Order id',
    nullable: false,
    example:
      'cs_test_a1nXPjbsbp0p9RYrBC4Df4oMXHbSBXdCEOaOyXZXXKEfk7JAZdvOIXmlxf',
  })
  @IsString()
  id: string;

  @ApiProperty({
    description: 'url to pay',
    nullable: false,
    example: 'https://checkout.stripe.com/c/pay/cs_test_a1nXPjbsbp0p9RYrBC4',
  })
  @IsString()
  url: string;
}
