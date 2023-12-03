import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PaypalService } from './paypal.service';
import { CreatePaypalOrderDto } from './dto/create-paypal.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiForbiddenResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

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
  create(@Body() createPaypalOrderDto: CreatePaypalOrderDto) {
    return this.paypalService.create(createPaypalOrderDto);
  }

  @Get('accepted')
  findAll(@Query('token') token: string) {
    return this.paypalService.findOne(token);
  }

  @ApiForbiddenResponse()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paypalService.findOne(id);
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
