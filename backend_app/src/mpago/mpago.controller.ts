import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MpagoService } from './mpago.service';
import { CreateMpagoDto } from './dto/create-mpago.dto';
import { UpdateMpagoDto } from './dto/update-mpago.dto';

@Controller('mpago')
export class MpagoController {
  constructor(private readonly mpagoService: MpagoService) {}

  @Post()
  create(@Body() createMpagoDto: CreateMpagoDto) {
    return this.mpagoService.create(createMpagoDto);
  }

  @Get()
  findAll() {
    return this.mpagoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mpagoService.findOne(+id);
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
