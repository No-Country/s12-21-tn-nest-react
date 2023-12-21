import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Res,
} from '@nestjs/common';
import { MpagoService } from './mpago.service';
import { CreateMpagoDto } from './dto/create-mpago.dto';
import { UpdateMpagoDto } from './dto/update-mpago.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateOkMpagoOrderResponseDto } from './dto/created_ok-response.dto';
import { Response } from 'express';
@ApiBearerAuth()
@ApiTags('MercadoPago')
@Controller('mpago')
export class MpagoController {
  constructor(private readonly mpagoService: MpagoService) {}

  @Post()
  @ApiOperation({
    description: 'Obtener un enlace de pago',
  })
  @ApiBody({
    type: CreateMpagoDto,
  })
  @ApiCreatedResponse({ type: CreateOkMpagoOrderResponseDto })
  create(@Body() createMpagoDto: CreateMpagoDto) {
    return this.mpagoService.create(createMpagoDto);
  }

  @Get('success')
  async success(@Query('payment_id') id: string, @Res() res: Response) {
    const result = await this.mpagoService.success(id);
    if(result.status == "approved"){
      res.redirect('https://mentorsphere.vercel.app/payments/accepted')
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mpagoService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMpagoDto: UpdateMpagoDto) {
    return this.mpagoService.update(+id, updateMpagoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mpagoService.remove(+id);
  }
}
