import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { StripeService } from './stripe.service';
import { CreateStripeIntentDto } from './dto/create-stripe-intent.dto';
import { UpdateStripeDto } from './dto/update-stripe.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateOkStripeIntentResponseDto } from './dto/created_ok-response.dto';

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
  @ApiOkResponse({ type: CreateOkStripeIntentResponseDto })
  create(@Body() createStripeIntentDto: CreateStripeIntentDto) {
    return this.stripeService.createPaymentIntent(createStripeIntentDto);
  }

  @Get('/success')
  async findSuccess(@Res({ passthrough: true }) res): Promise<any> {
    return this.stripeService.catchPayment(res.req.query.session_id);
  }

  @Get('/cancel')
  async findCancel(@Res({ passthrough: true }) res): Promise<any> {
    return this.stripeService.catchPayment(res.req.query.session_id);
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
