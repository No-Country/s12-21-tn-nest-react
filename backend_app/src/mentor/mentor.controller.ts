import {
  Controller,
  Get,
  Body,
  Post,
  Param,
  Patch,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { MentorService } from './mentor.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { createCategories } from './class/Categories/createCategories.dto';
import { updateCategories } from './class/Categories/updateCategories.dto';

@Controller('mentor')
export class MentorController {
  constructor(private categoriesService: MentorService) {}
  @Get('filter')
  async get_categories() {
    return this.categoriesService.get_categories_all();
  }
  @Post('create')
  @UseInterceptors(FileInterceptor('file'))
  async post_categories(
    @Body() categoriesPost: createCategories,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.categoriesService.post_categories(categoriesPost, file);
  }
  @Patch('update/:id')
  @UseInterceptors(FileInterceptor('file'))
  async update_categories(
    @Body() categoriesUpdate: updateCategories,
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
  ) {
    return this.categoriesService.update_categories(categoriesUpdate, file, id);
  }
}
