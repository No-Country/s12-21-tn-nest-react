import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class StripeIntentSaveDto {
  @ApiProperty({
    description: 'stripe_session_id id',
    nullable: false,
    example: 'cs_test_a1xcCV7mYo4iO4UV...',
  })
  @IsNotEmpty({ message: 'stripe_session_id is required' })
  @IsString()
  stripe_session_id: string;

  @ApiProperty({
    description: 'Order status',
    nullable: false,
    example: 'complete',
  })
  @IsNotEmpty({ message: 'status is required' })
  @IsString()
  status: string;

  @ApiProperty({
    description: 'Payment status',
    nullable: false,
    example: 'paid',
  })
  @IsNotEmpty({ message: 'payment_status is required' })
  @IsString()
  payment_status: string;

  @ApiProperty({
    description: 'Mentorship id',
    nullable: false,
    example: 'd9f80740-38f0-11e8-b467-0ed5f89f718b',
  })
  @IsNotEmpty({ message: 'mentorship ID is required' })
  @IsString()
  mentorship: string;

  @ApiProperty({
    description: 'Stripe payment url',
    nullable: false,
    example: 'https://checkout.stripe.com/c/pay/cs_test_...',
  })
  @IsNotEmpty({ message: 'url is required' })
  @IsString()
  url: string;
}
