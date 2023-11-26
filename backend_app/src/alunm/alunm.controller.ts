import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AlunmService } from './alunm.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AlunmCreateRequestDto } from './dtos/alunmCreateRequest.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('alumn')
@ApiTags('Alumn')
export class AlunmController {
  constructor(private alunmService: AlunmService) {}

  @Post('/')
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() request: AlunmCreateRequestDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.alunmService.create(request, file);
  }

  @Get('/')
  async findAll() {
    return this.alunmService.findAll();
  }

  @Get('by-mentor/:id')
  async findByMentor(@Param('id') id: string) {
    return this.alunmService.findByMentor(id);
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return this.alunmService.findOne(id);
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    return this.alunmService.remove(id);
  }

  @Patch('/:id')
  async update(
    @Body() request: AlunmCreateRequestDto,
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.alunmService.update(request, file, id);
  }
}
