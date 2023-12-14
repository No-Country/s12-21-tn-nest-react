import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { StripeController } from './stripe.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stripe } from './entities/stripe.entity';
import { AlumnHireMentor } from 'src/alunm/models/alumnHireMentor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Stripe, AlumnHireMentor])],
  controllers: [StripeController],
  providers: [StripeService],
})
export class StripeModule {}
