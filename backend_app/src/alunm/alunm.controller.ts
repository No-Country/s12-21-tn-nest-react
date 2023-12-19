import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AlumnService } from './alunm.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AlunmCreateRequestDto } from './dtos/alunmCreateRequest.dto';
import { ApiTags } from '@nestjs/swagger';
import { hireMentorRequestDto } from './dtos/hireMentor.dto';
import { CalificationDto } from './dtos/calification.dto';
import { AlunmUpdateRequestDto } from './dtos/alumnUpdate.dto';
import { privateDecrypt } from 'crypto';
import { UserService } from 'src/auth/user/user.service';

@Controller('alumn')
@ApiTags('Alumn')
export class AlunmController {
  constructor(
    private alunmService: AlumnService,
    private userService: UserService,
  ) {}

  @Post('/')
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() request: AlunmCreateRequestDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      console.log(request);
      const user = await this.userService.findOne(request.userId);
      request.user = user;
      return this.alunmService.create(request, file);
    } catch (error) {
      return new HttpException('Error creating alumn', 400);
    }
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

  @Post('/calificate')
  async calificate(@Body() request: CalificationDto) {
    return this.alunmService.calificateMentor(
      request.id,
      request.calification,
      request.msg,
    );
  }

  @Patch('/restore/:id')
  async restore(@Param('id') id: string) {
    return this.alunmService.restore(id);
  }

  @Patch('/:id')
  async update(
    @Body() request: AlunmUpdateRequestDto,
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.alunmService.update(request, file, id);
  }

  @Post('/hire-mentor')
  async hireMentor(@Body() request: hireMentorRequestDto) {
    try {
      return this.alunmService.hireMentor(
        request.alumnId,
        request.mentorId,
        request.categoryId,
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch('/finish-mentory/:id')
  async finishMentory(@Param('id') id: string) {
    return this.alunmService.finishMentory(id);
  }
}
