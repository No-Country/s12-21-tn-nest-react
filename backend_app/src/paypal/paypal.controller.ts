import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PaypalService } from './paypal.service';
import { CreatePaypalOrderDto } from './dto/create-paypal.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateOkPaypalOrderResponseDto } from './dto/created_ok-response.dto';

@ApiBearerAuth()
@ApiTags('PayPal')
@Controller('paypal')
export class PaypalController {
  constructor(private readonly paypalService: PaypalService) {}

  @Post()
  @ApiOperation({
    description: 'Crear una orden de pago con PayPal',
  })
  @ApiBody({
    type: CreatePaypalOrderDto,
  })
  @ApiOkResponse({ type: CreateOkPaypalOrderResponseDto })
  create(@Body() createPaypalOrderDto: CreatePaypalOrderDto) {
    return this.paypalService.createOrder(createPaypalOrderDto);
  }

  @Get('accepted')
  findAll(@Query('token') token: string) {
    return this.paypalService.captureOrder(token);
  }

  @Get('cancel')
  cancelOrder(@Query('token') token: string) {
    return this.paypalService.captureUnpaidOrder(token);
  }

  @ApiForbiddenResponse()
  @Get(':id')
  findOne(@Param('id') id: string) {
    throw new HttpException(
      `#You can only generate an order and save a new payment`,
      HttpStatus.FORBIDDEN,
    );
  }

  @ApiForbiddenResponse()
  @Patch(':id')
  update(@Param('id') id: string) {
    return this.paypalService.update(+id);
  }

  @ApiForbiddenResponse()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paypalService.remove(+id);
  }
}
