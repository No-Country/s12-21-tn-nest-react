import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StripeService } from './stripe.service';
import { CreateStripeIntentDto } from './dto/create-stripe-intent.dto';
import { UpdateStripeDto } from './dto/update-stripe.dto';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post()
  create(@Body() createStripeIntentDto: CreateStripeIntentDto) {
    return this.stripeService.createPaymentIntent(createStripeIntentDto);
  }

  @Get()
  findAll() {
    return this.stripeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stripeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStripeDto: UpdateStripeDto) {
    return this.stripeService.update(+id, updateStripeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stripeService.remove(+id);
  }
}
