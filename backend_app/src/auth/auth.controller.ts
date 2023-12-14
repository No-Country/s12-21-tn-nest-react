import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import LoginDto from './dto/login.dto';
import RegisterDto, { RegisterAlumnDto } from './dto/register.dto';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register/mentor')
  @UseInterceptors(FileInterceptor('file'))
  async mentorRegister(
    @Body() registerDto: RegisterDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.authService.mentorRegister(registerDto, file);
  }

  @Post('register/student')
  @UseInterceptors(FileInterceptor('file'))
  async studentRegister(
    @Body() registerDto: RegisterAlumnDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      await this.authService.studentRegister(registerDto, file);
      return;
    } catch (error) {
      throw new HttpException(
        error.message || 'error registering student',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }
  @Get('filter/:id')
  async find_User(@Param('id') id: string) {
    return await this.authService.find_User(id);
  }
}
