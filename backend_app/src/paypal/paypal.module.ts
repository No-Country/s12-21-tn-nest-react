import { Module } from '@nestjs/common';
import { PaypalService } from './paypal.service';
import { PaypalController } from './paypal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Paypal } from './entities/paypal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Paypal])],
  controllers: [PaypalController],
  providers: [PaypalService],
})
export class PaypalModule {}
