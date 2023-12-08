import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { StripeController } from './stripe.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stripe } from './entities/stripe.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Stripe])],
  controllers: [StripeController],
  providers: [StripeService],
})
export class StripeModule {}
