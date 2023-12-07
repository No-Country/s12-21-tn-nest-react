import { PartialType } from '@nestjs/swagger';
import { CreateStripeIntentDto } from './create-stripe-intent.dto';

export class UpdateStripeDto extends PartialType(CreateStripeIntentDto) {}
