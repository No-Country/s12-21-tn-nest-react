import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Res
} from '@nestjs/common';
import { StripeService } from './stripe.service';
import { CreateStripeIntentDto } from './dto/create-stripe-intent.dto';
import { UpdateStripeDto } from './dto/update-stripe.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateOkStripeIntentResponseDto } from './dto/created_ok-response.dto';
import { Response } from 'express';

@ApiBearerAuth()
@ApiTags('Stripe')
@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post()
  @ApiOperation({
    description: 'Crear una orden de pago con Stripe',
  })
  @ApiBody({
    type: CreateStripeIntentDto,
  })
  @ApiCreatedResponse({ type: CreateOkStripeIntentResponseDto })
  create(@Body() createStripeIntentDto: CreateStripeIntentDto) {
    return this.stripeService.createPaymentIntent(createStripeIntentDto);
  }

  @Get('/success')
  async findSuccess(@Query('session_id') id: string, @Res() res:Response): Promise<any> {
    const result = await this.stripeService.catchPayment(id);
    if(result.status == 'paid'){
      res.redirect('https://mentorsphere.vercel.app/payments/accepted')
    }
  }

  @Get('/cancel')
  async findCancel(@Query('session_id') id: string): Promise<any> {
    return this.stripeService.catchPayment(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stripeService.findOne(id);
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
