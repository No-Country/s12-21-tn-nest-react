import {
  Controller,
  Get,
  Body,
  Post,
  Param,
  Patch,
  UseInterceptors,
  UploadedFile,
  HttpStatus,
  Delete,
  Put,
} from '@nestjs/common';
import { MentorService } from './mentor.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { createCategories } from './class/Categories/createCategories.dto';
import { updateCategories } from './class/Categories/updateCategories.dto';
import { createMentor } from './class/Mentor/createMentor.dto';
import { updateMentor } from './class/Mentor/updateMentor.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Mentors')
@Controller('mentor')
export class MentorController {
  constructor(private mentorService: MentorService) {}
  @Get('categories/filter')
  async get_categories() {
    return this.mentorService.get_categories_all();
  }
  @Post('categories/create')
  @UseInterceptors(FileInterceptor('file'))
  async post_categories(
    @Body() categoriesPost: createCategories,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.mentorService.post_categories(categoriesPost, file);
  }
  @Patch('categories/update/:id')
  @UseInterceptors(FileInterceptor('file'))
  async update_categories(
    @Body() categoriesUpdate: updateCategories,
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
  ) {
    return this.mentorService.update_categories(categoriesUpdate, file, id);
  }

  @Post('create')
  @UseInterceptors(FileInterceptor('file'))
  async post_create_mentor(
    @Body() post: createMentor,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.mentorService.post_create_mentor(post, file);
  }

  @Get('filter')
  async filer_mentor() {
    return this.mentorService.filer_mentor();
  }
  @Get('speciality/filter')
  async filter_speciality() {
    return this.mentorService.filter_speciality();
  }
  @Get('speciality/create')
  async create_speciality() {
    const result = this.mentorService.create_speciality();
    if (result) {
      return {
        status: HttpStatus.CREATED,
        message: 'speciality created successfully',
      };
    } else {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'error creating speciality',
      };
    }
  }

  @Delete('profile/categories/delete/:id/:idCategory')
  async delete_categories(
    @Param('id') id: string,
    @Param('idCategory') idCategory: string,
  ) {
    return this.mentorService.delete_mentor_categories(id, idCategory);
  }
  @Put('profile/categories/update/:id')
  @UseInterceptors(FileInterceptor('file'))
  async update_profile(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateProfile: updateMentor,
  ) {
    return this.mentorService.update_mentor_categories(id, updateProfile, file);
  }

  @Put('profile/desactive/:id')
  async desactive_profile(@Param('id') id: string) {
    return this.mentorService.desactive_profile(id);
  }

  @Put('profile/activate/:id')
  async activate_profile(@Param('id') id: string) {
    return this.mentorService.active_profile(id);
  }
}
